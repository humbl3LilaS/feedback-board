import { LoaderFunction, redirect } from "react-router-dom";
import { supabaseClient } from "../api/supabaseClinet";

export const routeGuard: LoaderFunction = async () => {
	const { data } = await supabaseClient.auth.getSession();
	if (!data.session) {
		return redirect("/auth/login");
	} else {
		return true;
	}
};

export const authRouteGuard: LoaderFunction = async () => {
	const { data, error } = await supabaseClient.auth.getSession();
	if (data.session) {
		return redirect("/");
	}
	return error;
};
