import { useQuery } from "@tanstack/react-query";
import { getAllFeedbacks } from "./api";

export const useGetFeedbacks = () => {
	return useQuery({
		queryKey: ["feedbacks"],
		queryFn: getAllFeedbacks,
		staleTime: 24 * 60 * 1000,
	});
};
