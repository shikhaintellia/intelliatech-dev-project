// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import Admin from "./pages/Admin";
// import Login from "./pages/Login";
// import AddDev from "./pages/AddDev";
// import { Toaster } from "react-hot-toast";
// import ChangeStatus from "./pages/ChangeStatus";

// function App() {
// 	const router = createBrowserRouter([
// 		{
// 			path: "/",
// 			element: <Home />,
// 		},
// 		{
// 			path: "/admin",
// 			element: <Admin />,
// 			children: [
// 				{
// 					path: "/admin/add-dev",
// 					element: <AddDev />,
// 				},
// 				{
// 					path:"/admin/change-status",
// 					element:<ChangeStatus/>
// 				}
// 			],
// 		},
// 		{
// 			path: "/login",
// 			element: <Login />,
// 		},
// 	]);

// 	return (
// 		<div className="contanter">
// 			<RouterProvider router={router} />;
// 			<Toaster />
// 		</div>
// 	);
// }

// export default App;
//2.----------------------------------------
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import Admin from "./pages/Admin";
// import Login from "./pages/Login";
// import AddDev from "./pages/AddDev";
// import ChangeStatus from "./pages/ChangeStatus";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { Toaster } from "react-hot-toast";
// const getAccessToken = () => {
//   return localStorage.getItem("accessToken");
// };

// const isAuthenticated = () => {
//   return !!getAccessToken();
// };

// function App() {
 
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/admin",
//       element: (
//         <ProtectedRoute isAuthenticated={isAuthenticated}>
//           <Admin />
//         </ProtectedRoute>
//       ),
//       children: [
//         {
//           path: "/admin",
//           element: <AddDev />,
//         },
//         // {
//         //   path: "/admin/add-dev",
//         //   element: <AddDev />,
//         // },
//         {
//           path: "/admin/change-status",
//           element: <ChangeStatus />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//   ]);

//   return (
//     <div className="contanter">
//       <RouterProvider router={router} />
//       <Toaster />
//     </div>
//   );
// }

// export default App;
//3.---------------------------
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AddDev from "./pages/AddDev";
import ChangeStatus from "./pages/ChangeStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin">
          <Admin />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/admin",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin">
              <AddDev />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/add-dev",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin">
              <AddDev />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/change-status",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="admin">
              <ChangeStatus />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="contanter">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
