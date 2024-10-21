import { create } from "zustand";
import { TFeedback } from "../api/api.type";
import { immer } from "zustand/middleware/immer";

type FilterStore = {
	filter: TFeedback["category"] | "all";
	sorting: string;
	setFilter: (payload: FilterStore["filter"]) => void;
	setSorting: (payload: string) => void;
};

export const useFilterStore = create<FilterStore>()(
	immer((set) => ({
		filter: "all",
		sorting: "default",
		setFilter: (payload) =>
			set((state) => {
				state.filter = payload;
			}),
		setSorting: (payload) =>
			set((state) => {
				state.sorting = payload;
			}),
	})),
);
