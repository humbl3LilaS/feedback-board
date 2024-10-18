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
			<div className="px-6 py-4 bg-mobile bg-cover flex justify-between">
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
			{sideBarActive && <SideBar />}
		</header>
	);
};

export default Header;
