import { TComment, TFeedback, TUser, TUserSignUpInfo } from "./api.type";
import { supabaseClient } from "./supabaseClinet";

/** Auth **/

export const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		console.log("login failed", error);
		throw new Error(error.message);
	}
	return data;
};

export const singup = async ({
	email,
	password,
	username,
	name,
}: TUserSignUpInfo) => {
	const { data: singUpData, error: singUpError } =
		await supabaseClient.auth.signUp({
			email,
			password,
			options: { data: { username: username } },
		});
	if (singUpError) {
		console.log("error during signup", singUpError);
		throw new Error(singUpError.message);
	}

	const { error: insertError } = await supabaseClient
		.from("_user")
		.insert({ email, username, name });
	if (insertError) {
		console.log("error during inserting data to _userTable", insertError);
	}
	return singUpData;
};

/** Auth **/

export const getAllFeedbacks = async (): Promise<TFeedback[]> => {
	const { data, error } = await supabaseClient
		.from("requests")
		.select()
		.order("upvote", { ascending: false });
	if (error) {
		console.log("fetching request error", error);
		throw new Error(error.message);
	}
	return data;
};

export const getFeedbackById = async (id: number): Promise<TFeedback> => {
	const { data, error } = await supabaseClient
		.from("requests")
		.select()
		.eq("id", id)
		.single();
	if (error) {
		console.log("error getting feedback by id", id, error);
		throw new Error(error.message);
	}

	return data;
};

export const updateFeedback = async ({
	feedbackId,
	data,
}: {
	feedbackId: number;
	data: Partial<TFeedback>;
}) => {
	const { data: updateData, error } = await supabaseClient
		.from("requests")
		.update({ ...data })
		.eq("id", feedbackId);
	if (error) {
		console.log("update error", error);
		throw new Error(error.message);
	}
	return updateData;
};
export const getCommentByPostId = async (
	postId: number,
): Promise<TComment[]> => {
	const { data: comments, error } = await supabaseClient.rpc("get_comments", {
		id_request: postId,
	});
	if (error) {
		console.log("comment fetch error");
		throw new Error(error.message);
	}

	return comments;
};

export const getUserById = async (userId: string): Promise<TUser> => {
	const { data: user, error } = await supabaseClient
		.from("_user")
		.select("id, email, username, name")
		.eq("id", userId)
		.single();
	if (error) {
		console.log("error in fetching user data");
		throw new Error(error.message);
	}
	return user;
};
