import { SubmitHandler, useForm } from "react-hook-form";
import { CommentSchema, CommentSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostComment } from "../api/mutation";
import { useGetUser } from "../api/query";

const CommentForm = ({ feedbackId }: { feedbackId: number }) => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isValid },
		watch,
	} = useForm<CommentSchemaType>({
		resolver: zodResolver(CommentSchema),
		mode: "onBlur",
	});

	const { data: user } = useGetUser();

	const { mutateAsync: postComment } = usePostComment();

	const onSubmit: SubmitHandler<CommentSchemaType> = async (value) => {
		const data = await postComment({
			author_id: user?.id,
			request_id: feedbackId,
			content: value.value,
		});
		if (!data) {
			console.log("error uploading comment");
		}
	};
	const watchValue = watch("value");

	return (
		<div className="mb-20 p-6 rounded-xl shadow-md bg-white">
			<h3 className="mb-6 font-lg font-bold text-textPrimary">Add Comment</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea
					{...register("value")}
					className="w-full h-20 p-4 rounded-lg bg-paleWhite "
					placeholder="Type your comment here"
				/>
				<p className="mt-4 flex items-center justify-between">
					<span className=" text-sm text-paleGray">
						{250 - (watchValue?.length ?? 0)} Characters left
					</span>
					<button
						className="py-2 px-4 bg-primary font-bold text-white rounded-xl disabled:bg-primary/40"
						disabled={isSubmitting || !isValid}
						type="submit">
						{isSubmitting ? "Posting" : "Post Comment"}
					</button>
				</p>
			</form>
		</div>
	);
};

export default CommentForm;
