import { useGetFeedbacks } from "../api/query";
import { useFilterStore } from "../store/filterStore";

export const useFilteredFeedback = () => {
	const { data: feedbacks } = useGetFeedbacks();
	const filter = useFilterStore((state) => state.filter);
	if (filter === "all") {
		return feedbacks;
	}
	const filteredFeedbacks =
		feedbacks && feedbacks.filter((item) => item.category === filter);
	return filteredFeedbacks;
};
