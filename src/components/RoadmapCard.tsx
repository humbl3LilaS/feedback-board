import { Link } from "react-router-dom";
import { TFeedback } from "../api/api.type";
import { cn } from "../util";
import { useUpdateFeedback } from "../api/mutation";

type RoadmapCardProps = {
	data: TFeedback;
};

const RoadmapCard = ({ data }: RoadmapCardProps) => {
	const { mutateAsync: updateFeedback } = useUpdateFeedback();

	const upvoteBtnHandler = async () => {
		await updateFeedback({
			feedbackId: data.id,
			data: { upvote: data.upvote + 1 },
		});
	};

	return (
		<article className="p-6 relative bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-col md:h-[320px] lg:h-[300px]">
			<div className="mb-4 flex items-center gap-x-2">
				<span
					className={cn(
						"block aspect-square w-2 rounded-full ",
						data.status === "planned" ? "bg-danger" : "bg-primary",
						data.status === "live" && "bg-skyBlue",
					)}
				/>
				<span className="capitalize text-paleGray">{data.status}</span>
			</div>
			<h3 className="mb-2 font-bold text-textPrimary transition-colors duration-700 hover:text-secondary lg:text-lg">
				<Link to={`/feedbacks/details/${data.id}`}>{data.title}</Link>
			</h3>
			<p className="mb-2 text-[14px] text-paleGray lg:text-base">
				{data.description}
			</p>
			<span className="inline-block px-4 py-2 bg-paleWhite rounded-lg capitalize text-secondary shadow-sm font-bold md:w-fit md:mb-4">
				{data.category}
			</span>
			<div className="flex items-center justify-between md:mt-auto">
				<button
					className="py-2 px-4 h-fit flex items-center gap-x-2 rounded-xl bg-paleWhite text-paleGray font-bold transition-colors duration-700 hover:bg-primary/10"
					onClick={upvoteBtnHandler}>
					<img
						src="/assets/icons/icon-arrow-up.svg"
						alt="upvote"
						className="aspect-square w-3"
					/>
					<span className="block">{data.upvote}</span>
				</button>
				<Link
					className="py-2 px-4 w-fit h-fit flex items-center gap-x-2 rounded-xl  text-paleGray font-bold transition-colors duration-700 hover:bg-paleWhite"
					to={`/feedbacks/details/${data.id}`}>
					<img
						src="/assets/icons/icon-comments.svg"
						alt="comments"
						className="aspect-square w-5"
					/>
					<span>{data.comments_count}</span>
				</Link>
			</div>
			<span
				className={cn(
					"absolute top-0 left-0 w-full h-[5px]",
					data.status === "planned" ? "bg-danger" : "bg-primary",
					data.status === "live" && "bg-skyBlue",
				)}
			/>
		</article>
	);
};

export default RoadmapCard;
