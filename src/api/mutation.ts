import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback } from "./api";
import { TFeedback } from "./api.type";

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
