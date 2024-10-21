import { useState } from "react";
import { useFilterStore } from "../store/filterStore";

const SortingSelector = () => {
	const [activeSelector, setActiveSelector] = useState("Most Upvotes");
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const setSorting = useFilterStore((state) => state.setSorting);
	return (
		<div className="relative">
			<div
				className="transition-color duration-700 hover:text-skyBlue"
				onClick={() => setDropdownVisible((prev) => !prev)}>
				<span className="text-sm mr-2">Sort By:</span>
				<button className="font-bold">
					<span className="text-sm capitalize">{activeSelector}</span>
					<img
						src="/assets/icons/icon-arrow-down.svg"
						className="inline-block ml-2 fill-white"
					/>
				</button>
			</div>
			{dropdownVisible && (
				<ul className="absolute block w-[250px] mt-10 shadow-2xl bg-white rounded-lg">
					<li
						className="w-full px-4 py-3 text-paleGray border-b border-b-textPrimary cursor-pointer"
						onClick={() => {
							setDropdownVisible(false);
							setActiveSelector("Most Upvotes");
							setSorting("default");
						}}>
						Most Upvotes
					</li>
					<li
						className="w-full px-4 py-3 text-paleGray border-b border-b-textPrimary cursor-pointer"
						onClick={() => {
							setDropdownVisible(false);
							setActiveSelector("Least Upvotes");
							setSorting("upvotes-asc");
						}}>
						Least Upvotes
					</li>
					<li
						className="w-full px-4 py-3 text-paleGray border-b border-b-textPrimary cursor-pointer"
						onClick={() => {
							setDropdownVisible(false);
							setActiveSelector("Most Comments");
							setSorting("comments-desc");
						}}>
						Most Comments
					</li>
					<li
						className="w-full px-4 py-3 text-paleGray cursor-pointer"
						onClick={() => {
							setDropdownVisible(false);
							setActiveSelector("Least Comments");
							setSorting("comments-asc");
						}}>
						Least Comments
					</li>
				</ul>
			)}
		</div>
	);
};

export default SortingSelector;
