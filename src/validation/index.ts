import { z } from "zod";
import { TFeedback } from "../api/api.type";

export const LoginSchema = z.object({
	email: z
		.string({ message: "email is required" })
		.email({ message: "Invalid email address" }),
	password: z
		.string({ message: "password is required" })
		.min(8, { message: "Invalid password" }),
});

export type LoginSchemaType = Zod.infer<typeof LoginSchema>;

export const SignupSchema = z
	.object({
		name: z
			.string({ required_error: "Can't be empty" })
			.min(4, { message: "Too short" })
			.max(20, { message: "Too long" }),
		username: z
			.string({ required_error: "Can't be empty" })
			.min(4, { message: "Too short" })
			.max(20, { message: "Too long" })
			.regex(/^[a-zA-Z]+$/, {
				message: "Invalid username",
			}),
		email: z
			.string({ message: "Can't be empty" })
			.email({ message: "Invalid email" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." })
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter.",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter.",
			})
			.regex(/\d/, { message: "Password must contain at least one number." })
			.regex(/[@$!%*?&]/, {
				message:
					"Password must contain at least one special character (@$!%*?&).",
			}),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long." })
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter.",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter.",
			})
			.regex(/\d/, { message: "Password must contain at least one number." })
			.regex(/[@$!%*?&]/, {
				message:
					"Password must contain at least one special character (@$!%*?&).",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords don't match",
	});

export type SignupSchemaType = Zod.infer<typeof SignupSchema>;

export const CommentSchema = z.object({
	value: z
		.string()
		.min(1, { message: "Cannot be empty" })
		.max(250, { message: "Only 250 characters is allowed" }),
});

export type CommentSchemaType = Zod.infer<typeof CommentSchema>;

export const AddFeedbackSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Cannot be empty" })
		.max(120, { message: "Too long" }),
	category: z.custom<TFeedback["category"]>(),
	description: z
		.string()
		.min(1, { message: "Cannot be empty" })
		.max(450, { message: "Too long" }),
});
export type AddFeedbackSchemaType = Zod.infer<typeof AddFeedbackSchema>;

export const EditFeedbackSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Cannot be empty" })
		.max(120, { message: "Too long" }),
	category: z.custom<TFeedback["category"]>(),
	description: z
		.string()
		.min(1, { message: "Cannot be empty" })
		.max(450, { message: "Too long" }),
	status: z.custom<TFeedback["status"]>(),
});

export type EditFeedbackSchemaType = Zod.infer<typeof EditFeedbackSchema>;
