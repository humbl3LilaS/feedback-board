import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "../util";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		mode: "onTouched",
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<LoginSchemaType> = async (value) => {
		const data = await login({ email: value.email, password: value.password });
		if (!data) {
			console.log("error logging");
		}
		return navigate("/");
	};

	const [showPassword, setShowPassword] = useState(false);

	const passwordStateToggler = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="relative lg:text-lg">
				<label htmlFor="email">Email address</label>
				<input
					type="email"
					placeholder="e.g super@gmail.com"
					className={cn(
						"block w-full px-4 py-2 mt-1 border border-paleGray rounded-lg focus:outline-none focus:border-primary md:py-4 md:mt-3",
						errors.email && "border-2 border-red-400 focus:border-red-300",
					)}
					{...register("email")}
				/>
				{errors.email && (
					<span className="absolute top-0 right-0 mr-3 text-red-500 font-semibold">
						{errors.email.message}
					</span>
				)}
			</div>
			<div className="mt-4 mb-4 relative md:mt-6 md:mb-6 lg:text-lg">
				<label htmlFor="password">Password</label>
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Enter your password"
					className={cn(
						"block w-full px-4 py-2 mt-1 border border-paleGray rounded-lg focus:outline-none focus:border-primary md:py-4 md:mt-3",
						errors.password && "border-2 border-red-400 focus:border-red-300",
					)}
					{...register("password")}
				/>
				<img
					src={
						showPassword ? "/assets/icons/eye-off.svg" : "/assets/icons/eye.svg"
					}
					alt={showPassword ? "hide password" : "see password"}
					className="absolute right-4 top-1/2 mt-[6px]"
					onClick={passwordStateToggler}
				/>
				{errors.password && (
					<span className="absolute top-0 right-0 mr-3 text-red-500 font-semibold">
						{errors.password.message}
					</span>
				)}
			</div>
			<button
				className="w-full px-4 py-2 bg-primary rounded-lg text-white font-bold disabled:bg-primary/30 md:py-3 md:text-lg"
				disabled={isSubmitting || !isValid}
				type="submit">
				{isSubmitting ? "Logging In" : "Login"}
			</button>
		</form>
	);
};

export default LoginForm;
