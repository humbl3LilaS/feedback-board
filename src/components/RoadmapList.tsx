import { useMemo } from "react";
import { useGetRequests } from "../api/query";
import { cn, getReqestStatusCount } from "../util";

const RoadmapList = ({ className }: { className?: string }) => {
	const { data: requests } = useGetRequests();

	const { tags, counts } = useMemo(
		() => getReqestStatusCount(requests?.map((item) => item.status) ?? []),
		[requests],
	);

	return (
		<div className={cn("w-full p-6 rounded-xl bg-white shadow-md", className)}>
			<p className="mb-6 flex items-end justify-between">
				<span className="text-lg text-textPrimary font-bold">Roadmap</span>
				<span className="text-sm border-b border-b-secondary text-secondary font-semibold">
					View
				</span>
			</p>
			<ul>
				{tags.map((item) => (
					<li
						className="mb-2 flex items-center gap-x-4"
						key={item}>
						<span className="block aspect-square w-2  bg-danger rounded-full" />
						<span className="text-paleGray">{item}</span>
						<span className="ml-auto text-paleGray font-bold">
							{counts[item]}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RoadmapList;
