import "./App.css"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);

  const routes = [
    {
      path: "/",
      element: user ? <Home /> : <Navigate to="/register" />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element:  user ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/chat",
      element:  !user ? <Navigate to="/" /> : <Chat />,
    },
    {
      path: "/profile/:name",
      element: < Profile />,
    },
    {
      path: "/forgot/password",
      element: <ForgotPassword/>,
    },
    {
      path: "/reset/password",
      element: <ResetPassword/>,
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
