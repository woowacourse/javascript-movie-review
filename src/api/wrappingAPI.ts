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

export const wrappingMovieDetailAPI = ({ ...movieDetailData }) => {
  const movieDataCommon = {
    movieId: movieDetailData.id,
    genres: movieDetailData.genres,
    movieTitle: movieDetailData.title,
    voteAverage: movieDetailData.vote_average,
    overview: movieDetailData.overview,
    posterPath: movieDetailData.poster_path,
  };
  return movieDataCommon;
};
