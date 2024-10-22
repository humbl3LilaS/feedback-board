import { useState } from "react";
import SideBar from "./SideBar";
import CategoryFilter from "./CategoryFilter";
import RoadmapPreview from "./RoadmapPreview";
import User from "./User";

const Header = () => {
	const [sideBarActive, setSideBarActive] = useState(true);

	const sideBarToggle = () => {
		setSideBarActive((prev) => !prev);
	};

	return (
		<header>
			<nav className="gap-x-4 md:flex md:flex-wrap md:gap-y-4 lg:flex-col lg:gap-x-0 lg:gap-y-6">
				<div className="px-6 py-4 bg-mobile bg-cover flex justify-between md:w-full md:rounded-xl md:bg-tablet lg:flex lg:flex-1 lg:items-end lg:max-w-[280px] lg:min-h-[140px] lg:bg-desktop">
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
				<User className="hidden md:flex flex-1 order-5  flex-col items-center justify-center lg:items-start" />
				<CategoryFilter className="hidden md:flex-1 lg:max-w-[280px] md:block" />
				<RoadmapPreview className="hidden md:flex-1 lg:max-w-[280px] md:block" />
			</nav>
			{sideBarActive && <SideBar />}
		</header>
	);
};

export default Header;
