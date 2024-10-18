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
	const { data: comments, error } = await supabaseClient.rpc(
		"execute_raw_sql",
		{
			sql: `
    WITH RECURSIVE comment_thread AS (
      -- Base query: get the original comment
      SELECT 
        c.id,
        c.content,
        c.author_id,
        c.parent_id,
        c.created_at
      FROM comments c
      WHERE c.id = ${postId}  -- The ID of the root comment

      UNION ALL

      -- Recursive part: get the replies (children)
      SELECT 
        c.id,
        c.content,
        c.author_id,
        c.parent_id,
        c.created_at
      FROM comments c
      INNER JOIN comment_thread ct
        ON c.parent_id = ct.id
    )
    SELECT * FROM comment_thread;
    `,
		},
	);
	if (error) {
		console.log("comment fetch error");
		throw new Error(error.message);
	}
	return comments;
};
