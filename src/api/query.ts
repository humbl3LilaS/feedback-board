import { useQuery } from "@tanstack/react-query";
import {
	getAllFeedbacks,
	getCommentByPostId,
	getFeedbackById,
	getUser,
	getUserById,
} from "./api";

export const useGetUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetFeedbacks = () => {
	return useQuery({
		queryKey: ["feedbacks"],
		queryFn: getAllFeedbacks,
		staleTime: 24 * 60 * 1000,
	});
};

export const useGetFeedbackById = (id: number) => {
	return useQuery({
		queryKey: ["feedback", id],
		queryFn: () => getFeedbackById(id),
		staleTime: 3 * 60 * 1000,
	});
};

export const useGetCommentsByPostId = (postId: number) => {
	return useQuery({
		queryKey: ["comments", postId],
		queryFn: () => getCommentByPostId(postId),
		staleTime: 3 * 60 * 1000,
		enabled: !!postId,
	});
};

export const useGetUserById = (userId: string) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => getUserById(userId),
		staleTime: 3 * 60 * 1000,
		enabled: !!userId,
	});
};
