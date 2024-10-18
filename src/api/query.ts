import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "./api";

export const useGetRequests = () => {
	return useQuery({
		queryKey: ["requests"],
		queryFn: getAllRequests,
		staleTime: 24 * 60 * 1000,
	});
};
