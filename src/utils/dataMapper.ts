import { Movie, DetailMovie, ResponseMovie, ResponseDetailMovie } from '../interface/Movie';

const mapDataToMovies = (movies: ResponseMovie[]): Movie[] => {
  return movies.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path,
      voteAverage: data.vote_average ? String(data.vote_average.toFixed(1)) : '0',
    };
  });
};

const mapDataToMovieDetail = (movieData: ResponseDetailMovie): DetailMovie => {
  return {
    id: movieData.id,
    title: movieData.title,
    posterPath: movieData.poster_path,
    voteAverage: movieData.vote_average ? String(movieData.vote_average.toFixed(1)) : '0',
    genres: movieData.genres,
    overview: movieData.overview,
  };
};

export { mapDataToMovies, mapDataToMovieDetail };
