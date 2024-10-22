import { useNavigate } from "react-router-dom";
import { useLogOut } from "../api/mutation";
import { useGetUser } from "../api/query";
import { cn } from "../util";
import Skeleton from "./Skeleton";

const User = ({ className }: { className?: string }) => {
	const { data: user } = useGetUser();

	const { mutateAsync: logout, isPending } = useLogOut();

	const navigate = useNavigate();

	const logOutHandler = async () => {
		await logout();
		return navigate("/auth/login");
	};

	return (
		<div className={cn("p-6 rounded-xl shadow-lg bg-white", className)}>
			<div className="w-full flex items-center gap-x-2">
				<div className="border p-2 border-primary rounded-full">
					<img
						src="/assets/icons/user.svg"
						alt="user"
						className="aspect-square w-5"
					/>
				</div>
				{user ? (
					<p className="flex flex-col">
						<span className="font-bold text-textPrimary">{user?.name}</span>
						<span className="text-sm text-paleGray">@{user?.username}</span>
					</p>
				) : (
					<div className="w-full">
						<Skeleton className="w-full h-8 mb-2 rounded-lg" />
						<Skeleton className="w-full h-5 rounded-lg" />
					</div>
				)}
			</div>
			<button
				className="w-full py-2 px-4 mt-4 rounded-lg text-center bg-paleGray font-bold text-white transition-colors duration-700 disabled:bg-paleGray/50 hover:bg-paleGray/80"
				disabled={isPending}
				onClick={logOutHandler}>
				{isPending ? "Logging Out" : "Log Out"}
			</button>
		</div>
	);
};

export default User;
