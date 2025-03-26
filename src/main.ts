import fetchPopularMovies from "./api/fetchPopularMovies";
import fetchSearchMovies from "./api/fetchSearchMovies";
import Header from "./components/Header/Header";
import SearchInput from "./components/Header/SearchInput";
import MovieList from "./components/MovieList/MovieList";
import NoThumbnail from "./components/NoThumbnail/NoThumbnail";
import SeeMoreButton from "./components/SeeMoreButton/SeeMoreButton";
import Skeleton from "./components/Skeleton/Skeleton";
import Subtitle from "./components/Subtitle/Subtitle";
import ErrorMessage from "./constants/ErrorMessage";

let pageNumber = 1;

addEventListener("load", async () => {
  try {
    const { movies, canMore } = await getPopularMovieList();
    Header.init({
      id: movies[0].id,
      title: movies[0].title,
      posterPath: movies[0].backdropPath || "",
      rate: movies[0].rate,
    });

    SearchInput.init();
    SearchInput.onButtonClick = async () => search();
    SearchInput.onEnterKeydown = async () => search();

    Subtitle.init();

    MovieList.init(movies);

    Skeleton.init();

    SeeMoreButton.init();
    SeeMoreButton.show();
    SeeMoreButton.onButtonClick = async () => {
      Skeleton.show();
      const { movies, canMore } = await getPopularMovieList();
      if (!canMore) SeeMoreButton.hidden();
      MovieList.add(movies);
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

async function search() {
  Header.setSearchMode();
  NoThumbnail.hidden();
  MovieList.init([]);
  SeeMoreButton.show();
  pageNumber = 1;

  Skeleton.show();
  const query = SearchInput.getSearchValue();
  const { movies, canMore } = await getSearchMovieList(query);
  Subtitle.set(`"${query}" 검색 결과`);
  Skeleton.hidden();
  MovieList.set(movies);
  if (!canMore) SeeMoreButton.hidden();

  if (movies.length === 0) {
    NoThumbnail.show();
    return;
  }

  SeeMoreButton.onButtonClick = async () => {
    Skeleton.show();
    const { movies, canMore } = await getSearchMovieList(query);
    if (!canMore) SeeMoreButton.hidden();
    MovieList.add(movies);
    Skeleton.hidden();
  };
}
