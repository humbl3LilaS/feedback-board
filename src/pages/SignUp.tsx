import { Link } from "react-router-dom";
import SignupForm from "../form/SignupForm";

const SignUp = () => {
	return (
		<section className="w-dvw h-dvh p-4 flex items-center justify-center md:w-screen md:h-screen">
			<div className="w-full p-6 bg-white rounded-xl  md:px-8 md:max-w-[780px]">
				<h1 className="text-2xl mb-2 text-textPrimary font-bold md:text-3xl">
					Sign Up
				</h1>
				<p className="mb-6 text-paleGray md:text-lg">Let's get started</p>
				<SignupForm />
				<p className="mt-6 text-center md:text-lg">
					<span className="text-paleGray">Already have an account?</span>
					<Link
						to={"/auth/login"}
						className="block text-secondary font-semibold">
						Login account
					</Link>
				</p>
			</div>
		</section>
	);
};

export default SignUp;
