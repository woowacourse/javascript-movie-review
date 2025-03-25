import fetchPopularMovies from "./api/fetchPopularMovies";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import SeeMoreButton from "./components/SeeMoreButton/SeeMoreButton";
import ErrorMessage from "./constants/ErrorMessage";

addEventListener("load", async () => {
  try {
    const movieList = await fetchPopularMovies();
    if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

    Header.init({
      id: movieList[0].id,
      title: movieList[0].title,
      posterPath: movieList[0].backdropPath || "",
      rate: movieList[0].rate,
    });
    MovieList.init(movieList);
    SeeMoreButton.init();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
});
