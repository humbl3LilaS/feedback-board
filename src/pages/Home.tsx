import Header from "../components/Header";
import ReportList from "../components/ReportList";

const Home = () => {
	return (
		<section className="w-screen h-screen md:px-10 md:py-14 lg:flex lg:gap-x-8 justify-center">
			<Header />
			<ReportList />
		</section>
	);
};
export default Home;
