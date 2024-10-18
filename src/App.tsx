import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import FeedbackDetails from "./components/FeedbackDetails";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{
		path: "/feedbacks/details/:feedbackId",
		element: <FeedbackDetails />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
