import React from "react";
import "../styles/admin.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const Admin = () => {
  const navigate = useNavigate();
  // const addDeveloper = () => {
  // 	navigate("/admin/add-dev");
  // };
  // const redirectToHome = () => {
  // 	navigate("/");
  // };

  const user = localStorage.getItem("userRole");
//   console.log("userrrr", user);

  if (user !== "admin") {
    navigate("/");
  }

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
		<div className="admin">
			<nav>
				<img
					className="intelliatech-img"
					src="https://intelliatechcom33628.zapwp.com/q:u/r:1/wp:1/w:228/u:https://intelliatech.com/wp-content/uploads/2023/12/Logo-Black-TM.png"
					alt=""
				/>
				<button className="ad-btn" onClick={logoutHandler}>Logout</button>
			</nav>
			<div className="main-div">
				<div className="left">
					<Link to={"/admin"}>Add Dev</Link>
					<Link to={"/admin/change-status"}>Change Status</Link>
					<Link to={"/"}>Home</Link>
				</div>
				<div className="right">
					<Outlet />
				</div>
			</div>
			<Footer/>
		</div>
  );
};

export default Admin;
