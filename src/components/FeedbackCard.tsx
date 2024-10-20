import { Link } from "react-router-dom";
import { TFeedback } from "../api/api.type";
import { useUpdateFeedback } from "../api/mutation";
import { cn } from "../util";

type FeedbackCardProps = {
	data: TFeedback;
	className?: string;
};

const FeedbackCard = ({ data, className }: FeedbackCardProps) => {
	const { mutateAsync: updateFeedback } = useUpdateFeedback();

	const upvoteBtnHandler = async () => {
		await updateFeedback({
			feedbackId: data.id,
			data: { upvote: data.upvote + 1 },
		});
	};

	return (
		<article
			className={cn(
				"w-full p-6 bg-white rounded-xl shadow-md flex flex-wrap justify-between md:p-8 md:justify-start md:gap-x-10",
				className,
			)}>
			<div className="w-full md:w-fit md:order-2">
				<h2 className="mb-2 text-sm font-bold">
					<Link to={`/feedbacks/details/${data.id}`}>{data.title}</Link>
				</h2>
				<p className="mb-2 text-sm text-paleGray">{data.description}</p>
				<span className="block w-fit rounded-xl px-4 py-2 mb-4 text-sm font-bold text-primary bg-paleWhite capitalize">
					{data.category}
				</span>
			</div>

			{/* upvote update button */}
			<button
				className="py-2 px-4 h-fit flex items-center gap-x-2 rounded-xl bg-paleWhite text-paleGray font-bold transition-colors duration-700 hover:bg-primary/10 md:order-1 md:flex-col md:gap-x-0 md:gap-y-2"
				onClick={upvoteBtnHandler}>
				<img
					src="/assets/icons/icon-arrow-up.svg"
					alt="upvote"
					className="aspect-square w-3"
				/>
				<span className="block">{data.upvote}</span>
			</button>
			<Link
				className="py-2 px-4 w-fit h-fit flex items-center gap-x-2 rounded-xl bg-paleWhite text-paleGray font-bold md:order-last md:ml-auto"
				to={`/feedbacks/details/${data.id}`}>
				<img
					src="/assets/icons/icon-comments.svg"
					alt="comments"
					className="aspect-square w-5"
				/>
				<span>{data.comments_count}</span>
			</Link>
		</article>
	);
};

export default FeedbackCard;
