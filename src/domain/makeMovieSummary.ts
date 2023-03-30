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
  title: tmdbInfo.title || '등록된 제목이 없습니다.',
  voteAverage: tmdbInfo.vote_average || 0,
  overview: tmdbInfo.overview || '등록된 줄거리가 없습니다.',
  genreList: (tmdbInfo.genre_ids?.length ? tmdbInfo.genre_ids.map((id) => GenreMap.idToGenre(id)) : ['등록된 장르가 없습니다.']),
});

export default makeMovieSummary;
