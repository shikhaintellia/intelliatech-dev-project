import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import Cookies from 'js-cookie';
const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  //1.login handler
  //   const loginHandler = async () => {
  // 	// const res = await axios.post("/api/admin/signin",userData);
  // 	// Cookies.set('accessToken', res.data.token);
  // 	// navigate("/admin")
  // 	// console.log(res);
  // 	try {
  // 		const res = await axios.post("/api/admin/signin", userData ,{
  // 			withCredentials: true, // Ensure cookies are sent and received
  // 		});
  // 		console.log("res",res)

  // 		const token = res.headers['access-token'];
  // 		console.log("Received token: ", token);

  // 		if (res.data.token) {
  // 			Cookies.set('accessToken', res.data.token);

  // 			navigate("/admin");
  // 		} else {
  // 			console.error("Token not received");
  // 		}
  // 	} catch (error) {
  // 		console.error("Login failed", error);
  // 	}

  // };

  // 	const loginHandler = async () => {
  // 		try {
  //  const res = await axios.post("/api/admin/signin", userData);
  // 	console.log("Response data:", res.data);

  //  const { token } = res.data;

  //  if (token) {
  // 			localStorage.setItem("accessToken", token);
  // 			navigate("/admin");
  // 	} else {
  // 			console.error("Token not received");
  //  }
  // 		} catch (error) {
  //  console.error("Login error:", error);
  // 		}
  // 	};

  //2 login with localstorage
  // 	const loginHandler = async () => {
  // 	try {
  // 	const res = await axios.post("/api/admin/signin", userData);
  // 	console.log("res",res)
  // 	const token = res.data.token;
  // 	console.log("res.data.token",res.data.token)
  // 	console.log("token",token)

  // 	if (token) {
  // 		localStorage.setItem('accessToken', token);
  // 		navigate("/admin");
  // 	} else {
  // 		console.error("Token not received");
  // 	}
  // 	} catch (error) {
  //      console.error("Login error: ", error);
  // 	}
  //   };
  //3.
  const loginHandler = async () => {
    try {
      const res = await axios.post("/api/admin/signin", userData);
	
      console.log("Response data:", res.data);

      const { token, role } = res.data;
      if (token) {
        localStorage.setItem("userRole", role);

        if (role !== "admin") {
			toast.warn(res.data.message);
          return;
        }
        navigate("/admin");
      } else {
        
        console.error("Token not received");
      }
    } catch (error) {
		toast.error(error.response.data.message);
      console.error("Login error:", error);
    
    }
  };

  const backHandler = async () => {
    navigate("/");
  };
  return (
    <div className="login">
      <div className="outer-div">
        <div className="inner-div">
          <labal className="login-label">Email</labal>
          <input
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            value={userData.email}
            className="login-input"
            placeholder="Email..."
            type="text"
          />
        </div>
        <div className="inner-div">
          <labal className="login-label">Password</labal>
          <input
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="login-input"
            placeholder="Password..."
            type="text"
          />
        </div>

        <div className="inner-div">
          <button onClick={loginHandler}> Login</button>
          <button onClick={backHandler}> Back To Home</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
