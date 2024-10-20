import { useGetCommentsByPostId } from "../api/query";
import CommentCard from "./CommentCard";

const CommentList = ({ feedbackId }: { feedbackId: number }) => {
	const { data: comments } = useGetCommentsByPostId(feedbackId);
	const parents = comments && comments.filter((item) => !item.parent_id);
	return (
		<>
			{parents && parents.length > 0 && (
				<div className="my-6 p-6 rounded-xl shadow-md bg-white ">
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
