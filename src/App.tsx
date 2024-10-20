import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import FeedbackDetails from "./components/FeedbackDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { authRouteGuard, routeGuard } from "./loader/routeGuard";

const router = createBrowserRouter([
	{ path: "/", element: <Home />, loader: routeGuard },
	{
		path: "/feedbacks/details/:feedbackId",
		element: <FeedbackDetails />,
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
