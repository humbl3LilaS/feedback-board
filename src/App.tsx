import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import FeedbackDetails from "./components/FeedbackDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { authRouteGuard, routeGuard } from "./loader/routeGuard";
import Roadmap from "./pages/Roadmap";
import AddFeedback from "./pages/AddFeedback";
import EditFeedback from "./pages/EditFeedback";

const router = createBrowserRouter([
	{ path: "/", element: <Home />, loader: routeGuard },
	{
		path: "/feedbacks",
		loader: routeGuard,
		children: [
			{
				path: "details/:feedbackId",
				element: <FeedbackDetails />,
			},
			{ path: "add", element: <AddFeedback /> },
			{ path: "edit/:feedbackId", element: <EditFeedback /> },
		],
	},
	{
		path: "/roadmap",
		element: <Roadmap />,
		loader: routeGuard,
	},
	{
		path: "/auth",
		children: [
			{ path: "login", element: <Login />, loader: authRouteGuard },
			{ path: "sign-up", element: <SignUp />, loader: authRouteGuard },
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
