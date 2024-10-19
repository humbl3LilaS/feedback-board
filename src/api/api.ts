import { TFeedback } from "./api.type";
import { supabaseClient } from "./supabaseClinet";

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

export const getCommentByPostId = async (postId: number) => {
	const { data: comments, error } = await supabaseClient.rpc("get_comments", {
		id_request: parseInt(postId.toString()),
	});
	if (error) {
		console.log("comment fetch error");
		throw new Error(error.message);
	}
	return comments;
};
