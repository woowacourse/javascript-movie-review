import SELECTORS from '../constants/selectors';

const { MOVIE_ITEM, MOVIE_DETAIL_MODAL } = SELECTORS;

type PosterType =
  | typeof MOVIE_ITEM.thumbnail
  | typeof MOVIE_DETAIL_MODAL.poster;

type PosterInfo = Pick<MovieDetailResponse, 'title' | 'poster_path'>;

interface PosterProps extends PosterInfo {
  type: PosterType;
  width?: number;
  height?: number;
}
