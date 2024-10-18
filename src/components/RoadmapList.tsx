import { cn } from "../util";

const RoadmapList = ({ className }: { className?: string }) => {
	return (
		<div className={cn("w-full p-6 rounded-xl bg-white shadow-md", className)}>
			<p className="mb-6 flex items-end justify-between">
				<span className="text-lg text-textPrimary font-bold">Roadmap</span>
				<span className="text-sm border-b border-b-secondary text-secondary font-semibold">
					View
				</span>
			</p>
			<ul>
				<li className="mb-2 flex items-center gap-x-4">
					<span className="block aspect-square w-2  bg-danger rounded-full" />
					<span className="text-paleGray">Planned</span>
					<span className="ml-auto text-paleGray font-bold">2</span>
				</li>
				<li className="mb-2 flex items-center gap-x-4">
					<span className="block aspect-square w-2  bg-primary rounded-full" />
					<span className="text-paleGray">In-Progress</span>
					<span className="ml-auto text-paleGray font-bold">3</span>
				</li>
				<li className="mb-2 flex items-center gap-x-4">
					<span className="block aspect-square w-2  bg-skyBlue rounded-full" />
					<span className="text-paleGray">Live</span>
					<span className="ml-auto text-paleGray font-bold">1</span>
				</li>
			</ul>
		</div>
	);
};

export default RoadmapList;
