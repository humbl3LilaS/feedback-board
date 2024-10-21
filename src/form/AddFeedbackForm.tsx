import { SubmitHandler, useForm } from "react-hook-form";
import { AddFeedbackSchema, AddFeedbackSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import CategorySelector from "../components/CategorySelector";
import { usePostFeedback } from "../api/mutation";
import { useGetUser } from "../api/query";

const AddFeedbackForm = () => {
	const {
		handleSubmit,
		control,
		register,
		formState: { isSubmitting, isValid },
	} = useForm<AddFeedbackSchemaType>({
		resolver: zodResolver(AddFeedbackSchema),
		mode: "onBlur",
		defaultValues: {
			category: "feature",
		},
	});
	const { data: user } = useGetUser();
	const navigate = useNavigate();

	const { mutateAsync: postFeedback } = usePostFeedback();

	const onSubmit: SubmitHandler<AddFeedbackSchemaType> = async (value) => {
		await postFeedback({
			author_id: user?.id,
			title: value.title,
			category: value.category,
			description: value.description,
		});
		navigate("/");
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="title">
						<span className="mb-1 block text-textPrimary font-bold">
							Feedback Title
						</span>
						<span className="text-paleGray">
							Add a short, descriptive headline
						</span>
					</label>
					<input
						type="text"
						className="w-full px-4 py-2 mt-3 mb-4 rounded-lg bg-paleWhite"
						id="title"
						{...register("title")}
					/>
				</div>
				<div>
					<label>
						<span className="mb-1 block text-textPrimary font-bold">
							Category
						</span>
						<span className="text-paleGray">
							Choose a category for your feedback
						</span>
					</label>
					<CategorySelector
						name="category"
						control={control}
					/>
				</div>
				<div>
					<label htmlFor="description">
						<span className="mb-1 block text-textPrimary font-bold">
							Feedback Details
						</span>
						<span className="text-paleGray">
							Include any specific comments on what should be improved, added,
							etc.
						</span>
					</label>
					<textarea
						className="w-full h-[120px] px-4 py-2 mt-3 mb-10 rounded-lg bg-paleWhite"
						id="description"
						{...register("description")}
					/>
				</div>
				<button
					type="submit"
					className="w-full px-5 py-[10px] mb-4 bg-primary rounded-xl font-bold text-white disabled:bg-primary/30"
					disabled={isSubmitting || !isValid}>
					{isSubmitting ? "Submitting" : "Add Feedback"}
				</button>
				<Link
					to={"/"}
					className="w-full block px-5 py-[10px] bg-textPrimary rounded-xl font-bold text-white text-center">
					Cancel
				</Link>
			</form>
		</div>
	);
};

export default AddFeedbackForm;
