import MovieSummary from '../type/MovieSummary';

interface tmdbMovieSummary {
  id?: number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
}

const makeMovieSummary = (tmdbInfo: tmdbMovieSummary): MovieSummary => ({
  id: tmdbInfo.id ?? 0,
  posterPath: tmdbInfo.poster_path ?? '',
  title: tmdbInfo.title ?? '',
  voteAverage: tmdbInfo.vote_average ?? 0,
});

export default makeMovieSummary;
