import { useState } from "react";
import { useGetFeedbacks } from "../api/query";
import { cn } from "../util";
import RoadmapCard from "./RoadmapCard";

const RoadmapList = () => {
	const { data: feedbacks } = useGetFeedbacks();
	const planned =
		feedbacks && feedbacks.filter((item) => item.status === "planned");
	const inProgress =
		feedbacks && feedbacks.filter((item) => item.status === "in-progress");
	const live = feedbacks && feedbacks.filter((item) => item.status === "live");

	const [activeTab, setActiveTab] = useState<
		"in-progress" | "live" | "planned"
	>("in-progress");

	return (
		<div>
			<div className="border-b border-b-[#8c93b3] flex text-textPrimary font-bold md:hidden">
				<div
					className={"p-6 flex-1 relative text-center"}
					onClick={() => setActiveTab("planned")}>
					<span className="text-sm md:base">Planned</span>
					<span
						className={cn(
							"absolute w-full h-1 left-0 bottom-0 bg-danger",
							activeTab !== "planned" && "hidden",
						)}
					/>
				</div>
				<div
					className={"p-6 flex-1 relative text-center"}
					onClick={() => setActiveTab("in-progress")}>
					<span className="text-sm md:base">In-Progress</span>
					<span
						className={cn(
							"absolute w-full h-1 left-0 bottom-0 bg-primary",
							activeTab !== "in-progress" && "hidden",
						)}
					/>
				</div>
				<div
					className={"p-6 flex-1 relative text-center"}
					onClick={() => setActiveTab("live")}>
					<span className="text-sm md:base">Live</span>
					<span
						className={cn(
							"absolute w-full h-1 left-0 bottom-0 bg-skyBlue",
							activeTab !== "live" && "hidden",
						)}
					/>
				</div>
			</div>

			<div className="md:flex  md:gap-x-6">
				<div
					className={cn(
						"p-6 mb-6 md:flex-1 md:px-0",
						activeTab !== "planned" && "hidden md:block",
					)}>
					<h2 className="mb-2 font-bold text-textPrimary text-lg">
						Planned ({planned?.length})
					</h2>
					<p className="mb-6 text-paleGray">Ideas prioritized for research</p>
					{planned && (
						<ul className="flex flex-col gap-y-4">
							{planned.map((item) => (
								<RoadmapCard
									data={item}
									key={item.id}
								/>
							))}
						</ul>
					)}
				</div>
				<div
					className={cn(
						"p-6 mb-6 md:flex-1 md:px-0",
						activeTab !== "in-progress" && "hidden md:block",
					)}>
					<h2 className="mb-2 font-bold text-textPrimary text-lg">
						In-Progress ({inProgress?.length})
					</h2>
					<p className="mb-6 text-paleGray">Currently being developed</p>
					{inProgress && (
						<ul className="flex flex-col gap-y-4">
							{inProgress.map((item) => (
								<RoadmapCard
									data={item}
									key={item.id}
								/>
							))}
						</ul>
					)}
				</div>
				<div
					className={cn(
						"p-6 mb-6 md:flex-1 md:px-0",
						activeTab !== "live" && "hidden md:block",
					)}>
					<h2 className="mb-2 font-bold text-textPrimary text-lg">
						Live ({live?.length})
					</h2>
					<p className="mb-6 text-paleGray">Released features</p>
					{live && (
						<ul className="flex flex-col gap-y-4">
							{live.map((item) => (
								<RoadmapCard
									data={item}
									key={item.id}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default RoadmapList;
