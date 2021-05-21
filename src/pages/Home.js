import Hero from "../components/Hero";
import FavouriteMovies from "../components/FavouriteMovies";

const Home = ({ match }) => {
  return (
    <>
      <Hero />
      <FavouriteMovies />
    </>
  );
};

export default Home;
