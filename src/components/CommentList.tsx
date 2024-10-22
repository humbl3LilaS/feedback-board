import { useGetCommentsByPostId } from "../api/query";
import { cn } from "../util";
import CommentCard from "./CommentCard";
import Skeleton from "./Skeleton";

const CommentList = ({
	feedbackId,
	className,
}: {
	feedbackId: number;
	className?: string;
}) => {
	const { data: comments, isLoading } = useGetCommentsByPostId(feedbackId);
	const parents = comments && comments.filter((item) => !item.parent_id);

	if (isLoading) {
		return (
			<div className="md:max-w-[640px] lg:max-w-[800px] md:w-full">
				<Skeleton className="min-h-[180px] mb-2 rounded-lg md:max-w-[640px] lg:max-w-[800px]" />
				<Skeleton className="min-h-[180px] mb-2 rounded-lg md:max-w-[640px] lg:max-w-[800px]" />
				<Skeleton className="min-h-[180px] mb-6 rounded-lg md:max-w-[640px] lg:max-w-[800px]" />
			</div>
		);
	}

	return (
		<>
			{parents && parents.length > 0 && (
				<div
					className={cn("my-6 p-6 rounded-xl shadow-md bg-white ", className)}>
					{parents.map((item) => {
						if (!item.has_reply) {
							return (
								<CommentCard
									data={item}
									className="[&>hr]:last-of-type:hidden"
									key={item.id}
								/>
							);
						} else {
							return (
								<>
									<CommentCard
										data={item}
										hasReply
										key={item.id}
									/>
									<div className="p-6 mb-6 border-l-[0.1px] border-l-[#8c92b3]">
										{comments &&
											comments
												.filter(
													(filterItem) => filterItem.parent_id === item.id,
												)
												.map((mappedItem) => (
													<CommentCard
														data={mappedItem}
														hasReply
														key={mappedItem.id}
													/>
												))}
									</div>
									<hr className="w-full  mb-6 bg-[#8c92b3]" />
								</>
							);
						}
					})}
				</div>
			)}
		</>
	);
};

export default CommentList;
