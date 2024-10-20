import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment, updateFeedback } from "./api";
import { TFeedback, TPostCommentArgs } from "./api.type";

export const useUpdateFeedback = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: { feedbackId: number; data: Partial<TFeedback> }) =>
			updateFeedback(payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["feedbacks"],
			});
		},
	});
};

export const usePostComment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: TPostCommentArgs) => postComment(payload),
		onSuccess: async (data) => {
			await queryClient.invalidateQueries({
				queryKey: ["comments", data?.request_id],
			});
		},
	});
};
