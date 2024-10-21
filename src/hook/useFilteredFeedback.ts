import { TFeedback } from "../api/api.type";
import { useGetFeedbacks } from "../api/query";
import { useFilterStore } from "../store/filterStore";

export const useFilteredFeedback = () => {
	const { data: feedbacks } = useGetFeedbacks();
	const filter = useFilterStore((state) => state.filter);
	const sortOption = useFilterStore((state) => state.sorting);
	if (filter === "all") {
		return sortFeedBack(feedbacks, sortOption);
	}
	const filteredFeedbacks =
		feedbacks && feedbacks.filter((item) => item.category === filter);
	return sortFeedBack(filteredFeedbacks, sortOption);
};

const sortFeedBack = (data: TFeedback[] | undefined, option: string) => {
	switch (option) {
		case "upvotes-asc":
			return data?.sort((a, b) => {
				if (a.upvote === b.upvote) {
					return 0;
				}
				return a.upvote - b.upvote;
			});
		case "comments-desc":
			return data?.sort((a, b) => {
				if (a.comments_count === b.comments_count) {
					return 0;
				}
				return b.comments_count - a.comments_count;
			});
		case "comments-asc":
			return data?.sort((a, b) => {
				if (a.comments_count === b.comments_count) {
					return 0;
				}
				return a.comments_count - b.comments_count;
			});
		default:
			return data?.sort((a, b) => {
				if (a.upvote === b.upvote) {
					return 0;
				}
				return b.upvote - a.upvote;
			});
	}
};
