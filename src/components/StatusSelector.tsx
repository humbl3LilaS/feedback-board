import { useState } from "react";
import { Control, Controller } from "react-hook-form";

type StatusSelectorProps = {
	name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
};
const StatusSelector = ({ name, control }: StatusSelectorProps) => {
	const [dropDownVisible, setDropDownVisible] = useState(false);
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<div className="mt-3 mb-4 relative">
					<div
						className="p-4 flex items-center justify-between border border-transparent	bg-paleWhite rounded-lg cursor-pointer transition-colors duration-500 hover:border-primary"
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
					{dropDownVisible && (
						<ul
							className={
								"absolute bg-white w-full mt-4 shadow-2xl shadow-stone-300  rounded-lg border border-paleGray"
							}>
							{["planned", "in-progress", "live"].map((item) => (
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
					)}
				</div>
			)}
		/>
	);
};

export default StatusSelector;
