import Header from '../components/Header';
import MovieList from '../components/MovieList';
import MovieFetcher from '../domains/MovieFetcher';
import LoadMoreButton from '../components/LoadMoreButton';

type MovieType = {
  title: string;
  posterPath: string;
  voteAverage: number;
};

type MovieFetchResponseType = {
  result: string;
  status?: number;
  errorMessage?: string;
  movies?: MovieType[];
};

type ViewBundleType = {
  header: Header;
  movieList: MovieList;
  movieFetcher: MovieFetcher;
  loadMoreButton: LoadMoreButton;
};

export { MovieType, MovieFetchResponseType, ViewBundleType };
