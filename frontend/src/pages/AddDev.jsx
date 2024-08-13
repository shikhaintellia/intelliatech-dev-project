import React, { useState } from "react";
import "../styles/adddev.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AddDev = () => {
	const [loading, setLoading] = useState(false);
	const Navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading((prev) => !prev);
		const form = e.target;
		const formData = new FormData(form);

		try {
			const res = await axios.post(
				"/api/admin/create-developer",
				formData,
				{
					withCredentials: true,
				}
			);
			toast.success(res?.data?.message);
			setLoading((prev) => !prev);
			Navigate("/admin/change-status");
		} catch (error) {
			setLoading(!loading);
			toast.error(error.response.data.message);
			console.log(error);
		}
	};

	if (loading) {
		return (
			<div className="add-dev">
				<div className="loader"></div>
			</div>
		);
	}
	return (
		<div className="add-dev">
			<form onSubmit={submitHandler}>
				<div className="div-1">
					<input name="name" type="text" placeholder="Name" />
					<input name="email" type="text" placeholder="Email" />
					<input name="skills" type="text" placeholder="Skills" />
					<input
						name="experience"
						type="text"
						placeholder="Experience"
					/>
					<input
						name="mainSkill"
						type="text"
						placeholder="Main Skill"
					/>
				</div>
				<div className="div-2">
					<label htmlFor="eng-type">Engineer Type</label>

					<select name="engineerType" id="eng-type">
						<option selected value="Frontend">
							Frontend
						</option>
						<option value="Backend">Backend</option>
						<option value="Full Stack">Full Stack</option>
					</select>
					<label htmlFor="resume">Resume</label>
					<input
						id="resume"
						name="resume"
						type="file"
						placeholder="Resume"
						accept=" .pdf"
					/>
					<label htmlFor="profile">Profile</label>
					<input
						accept="image/*"
						id="profile"
						name="profile"
						type="file"
						placeholder="Profile"
					/>
					<button>Add Developer</button>
				</div>
			</form>
			<Footer />
		</div>
	);
};

export default AddDev;
