import { useMemo } from "react";
import { useGetFeedbacks } from "../api/query";
import { cn, getRequestStatusCount } from "../util";
import { Link } from "react-router-dom";

const RoadmapPreview = ({ className }: { className?: string }) => {
	const { data: requests } = useGetFeedbacks();

	const { counts } = useMemo(
		() => getRequestStatusCount(requests?.map((item) => item.status) ?? []),
		[requests],
	);

	return (
		<div className={cn("w-full p-6 rounded-xl bg-white shadow-md", className)}>
			<p className="mb-6 flex items-end justify-between">
				<span className="text-lg text-textPrimary font-bold">Roadmap</span>
				<Link
					to="/roadmap"
					className="text-sm border-b border-b-secondary text-secondary font-semibold">
					View
				</Link>
			</p>
			<ul>
				{["planned", "in-progress", "live"].map((item, idx) => (
					<li
						className="mb-2 flex items-center gap-x-4"
						key={item}>
						<span
							className={cn(
								"block aspect-square w-2   rounded-full",
								idx === 0 ? "bg-danger" : "bg-primary",
								idx === 2 && "bg-skyBlue",
							)}
						/>
						<span className="text-paleGray capitalize">{item}</span>
						<span className="ml-auto text-paleGray font-bold">
							{counts[item]}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RoadmapPreview;
