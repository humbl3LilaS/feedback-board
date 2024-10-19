import { Link, useNavigate, useParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import { useGetFeedbackById } from "../api/query";
import CommentList from "./CommentList";

const FeedbackDetails = () => {
	const { feedbackId } = useParams();
	const navigate = useNavigate();
	const { data: feedback } = useGetFeedbackById(
		feedbackId ? parseInt(feedbackId) : 0,
	);

	return (
		<section className="w-dvw h-dvh p-6 md:w-full md:h-full">
			<header>
				<nav className="mb-6 flex justify-between items-center">
					<button
						className="flex gap-x-2 items-center"
						onClick={() => navigate("/")}>
						<img
							src="/assets/icons/icon-arrow-left.svg"
							alt="arrow-left"
						/>
						<span className="block text-paleGray font-bold">Go back</span>
					</button>
					<Link
						to={`/feedbacks/edit/${feedbackId}`}
						className="px-5 py-[10px] bg-secondary rounded-xl font-bold text-white">
						Edit Feedback
					</Link>
				</nav>
			</header>
			{feedback && <FeedbackCard data={feedback} />}
			{feedbackId && <CommentList feedbackId={+feedbackId} />}
		</section>
	);
};

export default FeedbackDetails;
