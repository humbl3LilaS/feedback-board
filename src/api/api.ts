import { supabaseClient } from "./supabaseClinet";

export const getAllRequests = async () => {
	const { data, error } = await supabaseClient.from("requests").select();
	if (error) {
		console.log("fetching request error", error);
		throw new Error(error.message);
	}
	return data;
};
