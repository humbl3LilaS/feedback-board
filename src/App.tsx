import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import FeedbackDetails from "./components/FeedbackDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{
		path: "/feedbacks/details/:feedbackId",
		element: <FeedbackDetails />,
	},
	{
		path: "/auth",
		children: [
			{ path: "login", element: <Login /> },
			{ path: "sign-up", element: <SignUp /> },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
