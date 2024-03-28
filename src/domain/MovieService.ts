import { Movie } from '../interface/Movie';

const mapDataToMovies = (movies: any): Movie[] => {
  return movies.results.map((data: any) => {
    return {
      id: data.id,
      title: data.title,
      posterPath: data.poster_path,
      voteAverage: data.vote_average,
    };
  });
};

const mapDataToMovieDetail = (movieData: any): Movie => {
  return {
    id: movieData.id,
    title: movieData.title,
    posterPath: movieData.poster_path,
    voteAverage: movieData.vote_average,
    genres: movieData.genres,
    overview: movieData.overview,
  };
};

export { mapDataToMovies, mapDataToMovieDetail };
