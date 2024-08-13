// import React, { useEffect, useState } from "react";
// import "../styles/home.css";
// import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
// import { _bindCellRendererToHtmlElement } from "ag-grid-community";
// import ImageRender from "../components/ImageRender";
// import Popup from "../components/popup";
// import ResumeButton from "../components/resumeButton";
// import ResumePopup from "../components/resumePopup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [profile, setProfile] = useState("");
//   const [isPopup, setIsPopup] = useState(false);
//   const [isPopupResume, setIsPopupResume] = useState(false);
//   const [resumePdf, setResumePdf] = useState("");
//   const navigate = useNavigate();

//   const autoGroupColumnDef = {
//     headerName: "Make",
//     field: "make",
//     cellRenderer: "agGroupCellRenderer",
//     cellRendererParams: {
//       checkbox: true,
//     },
//   };
//   const [rowData, setRowData] = useState([
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
//         public_id: "g0vr8brmiikw6mvpfa9q",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
//         public_id: "phgluprc3iz0hiisohss",
//       },
//       _id: "6698f48754f05fbd89900a66",
//       name: "anshul",
//       email: "anshul1@gmail.com",
//       mainSkill: "Node.js",
//       skills: ["react.js", "node.js", "mongodb", "express"],
//       engineerType: "Backend",
//       experience: "3 years",
//       bench: false,
//       __v: 0,
//     },
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
//         public_id: "ghqsaagxepjn8zx2rdi0",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
//         public_id: "bfm1svwuccpwzai0rnmt",
//       },
//       _id: "6698f73039e3405f3a2ecde6",
//       name: "shikha",
//       email: "shikha@gmail.com",
//       mainSkill: "React.js",
//       skills: ["react.js", "node.js"],
//       engineerType: "Backend",
//       experience: "1years",
//       bench: true,
//       __v: 0,
//     },
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
//         public_id: "g0vr8brmiikw6mvpfa9q",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
//         public_id: "phgluprc3iz0hiisohss",
//       },
//       _id: "6698f48754f05fbd89900a66",
//       name: "anshul",
//       email: "anshul1@gmail.com",
//       mainSkill: "Node.js",
//       skills: ["react.js", "node.js", "mongodb", "express"],
//       engineerType: "Backend",
//       experience: "3 years",
//       bench: false,
//       __v: 0,
//     },
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
//         public_id: "ghqsaagxepjn8zx2rdi0",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
//         public_id: "bfm1svwuccpwzai0rnmt",
//       },
//       _id: "6698f73039e3405f3a2ecde6",
//       name: "shikha",
//       email: "shikha@gmail.com",
//       mainSkill: "React.js",
//       skills: ["react.js", "node.js"],
//       engineerType: "Frontend",
//       experience: "1years",
//       bench: true,
//       __v: 0,
//     },
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302544/g0vr8brmiikw6mvpfa9q.jpg",
//         public_id: "g0vr8brmiikw6mvpfa9q",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721302546/phgluprc3iz0hiisohss.pdf",
//         public_id: "phgluprc3iz0hiisohss",
//       },
//       _id: "6698f48754f05fbd89900a66",
//       name: "anshul",
//       email: "anshul1@gmail.com",
//       mainSkill: "Node.js",
//       skills: ["react.js", "node.js", "mongodb", "express"],
//       engineerType: "Full Stack",
//       experience: "3 years",
//       bench: true,
//       __v: 0,
//     },
//     {
//       profile: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300541/ghqsaagxepjn8zx2rdi0.jpg",
//         public_id: "ghqsaagxepjn8zx2rdi0",
//       },
//       resume: {
//         url: "http://res.cloudinary.com/dwomqjoa1/image/upload/v1721300542/bfm1svwuccpwzai0rnmt.pdf",
//         public_id: "bfm1svwuccpwzai0rnmt",
//       },
//       _id: "6698f73039e3405f3a2ecde6",
//       name: "shikha",
//       email: "shikha@gmail.com",
//       mainSkill: "React.js",
//       skills: ["react.js", "node.js"],
//       engineerType: "Full Stack",
//       experience: "1years",
//       bench: true,
//       __v: 0,
//     },
//   ]);

