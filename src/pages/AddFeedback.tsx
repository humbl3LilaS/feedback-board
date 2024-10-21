import { Link } from "react-router-dom";
import AddFeedbackForm from "../form/AddFeedbackForm";

const AddFeedback = () => {
	return (
		<section className="w-dvw h-dvh px-6 py-8 flex-col justify-center items-center md:flex md:w-full md:h-full">
			<div className="mb-12 md:w-full md:max-w-[540px] md:text-left">
				<Link
					to="/"
					className="flex items-center gap-x-4">
					<img
						src="/assets/icons/icon-arrow-left.svg"
						alt="go back"
						width={8}
						height={16}
					/>
					<span className="font-bold border-b border-b-transparent text-paleGray">
						Go back
					</span>
				</Link>
			</div>
			<div className="px-6 py-12 relative bg-white rounded-xl shadow-lg md:max-w-[540px] md:px-10">
				<div className="aspect-square w-10 absolute -top-5 left-6 flex items-center justify-center rounded-full bg-mobile  bg-center">
					<img
						src="/assets/icons/plus.svg"
						className="aspect-square w-6"
					/>
				</div>
				<h1 className="mb-6 text-lg text-textPrimary font-bold">
					Create new Feedback
				</h1>
				<AddFeedbackForm />
			</div>
		</section>
	);
};

export default AddFeedback;
