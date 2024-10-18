import { useGetFeedbacks } from "../api/query";
import { cn } from "../util";
import EmptyFeedback from "./EmptyFeedback";
import FeedbackCard from "./FeedbackCard";

const ReportList = () => {
	const { data: feedbacks } = useGetFeedbacks();
	return (
		<div className="h-full  md:mt-10 lg:mt-0 lg:flex-1 lg:max-w-[850px]">
			<div className="px-6 py-4 flex justify-between items-center bg-textSecondary text-white md:mb-6 md:rounded-xl ">
				{/* //Todo make a seperate component */}
				<div>
					<span className="text-sm mr-2">Sort By:</span>
					<button className="font-bold">
						<span className="text-sm">Most Upvotes</span>
						<img
							src="/assets/icons/icon-arrow-down.svg"
							className="inline-block ml-2 fill-white"
						/>
					</button>
				</div>
				<button className="px-5 py-[10px] bg-primary rounded-xl font-bold">
					+ Add Feedback
				</button>
			</div>

			<div
				className={cn(
					"px-6 py-8 flex justify-center items-center bg-paleWhite  md:rounded-xl lg:bg-white",
					feedbacks && feedbacks?.length > 0 && "md:p-0",
				)}>
				{feedbacks && feedbacks.length === 0 && <EmptyFeedback />}
				<div className="w-full h-full flex flex-col gap-y-4 bg-paleWhite">
					{feedbacks &&
						feedbacks.map((item) => (
							<FeedbackCard
								key={item.id}
								data={item}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default ReportList;
