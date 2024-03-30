import SELECTORS from '../constants/selectors';

const { MOVIE_ITEM, MOVIE_DETAIL_MODAL } = SELECTORS;

type PosterType =
  | typeof MOVIE_ITEM.thumbnail
  | typeof MOVIE_DETAIL_MODAL.poster;

interface PosterProps {
  type: PosterType;
  title: Movie.title;
  width?: number;
  height?: number;
  poster_path: Movie.poster_path;
}
