import { Control, Controller } from "react-hook-form";
import { useState } from "react";
import { cn } from "../util";

type CategorySelectorProps = {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
};

const CategorySelector = ({ name, control }: CategorySelectorProps) => {
	const [dropDownVisible, setDropDownVisible] = useState(false);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="mt-3 mb-4 relative">
					<div
						className="p-4 flex items-center justify-between bg-paleWhite rounded-lg"
						onClick={() => {
							setDropDownVisible((prev) => !prev);
							field.onChange(field.value);
						}}>
						<span className="capitalize">{field.value}</span>
						<img
							src="/assets/icons/icon-arrow-down.svg"
							alt="arrow-down"
						/>
					</div>
					<ul
						className={cn(
							"absolute bg-white w-full mt-4 shadow-2xl shadow-stone-300  rounded-lg border border-paleGray",
							!dropDownVisible && "hidden",
						)}>
						{["feature", "UI", "UX", "enhancement", "bug"].map((item) => (
							<li
								className="px-4 py-3 flex items-center justify-between border-b border-b-paleGray last:border-b-transparent text-paleGray transition-colors duration-500 cursor-pointer hover:text-primary"
								key={item}
								onClick={() => {
									setDropDownVisible(false);
									field.onChange(item);
								}}>
								<span className="capitalize ">{item}</span>
								{field.value === item && (
									<img src="/assets/icons/icon-check.svg" />
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		/>
	);
};

export default CategorySelector;
