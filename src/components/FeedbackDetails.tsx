import { Link, useNavigate, useParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import CommentList from "./CommentList";
import { useGetFeedbackById } from "../api/query";
import CommentForm from "../form/CommentForm";

const FeedbackDetails = () => {
	const { feedbackId } = useParams();
	const navigate = useNavigate();
	const { data: feedback } = useGetFeedbackById(
		feedbackId ? parseInt(feedbackId) : 0,
	);

	return (
		<section className="w-dvw h-dvh p-6 md:w-full md:h-full md:flex flex-col items-center">
			<header className="md:max-w-[640px] lg:max-w-[800px] md:w-full">
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
			{feedback && (
				<FeedbackCard
					data={feedback}
					className="mb-6 md:max-w-[640px] lg:max-w-[800px]"
				/>
			)}
			{feedbackId && (
				<CommentList
					feedbackId={+feedbackId}
					className="md:max-w-[640px] lg:max-w-[800px] md:w-full"
				/>
			)}
			{feedbackId && (
				<CommentForm
					feedbackId={+feedbackId}
					className="md:max-w-[640px] lg:max-w-[800px] md:w-full"
				/>
			)}
		</section>
	);
};

export default FeedbackDetails;
