import { useGetRequests } from "../api/query";
import Header from "../components/Header";
import ReportList from "../components/ReportList";

const Home = () => {
	const { data } = useGetRequests();
	console.log("data", data);

	return (
		<section className="w-screen h-screen md:px-10 md:py-14">
			<Header />
			<ReportList />
		</section>
	);
};
export default Home;
