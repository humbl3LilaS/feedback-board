const ReportList = () => {
	return (
		<div className="h-full  md:mt-10 lg:mt-0 lg:flex-1 lg:max-w-[850px]">
			<div className="px-6 py-4 flex justify-between items-center bg-textSecondary text-white md:mb-6 md:rounded-xl ">
				<div>
					Sort By: <span className="font-bold">Most Upvotes</span>
				</div>
				<button className="px-5 py-[10px] bg-primary rounded-xl font-bold">
					+ Add Feedback
				</button>
			</div>
			<div className="px-6 py-8 flex justify-center items-center bg-paleWhite  md:rounded-xl lg:bg-white">
				<div className="py-16 px-4 text-center bg-white rounded-xl">
					<img
						className="block mb-10 mx-auto"
						src="/assets/icons/illustration-empty.svg"
						alt="search"
					/>
					<h2 className="text-lg font-bold mb-4 md:text-xl">
						There is no feedback yet
					</h2>
					<p className="mb-6 text-sm text-textPrimary lg:max-w-[400px]">
						Got a suggestion? Found a bug that needs to be squashed? We love
						hearing about new ideas to improve our app
					</p>
					<button className="px-4 py-[10px] bg-primary rounded-lg font-bold text-white">
						+ Add Feedback
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReportList;
