import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ImageRender from "../components/ImageRender";
import Popup from "../components/popup";
import ResumeButton from "../components/resumeButton";
import ResumePopup from "../components/resumePopup";
import axios from "axios";
import '../styles/changeStatus.css';

const ChangeStatus = () => {
	const [profile, setProfile] = useState("");
	const [isPopup, setIsPopup] = useState(false);
	const [isPopupResume, setIsPopupResume] = useState(false);
	const [resumePdf, setResumePdf] = useState("");

	const [rowData, setRowData] = useState([
		// mock data 
	]);

	const [colDefs, setColDefs] = useState([
		{ field: "name" },
		{ field: "mainSkill" },
		{ field: "skills" },
		{ field: "experience" },
		{ field: "engineerType" },
		{ field: "email" },
		{
			field: "bench",
			editable: true,
			cellEditor: "agSelectCellEditor",
			cellEditorParams: { values: ["ONBENCH", "ONPROJECT"] },
		},
		{ field: "resume", cellRenderer: ResumeButton },
		{ field: "profile", cellRenderer: ImageRender },
	]);

	useEffect(() => {
		axios.get("/api/developers").then((res) => {
			console.log("GET DEV----", res);
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

	const changeStatus = async (data) => {
		const res = await axios.patch("/api/developers/" + data?.data?._id);
		console.log(res);
	};

	return (
		<div className="home">
			<div className="change-status">
				<div className="change-status-scroll">
					{isPopupResume ? (
						<ResumePopup
							url={resumePdf}
							setIsOpen={setIsPopupResume}
						/>
					) : null}
					{isPopup ? (
						<Popup url={profile} setIsOpen={setIsPopup} />
					) : null}
					<div className="ag-theme-quartz ag-grid-container">
						<AgGridReact
							rowData={rowData}
							columnDefs={colDefs}
							onCellClicked={handler}
							defaultColDef={{ flex: 1 }}
							onCellValueChanged={changeStatus}
							pagination={true} // Enable pagination
							paginationPageSize={10} // Number of rows per page
							domLayout='autoHeight' // Automatically adjust height to fit content
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeStatus;
