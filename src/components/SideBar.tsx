import CategoryFilter from "./CategoryFilter";
import RoadmapPreview from "./RoadmapPreview";
import User from "./User";

const SideBar = () => {
	return (
		<div className="w-screen h-screen fixed flex md:hidden z-20">
			<div className="bg-black w-1/3 h-full opacity-[50%]" />
			<div className="w-2/3 p-6 h-sidebar ml-auto bg-paleWhite *:mb-6">
				<CategoryFilter />
				<RoadmapPreview />
				<User />
			</div>
		</div>
	);
};

export default SideBar;
