import fetchPopularMovies from "./api/fetchPopularMovies";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import SeeMoreButton from "./components/SeeMoreButton/SeeMoreButton";
import ErrorMessage from "./constants/ErrorMessage";

let pageNumber = 1;

addEventListener("load", async () => {
  try {
    const movieList = await getMovieList();

    Header.init({
      id: movieList[0].id,
      title: movieList[0].title,
      posterPath: movieList[0].backdropPath || "",
      rate: movieList[0].rate,
    });
    MovieList.init(movieList);
    SeeMoreButton.init();
    SeeMoreButton.onButtonClick = async () => {
      const movieList = await getMovieList();
      MovieList.add(movieList);
    };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
});

async function getMovieList() {
  const movieList = await fetchPopularMovies(pageNumber);
  pageNumber += 1;
  if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

  return movieList;
}
