import { tags } from "../constant";
import { cn } from "../util";

const CategoryFilter = ({ className }: { className?: string }) => {
	return (
		<div className={cn("w-full p-6 rounded-xl bg-white shadow-md", className)}>
			<ul className="flex flex-wrap gap-x-2 gap-y-3">
				{tags.map((item, idx) => (
					<li
						key={item}
						className={cn(
							"px-4 py-2 rounded-lg text-white font-bold",
							idx === 0 ? "bg-secondary" : "bg-plaeBlue text-secondary",
						)}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};
export default CategoryFilter;
