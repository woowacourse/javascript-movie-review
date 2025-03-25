import fetchPopularMovies from "./api/fetchPopularMovies";
import fetchSearchMovies from "./api/fetchSearchMovies";
import Header from "./components/Header/Header";
import SearchInput from "./components/Header/SearchInput";
import MovieList from "./components/MovieList/MovieList";
import SeeMoreButton from "./components/SeeMoreButton/SeeMoreButton";
import Skeleton from "./components/Skeleton/Skeleton";
import Subtitle from "./components/Subtitle/Subtitle";
import ErrorMessage from "./constants/ErrorMessage";

let pageNumber = 1;

addEventListener("load", async () => {
  try {
    const movieList = await getPopularMovieList();
    Header.init({
      id: movieList[0].id,
      title: movieList[0].title,
      posterPath: movieList[0].backdropPath || "",
      rate: movieList[0].rate,
    });

    SearchInput.init();
    SearchInput.onButtonClick = async () => setSearchMode();

    Subtitle.init();

    MovieList.init(movieList);

    Skeleton.init();

    SeeMoreButton.init();
    SeeMoreButton.onButtonClick = async () => {
      Skeleton.show();
      const movieList = await getPopularMovieList();
      MovieList.add(movieList);
      Skeleton.hidden();
    };
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
});

async function getPopularMovieList() {
  const movieList = await fetchPopularMovies(pageNumber);
  pageNumber += 1;
  if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

  return movieList;
}

async function getSearchMovieList(query: string) {
  const movieList = await fetchSearchMovies(query, pageNumber);
  pageNumber += 1;
  if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

  return movieList;
}

async function setSearchMode() {
  Header.setSearchMode();
  MovieList.init([]);
  pageNumber = 1;

  Skeleton.show();
  const query = SearchInput.getSearchValue();
  const movieList = await getSearchMovieList(query);
  Subtitle.set(`"${query}" 검색 결과`);
  MovieList.set(movieList);
  SeeMoreButton.onButtonClick = async () => {
    Skeleton.show();
    const movieList = await getSearchMovieList(query);
    MovieList.add(movieList);
    Skeleton.hidden();
  };
  Skeleton.hidden();
}
