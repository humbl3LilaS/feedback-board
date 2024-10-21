import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment, postFeedback, updateFeedback } from "./api";
import { TFeedback, TPostCommentArgs, TPostFeedbackArgs } from "./api.type";

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
			await queryClient.invalidateQueries({
				queryKey: ["feedback", data?.request_id],
			});
		},
	});
};

export const usePostFeedback = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: TPostFeedbackArgs) => postFeedback(payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["feedbacks"],
			});
		},
	});
};
