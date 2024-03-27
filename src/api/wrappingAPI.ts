export const wrappingMovieAPI = ({ ...movieData }) => {
  const movieDataCommon = {
    movieId: movieData.id,
    movieTitle: movieData.title,
    voteAverage: movieData.vote_average,
    voteCount: movieData.vote_count,
    popularity: movieData.popularity,
    posterPath: movieData.poster_path,
    releaseDate: movieData.release_date,
  };
  return movieDataCommon;
};
