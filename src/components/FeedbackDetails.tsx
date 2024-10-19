import { Link, useNavigate, useParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
<<<<<<< HEAD
import { useGetCommentsByPostId, useGetFeedbackById } from "../api/query";
=======
import { useGetFeedbackById } from "../api/query";
import CommentList from "./CommentList";
>>>>>>> b03f41558401e7af99afca82e9915f1ddd918f51

const FeedbackDetails = () => {
	const { feedbackId } = useParams();
	const navigate = useNavigate();
	const { data: feedback } = useGetFeedbackById(
		feedbackId ? parseInt(feedbackId) : 0,
	);

<<<<<<< HEAD
	const { data: comments } = useGetCommentsByPostId(feedback?.id ?? 0);
	console.log(comments);
	console.log(feedback);
=======
>>>>>>> b03f41558401e7af99afca82e9915f1ddd918f51
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
