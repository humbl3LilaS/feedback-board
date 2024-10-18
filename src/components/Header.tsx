import { useState } from "react";
import SideBar from "./SideBar";
import CategoryFilter from "./CategoryFilter";
import RoadmapList from "./RoadmapList";

const Header = () => {
	const [sideBarActive, setSideBarActive] = useState(false);

	const sideBarToggle = () => {
		setSideBarActive((prev) => !prev);
	};

	return (
		<header>
			<nav className="gap-x-4 md:flex lg:flex-col lg:gap-x-0 lg:gap-y-6">
				<div className="px-6 py-4 bg-mobile bg-cover flex justify-between md:flex-1 md:rounded-xl md:items-end md:bg-tablet lg:max-w-[280px] lg:min-h-[140px]">
					<div>
						<h1 className="font-bold text-white">Edelweiss</h1>
						<p className="text-paleWhite text-sm">Feedback Board</p>
					</div>
					<button
						className="md:hidden"
						onClick={sideBarToggle}>
						<img
							src={
								sideBarActive
									? "/assets/icons/icon-close.svg"
									: "/assets/icons/icon-hamburger.svg"
							}
							alt="menu"
						/>
					</button>
				</div>
				<CategoryFilter className="max-sm:hidden md:flex-1 lg:max-w-[280px]" />
				<RoadmapList className="max-sm:hidden md:flex-1 lg:max-w-[280px]" />
			</nav>
			{sideBarActive && <SideBar />}
		</header>
	);
};

export default Header;
