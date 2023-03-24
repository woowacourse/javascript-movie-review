import Header from '../components/Header';
import MovieList from '../components/MovieList';
import MovieFetcher from '../domains/MovieFetcher';
import FooterMessage from '../components/FooterMessage';

type MovieType = {
  title: string;
  posterPath: string;
  voteAverage: number;
  genreIds: number[];
  id: number;
  overview: string;
};

type StorageMovieType = MovieType & {
  convertedGenres: string[];
};

type GenreType = {
  id: number;
  name: string;
};

type BaseFetchResponseType = {
  result: string;
  status?: number;
  errorMessage?: string;
};

type MovieFetchResponseType = BaseFetchResponseType & {
  fetchedData?: MovieType[];
};

type GenreFetchResponseType = BaseFetchResponseType & {
  fetchedData?: GenreType[];
};

type FetchResponseType = MovieFetchResponseType | GenreFetchResponseType;

type ViewBundleType = {
  header: Header;
  movieList: MovieList;
  movieFetcher: MovieFetcher;
  footerMessage: FooterMessage;
};

export {
  MovieType,
  StorageMovieType,
  GenreType,
  MovieFetchResponseType,
  GenreFetchResponseType,
  FetchResponseType,
  ViewBundleType,
};
