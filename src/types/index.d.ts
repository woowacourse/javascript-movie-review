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

const isMoviesType = (movies: unknown): movies is MovieType[] => {
  if (!Array.isArray(movies)) {
    return false;
  }

  const isMovies = movies.every((movie) => {
    if (!movie) {
      return false;
    }

    const isStringAllValid = ['title', 'posterPath', 'overview'].every(
      (property) => typeof movie[property] === 'string',
    );

    const isNumberAllValid = ['voteAverage', 'id'].every(
      (property) => typeof movie[property] === 'number',
    );

    const isArrayAllValid =
      movie.genreIds && movie.genreIds.every((genreId) => typeof genreId === 'number');

    return isStringAllValid && isNumberAllValid && isArrayAllValid;
  });

  return isMovies;
};

const isGenresType = (genres: unknown): genre is GenreType[] => {
  if (!Array.isArray(genres)) {
    return false;
  }

  const isGenres = genres.every((genre) => {
    if (!genre) {
      return false;
    }

    return typeof genre.id === 'number' && typeof genre.name === 'string';
  });

  return isGenres;
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
