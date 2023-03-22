import MovieSummary from '../type/MovieInfo';
import GenreMap from './GenreMap';

interface tmdbMovieSummary {
  id?: number;
  poster_path?: string;
  title?: string;
  vote_average?: number;
  overview?: string;
  genre_ids?: number[];
}

const makeMovieSummary = (tmdbInfo: tmdbMovieSummary): MovieSummary => ({
  id: tmdbInfo.id ?? 0,
  posterPath: tmdbInfo.poster_path ?? '',
  title: tmdbInfo.title ?? '',
  voteAverage: tmdbInfo.vote_average ?? 0,
  overview: tmdbInfo.overview?? '',
  genreList: (tmdbInfo.genre_ids ? tmdbInfo.genre_ids.map((id) => GenreMap.idToGenre(id)) : []),
});

export default makeMovieSummary;
