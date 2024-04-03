import { Movie } from '../interface/Movie';

const mapDataToMovies = (movies: any): Movie[] => {
  return movies.results.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path,
      voteAverage: String(data.vote_average.toFixed(1)),
    };
  });
};

const mapDataToMovieDetail = (movieData: any): Movie => {
  return {
    id: movieData.id,
    title: movieData.title,
    posterPath: movieData.poster_path,
    voteAverage: String(movieData.vote_average.toFixed(1)),
    genres: movieData.genres,
    overview: movieData.overview,
  };
};

export { mapDataToMovies, mapDataToMovieDetail };
