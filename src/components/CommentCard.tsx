import { TComment } from "../api/api.type";
import { useGetUserById } from "../api/query";
import { cn } from "../util";

type CommentBoxProps = {
	data: TComment;
	className?: string;
	hasReply?: boolean;
};

const CommentCard = ({ data, className, hasReply }: CommentBoxProps) => {
	const { data: user } = useGetUserById(data.author_id);

	return (
		<article className={cn(className)}>
			<div className="mb-6 flex items-center gap-x-4 text-sm">
				<img
					src="/assets/icons/user.svg"
					alt="icon"
					className="aspect-square w-12 p-1 border border-primary rounded-full"
				/>
				<p>
					<span className="block mb-1 font-bold text-textPrimary">
						{user?.name}
					</span>
					<span className="text-paleGray">@{user?.username}</span>
				</p>
				<button className="ml-auto font-bold text-secondary">Reply</button>
			</div>
			<p>{data.content}</p>
			{!hasReply && <hr className="w-full my-6 bg-[#8c92b3]" />}
		</article>
	);
};

export default CommentCard;
