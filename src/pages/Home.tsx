import Header from "../components/Header";
import FeedbackList from "../components/FeedbackList";

const Home = () => {
	return (
		<section className="w-screen h-screen md:px-10 md:py-14 lg:flex lg:gap-x-8 justify-center">
			<Header />
			<FeedbackList />
		</section>
	);
};
export default Home;
