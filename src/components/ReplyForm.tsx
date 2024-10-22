import { SubmitHandler, useForm } from "react-hook-form";
import { CommentSchema, CommentSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { cn } from "../util";
import { usePostComment } from "../api/mutation";
import { useGetUser } from "../api/query";

const ReplyForm = ({ parentId }: { parentId: number }) => {
	const { feedbackId } = useParams();
	const { data: user } = useGetUser();
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<CommentSchemaType>({
		resolver: zodResolver(CommentSchema),
		mode: "onBlur",
		resetOptions: { keepValues: false },
	});

	const { mutateAsync: postReply } = usePostComment();

	const onSubmit: SubmitHandler<CommentSchemaType> = async (value) => {
		const data = await postReply({
			author_id: user?.id,
			content: value.value,
			//@ts-expect-error feedbackId always present
			request_id: feedbackId,
			parent_id: parentId,
		});
		if (!data) {
			console.log("insert fail");
		}
		reset({ value: "" });
	};

	return (
		<div className="mt-4 relative">
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea
					className={cn(
						"w-full px-4 py-2 border border-paleGray rounded-lg focus:border-primary  focus:outline-none",
						errors.value && "border-danger",
					)}
					{...register("value")}
				/>
				<button
					className="block w-fit px-4 py-2 ml-auto mt-4 bg-primary rounded-lg font-bold text-white"
					type="submit"
					disabled={isSubmitting || !isValid}>
					{isSubmitting ? "Posting" : "Post Reply"}
				</button>
				{errors.value && (
					<span className="block absolute left-0 bottom-0 mb-6 ml-2 font-bold text-sm text-danger">
						{errors.value.message}
					</span>
				)}
			</form>
		</div>
	);
};

export default ReplyForm;
