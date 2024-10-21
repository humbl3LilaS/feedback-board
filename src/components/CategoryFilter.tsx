import { tags } from "../constant";
import { useFilterStore } from "../store/filterStore";
import { cn } from "../util";

const CategoryFilter = ({ className }: { className?: string }) => {
	const activeTag = useFilterStore((state) => state.filter);
	const setActiveTag = useFilterStore((state) => state.setFilter);

	const categoryChangeHandler = <T extends typeof activeTag>(tag: T) => {
		if (activeTag !== tag) {
			setActiveTag(tag);
		}
	};

	return (
		<div className={cn("w-full p-6 rounded-xl bg-white shadow-md", className)}>
			<ul className="flex flex-wrap gap-x-2 gap-y-3">
				{tags.map((item) => (
					<li
						key={item}
						className={cn(
							"px-4 py-2 rounded-lg text-white font-bold capitalize cursor-pointer",
							activeTag === item
								? "bg-secondary"
								: "bg-plaeBlue text-secondary",
						)}
						onClick={() => {
							categoryChangeHandler(item as typeof activeTag);
						}}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};
export default CategoryFilter;
