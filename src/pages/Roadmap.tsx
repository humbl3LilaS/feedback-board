import { Link } from "react-router-dom";
import RoadmapList from "../components/RoadmapList";

const Roadmap = () => {
	return (
		<section className="w-dvw h-dvh md:w-screen md:h-screen md:p-6 lg:px-40 lg:py-20">
			<header className="p-6 flex justify-between items-center bg-textSecondary text-white md:rounded-xl md:p-8">
				<div>
					<Link
						to="/"
						className="flex items-center gap-x-4">
						<img
							src="/assets/icons/icon-arrow-left.svg"
							alt="go back"
							width={8}
							height={16}
						/>
						<span className="font-bold border-b border-b-transparent transition-colors duration-500 hover:border-b-white">
							Go back
						</span>
					</Link>
					<p className="font-bold text-lg">Roadmap</p>
				</div>
				<Link
					to="/feedbacks/add"
					className="px-5 py-3 font-bold bg-secondary rounded-lg transition-colors duration-700 hover:bg-primary">
					+ Add Feedback
				</Link>
			</header>
			<RoadmapList />
		</section>
	);
};

export default Roadmap;
