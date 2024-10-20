import { SubmitHandler, useForm } from "react-hook-form";
import { SignupSchema, SignupSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../util";
import { useState } from "react";
import { singup } from "../api/api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid },
	} = useForm<SignupSchemaType>({
		resolver: zodResolver(SignupSchema),
		mode: "onBlur",
	});

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<SignupSchemaType> = async (value) => {
		console.log(value);
		const data = await singup({
			name: value.name,
			username: value.username,
			email: value.email,
			password: value.password,
		});
		if (!data.session) {
			console.log("error signing in");
		}
		navigate("/");
	};

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const passwordStateToggler = () => {
		setShowPassword((prev) => !prev);
	};

	const confirmPasswordStateToggler = () => {
		setShowConfirmPassword((prev) => !prev);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="relative lg:text-lg">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					placeholder="e.g Yamashita Shirakawa"
					className={cn(
						"block w-full px-4 py-2 mt-1 border border-paleGray rounded-lg focus:outline-none focus:border-primary md:py-4 md:mt-3",
						errors.name && "border-2 border-red-400 focus:border-red-300",
					)}
					{...register("name")}
				/>
				{errors.name && (
					<span className="absolute top-0 right-0 mr-3 text-red-500 font-semibold">
						{errors.name.message}
					</span>
				)}
			</div>
			<div className="mt-4 relative lg:text-lg">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					placeholder="e.g SuperUser"
					className={cn(
						"block w-full px-4 py-2 mt-1 border border-paleGray rounded-lg focus:outline-none focus:border-primary md:py-4 md:mt-3",
						errors.username && "border-2 border-red-400 focus:border-red-300",
					)}
					{...register("username")}
				/>
				{errors.username && (
					<span className="absolute top-0 right-0 mr-3 text-red-500 font-semibold">
						{errors.username.message}
					</span>
				)}
			</div>
			<div className="mt-4 relative lg:text-lg">
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
					className="absolute right-4 top-1/2 md:mt-[6px]"
					onClick={passwordStateToggler}
				/>
			</div>
			{errors.password && (
				<span className="text-red-500 font-semibold">
					{errors.password.message}
				</span>
			)}
			<div className="mt-4 mb-4 relative md:mt-6 md:mb-6 lg:text-lg">
				<label htmlFor="confirmPassword">Confirm password</label>
				<input
					type={showConfirmPassword ? "text" : "password"}
					placeholder="Confirm Password"
					className={cn(
						"block w-full px-4 py-2 mt-1 border border-paleGray rounded-lg focus:outline-none focus:border-primary md:py-4 md:mt-3",
						errors.confirmPassword &&
							"border-2 border-red-400 focus:border-red-300",
					)}
					{...register("confirmPassword")}
				/>
				<img
					src={
						showConfirmPassword
							? "/assets/icons/eye-off.svg"
							: "/assets/icons/eye.svg"
					}
					alt={showPassword ? "hide password" : "see password"}
					className="absolute right-4 top-1/2 md:mt-[6px]"
					onClick={confirmPasswordStateToggler}
				/>
			</div>
			{errors.confirmPassword && (
				<span className="absolute top-0 right-0 mr-3 text-red-500 font-semibold">
					{errors.confirmPassword.message}
				</span>
			)}

			<button
				className="w-full px-4 py-2 bg-primary rounded-lg text-white font-bold disabled:bg-primary/30 md:py-3 md:text-lg"
				disabled={isSubmitting || !isValid}
				type="submit">
				{isSubmitting ? "Submitting" : "Sing up"}
			</button>
		</form>
	);
};

export default SignupForm;
