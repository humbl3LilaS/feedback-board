import { SubmitHandler, useForm } from "react-hook-form";
import { TFeedback } from "../api/api.type";
import { EditFeedbackSchema, EditFeedbackSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CategorySelector from "../components/CategorySelector";
import { Link, useNavigate } from "react-router-dom";
import StatusSelector from "../components/StatusSelector";
import { useDeleteFeedback, useUpdateFeedback } from "../api/mutation";

type EditFeedbackFormProps = {
	defaultValues: TFeedback;
};

const EditFeedbackForm = ({ defaultValues }: EditFeedbackFormProps) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { isSubmitting, isValid, dirtyFields },
	} = useForm<EditFeedbackSchemaType>({
		resolver: zodResolver(EditFeedbackSchema),
		mode: "onBlur",
		defaultValues: {
			title: defaultValues.title,
			category: defaultValues.category,
			status: defaultValues.status,
			description: defaultValues.description,
		},
	});

	const navigate = useNavigate();
	const { mutateAsync: updateFeedback } = useUpdateFeedback();
	const { mutateAsync: deleteFeedback, isPending: isDeleting } =
		useDeleteFeedback();

	const onDelete = async () => {
		deleteFeedback(defaultValues.id);
		return navigate("/");
	};

	const onSubmit: SubmitHandler<EditFeedbackSchemaType> = async (value) => {
		const updatedFields = Object.keys(
			dirtyFields,
		) as unknown as (keyof Partial<TFeedback>)[];
		const updatedValue = updatedFields.reduce((obj, val) => {
			if (val in obj) {
				return { ...obj };
			} else {
				//@ts-expect-error i've to type this later
				return { ...obj, [`${val}`]: value[val] };
			}
		}, {} as Partial<TFeedback>);
		await updateFeedback({ feedbackId: defaultValues.id, data: updatedValue });
		return navigate("/");
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
					<label>
						<span className="mb-1 block text-textPrimary font-bold">
							Update Status
						</span>
						<span className="text-paleGray">Change feature state</span>
					</label>
					<StatusSelector
						name="status"
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
					disabled={
						isSubmitting || !isValid || !(Object.keys(dirtyFields).length > 0)
					}>
					{isSubmitting ? "Submitting" : "Save Changes"}
				</button>
				<Link
					to={"/"}
					className="w-full block px-5 py-[10px] mb-4 bg-textPrimary rounded-xl font-bold text-white text-center">
					Cancel
				</Link>
				<button
					type="button"
					className="w-full px-5 py-[10px] mb-4 bg-red-500 rounded-xl font-bold text-white disabled:bg-primary/30"
					disabled={isSubmitting || !isValid}
					onClick={onDelete}>
					{isDeleting ? "Deleting" : "Delete"}
				</button>
			</form>
		</div>
	);
};

export default EditFeedbackForm;
