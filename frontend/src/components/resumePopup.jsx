// import React, { useRef, useState } from "react";
// import "../styles/resumeButton.css";
// import PdfViewer from "./pdfViewer";

// const ResumePopup = ({ url, setIsOpen }) => {
// 	const bgRef = useRef();
// 	// const closepop = () => {
// 	// 	setIsOpen((prev) => !prev);
// 	// };
// 	const closePopupWhileClickOnBg = (e) => {
// 		if (bgRef.current === e.target) setIsOpen((prev) => !prev);
// 	};
// 	const [isPdfOpen, setIsPdfOpen] = useState(false);
// 	const isOpenHandler = () => {
// 		if (isPdfOpen) setIsOpen((prev) => !prev);
// 		setIsPdfOpen((prev) => !prev);
// 	};

 
// 	return (
// 		<div
// 			onClick={closePopupWhileClickOnBg}
// 			ref={bgRef}
// 			className="resume-bg"
// 		>
// 			<div className="center-div">
// 				<a href={url} target="blank" download="resume-file.pdf">
// 					<button>Download PDF</button>
// 				</a>
// 				{/* <button onClick={() => handleDownload(url)}>Download</button> */}
// 				<button onClick={isOpenHandler}>
// 					{!isPdfOpen ? "View" : "Close"}
// 				</button>

// 				{isPdfOpen && <PdfViewer pdfUrl={url} />}
// 			</div>
// 		</div>
// 	);
// };

// export default ResumePopup;

import React, { useRef, useState } from "react";
import "../styles/resumeButton.css";
import PdfViewer from "./pdfViewer";

const ResumePopup = ({ url, setIsOpen }) => {
  const bgRef = useRef();
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const closePopupWhileClickOnBg = (e) => {
    if (bgRef.current === e.target) setIsOpen(false);
  };

  const toggleViewHandler = () => {
    // Toggle PDF or Image view
    setIsPdfOpen((prev) => !prev);
    setIsImageOpen((prev) => !prev);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // Use the original file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPdf = url.toLowerCase().endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png)$/i.test(url);

  return (
    <div
      onClick={closePopupWhileClickOnBg}
      ref={bgRef}
      className="resume-bg"
    >
      <div className="center-div">
        {isPdf ? (
          <>
            <a href={url} target="_blank" rel="noopener noreferrer" download="resume-file.pdf">
              <button>Download PDF</button>
            </a>
            <button onClick={toggleViewHandler}>
              {!isPdfOpen ? "View PDF" : "Close View"}
            </button>
            {isPdfOpen && <PdfViewer pdfUrl={url} />}
          </>
        ) : isImage ? (
          <>
            {/* <a href={url} target="_blank" rel="noopener noreferrer" download={url.split('/').pop()}>
              <button>Download Image</button>
            </a> */}
            <button onClick={toggleViewHandler}>
              {!isImageOpen ? "View Image" : "Close Image"}
            </button>
            {isImageOpen && (
              <div className="image-viewer">
                <img src={url} alt="Resume"  />
              </div>
            )}
          </>
        ) : (
          <button onClick={handleDownload}>Download File</button>
        )}
      </div>
    </div>
  );
};

export default ResumePopup;