//   const [colDefs, setColDefs] = useState([
//     { field: "name" },
//     { field: "mainSkill" },
//     { field: "skills" },
//     { field: "experience" },
//     { field: "engineerType" },
//     { field: "email" },
//     { field: "resume", cellRenderer: ResumeButton },
//     { field: "profile", cellRenderer: ImageRender },
//   ]);

//   useEffect(() => {
//     axios.get("/api/developers?bench=true").then((res) => {
//       const data = res.data.data;
//       if (data) {
//         setRowData(data);
//       }
//     });
//   }, []);

//   const handler = (data) => {
//     if (data.colDef.field == "profile") {
//       setProfile(data.data.profile.url);
//       setIsPopup((prev) => !prev);
//     }
//     if (data.colDef.field == "resume") {
//       setIsPopupResume((prev) => !prev);
//       setResumePdf(data.data.resume.url);
//     }
//   };
//   const handleAdminClick = () => {
//     navigate("/login");
//   };

//   return (
//     <div className="home">
//       <div className="home-nav">
//         <img
//           className="intelliatech-img"
//           src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
//           alt=""
//         />

//         <div className="button-container">
//           {" "}
//           <button onClick={() => alert("Feature not decided")}>
//             Hire A Developer
//           </button>
//           <button onClick={handleAdminClick}>Admin Page</button>
//         </div>
//       </div>
//       {isPopupResume ? (
//         <ResumePopup url={resumePdf} setIsOpen={setIsPopupResume} />
//       ) : null}
//       {isPopup ? <Popup url={profile} setIsOpen={setIsPopup} /> : null}
//       <div className="ag-theme-quartz ag-gird ">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={colDefs}
//           // onRowClicked={handler}
//           onCellClicked={handler}
//           defaultColDef={{ flex: 1 }}
//           autoGroupColumnDef={autoGroupColumnDef}
//           groupSelectsChildren={true}
//           rowSelection={"multiple"}
//           groupDefaultExpanded={1} // expand all groups by default
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ImageRender from "../components/ImageRender";
import Popup from "../components/popup";
import ResumeButton from "../components/resumeButton";
import ResumePopup from "../components/resumePopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [profile, setProfile] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupResume, setIsPopupResume] = useState(false);
  const [resumePdf, setResumePdf] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is an admin
  const navigate = useNavigate();
  const gridApi = useRef(null); // Use ref to access grid API

  const autoGroupColumnDef = {
    headerName: "Make",
    field: "make",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true,
    },
  };

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "mainSkill", rowGroup: true, hide: false },
    { field: "skills", filter: 'agTextColumnFilter' }, // Add filter property here
    { field: "experience" },
    { field: "engineerType" },
    { field: "resume", cellRenderer: ResumeButton },
    { field: "profile", cellRenderer: ImageRender },
  ]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "admin") {
      setIsAdmin(true);
    }

    axios.get("/api/developers?bench=true").then((res) => {
      const data = res.data.data;
      if (data) {
        setRowData(data);
      }
    });
  }, []);

  const handler = (data) => {
    if (data.colDef.field === "profile") {
      setProfile(data.data.profile.url);
      setIsPopup((prev) => !prev);
    }
    if (data.colDef.field === "resume") {
      setIsPopupResume((prev) => !prev);
      setResumePdf(data.data.resume.url);
    }
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const onGridReady = (params) => {
    gridApi.current = params.api; 
  };

  return (
    <div className="home">
      <div className="home-nav">
        <img
          className="intelliatech-img"
          src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
          alt=""
        />

        <div className="button-container">
          <button onClick={() => alert("Feature not decided")}>
            Hire A Developer
          </button>
          {isAdmin && (
            <button onClick={handleAdminClick}>Admin Page</button>
          )}
        </div>
      </div>
      {isPopupResume ? (
        <ResumePopup url={resumePdf} setIsOpen={setIsPopupResume} />
      ) : null}
      {isPopup ? <Popup url={profile} setIsOpen={setIsPopup} /> : null}
      <div className="ag-theme-quartz ag-grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellClicked={handler}
          defaultColDef={{ flex: 1 }}
          autoGroupColumnDef={autoGroupColumnDef}
          groupSelectsChildren={true}
          rowSelection={"multiple"}
          groupDefaultExpanded={1} // expand all groups by default
          pagination={true} // Enable pagination
          paginationPageSize={10} // Number of rows per page
          domLayout='autoHeight' // Automatically adjust height to fit content
          onGridReady={onGridReady} // Set grid API reference
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;



