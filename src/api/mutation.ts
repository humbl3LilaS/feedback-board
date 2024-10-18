import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback } from "./api";
import { TFeeback } from "./api.type";

export const useUpdateFeedback = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload: { feedbackId: number; data: Partial<TFeeback> }) =>
			updateFeedback(payload),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["feedbacks"],
			});
		},
	});
};
