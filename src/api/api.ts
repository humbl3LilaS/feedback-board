import {
	TComment,
	TFeedback,
	TPostCommentArgs,
	TPostFeedbackArgs,
	TUser,
	TUserSignUpInfo,
} from "./api.type";
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
		.insert({ email, username, name, auth_id: singUpData?.user?.id });
	if (insertError) {
		console.log("error during inserting data to _userTable", insertError);
	}
	return singUpData;
};

/** Auth - END  **/

/** user - START  **/

export const getUser = async () => {
	const { data } = await supabaseClient.auth.getUser();
	const { data: userDetails, error } = await supabaseClient
		.from("_user")
		.select()
		.eq("email", data.user?.email)
		.single();

	if (error) {
		console.log("fetching error");
		throw new Error(error.message);
	}
	return userDetails;
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

/** user - END  **/

/** feedback - START  **/
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

export const postFeedback = async ({
	author_id,
	category,
	description,
	title,
}: TPostFeedbackArgs) => {
	const { data, error } = await supabaseClient.from("requests").insert({
		author_id,
		category,
		description,
		title,
	});

	if (error) {
		console.log("error inserting feedback", error);
		throw new Error(error.message);
	}
	return data;
};

export const deleteFeedback = async (feedbackId: number) => {
	const { error } = await supabaseClient
		.from("requests")
		.delete()
		.eq("id", feedbackId);
	if (error) {
		console.log("error deleting");
		throw new Error(error.message);
	}
	return feedbackId;
};

/** feedback - END  **/

/** comment - START  **/

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

export const postComment = async ({
	author_id,
	content,
	request_id,
	parent_id,
	has_reply,
}: TPostCommentArgs): Promise<TComment> => {
	const { data, error } = await supabaseClient
		.from("comments")
		.insert({
			author_id,
			content,
			request_id,
			parent_id: parent_id ? parent_id : null,
			has_reply: has_reply ? has_reply : false,
		})
		.select()
		.single();
	if (error) {
		console.log("error in comment uploading");
		throw new Error(error.message);
	}
	return data;
};

/** comment - END  **/
