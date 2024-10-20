import { Link } from "react-router-dom";
import LoginForm from "../form/LoginForm";

const Login = () => {
	return (
		<section className="w-dvw h-dvh p-4 flex items-center justify-center md:p-8 md:w-screen md:h-screen">
			<div className="w-full p-6 bg-white rounded-xl md:py-10 md:px-8 md:max-w-[780px]">
				<h1 className="text-2xl mb-2 text-textPrimary font-bold md:text-3xl">
					Login
				</h1>
				<p className="mb-6 text-paleGray md:text-lg">
					Add your details below to get back into the app
				</p>
				<LoginForm />
				<p className="mt-6 text-center md:text-lg">
					<span className="text-paleGray">Don't have an account?</span>
					<Link
						to={"/auth/sign-up"}
						className="block text-secondary font-semibold">
						Create account
					</Link>
				</p>
			</div>
		</section>
	);
};

export default Login;
