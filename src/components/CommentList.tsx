import { useGetCommentsByPostId } from "../api/query";
import CommentCard from "./CommentCard";

const CommentList = ({ feedbackId }: { feedbackId: number }) => {
	const { data: comments } = useGetCommentsByPostId(feedbackId);
	console.log("comments", comments);
	const parents = comments && comments.filter((item) => !item.parent_id);
	console.log("parents", parents);
	return (
		<div className="mt-6 p-6 rounded-xl shadow-md bg-white ">
			{parents &&
				parents.map((item) => {
					if (!item.has_reply) {
						console.log("pure parent", item);
						return (
							<CommentCard
								data={item}
								className="[&>hr]:last-of-type:hidden"
							/>
						);
					} else {
						return (
							<>
								<CommentCard
									data={item}
									hasReply
								/>
								<div className="p-6 mb-6 border-l-[0.1px] border-l-[#8c92b3]">
									{comments &&
										comments
											.filter((filterItem) => filterItem.parent_id === item.id)
											.map((mappedItem) => (
												<CommentCard
													data={mappedItem}
													hasReply
												/>
											))}
								</div>
								<hr className="w-full  mb-6 bg-[#8c92b3]" />
							</>
						);
					}
				})}
		</div>
	);
};

export default CommentList;
