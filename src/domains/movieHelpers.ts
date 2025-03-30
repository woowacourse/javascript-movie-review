import { getGenres } from "../api/services/movie";
import { GenresResponse, MoviesResponse } from "../api/types/movie/response";
import { handleApiResponse } from "../api/utils/handlers";
import Header from "../components/layout/Header";
import { MAX_MOVIE_PAGE, PREFIX_POSTER_PATH } from "../constants/constants";
import { store } from "../stores";

export const isLastPage = () => {
  return store.page >= Math.min(MAX_MOVIE_PAGE, store.totalPages);
};

export const updateHeaderWithFirstMovie = () => {
  const header = Header.getInstance();
  const firstMovieData = store.movies[0];

  if (!firstMovieData) return;

  header.setState({
    id: firstMovieData.id,
    posterImage: `${PREFIX_POSTER_PATH}${firstMovieData.poster_path}`,
    title: firstMovieData.title,
    voteAverage: firstMovieData.vote_average,
    isLoading: false,
  });
};

export const updateMovieStore = (data: MoviesResponse) => {
  store.movies = [...store.movies, ...data.results];
  store.totalPages = data.total_pages;
};

export const getGenreList = async () => {
  const genreResponse = await getGenres();

  handleApiResponse<GenresResponse>(genreResponse, {
    onSuccess: (data) => (store.genres = data.genres),
  });
};
