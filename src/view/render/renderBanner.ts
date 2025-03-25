import Banner from '../../component/Banner';
import Skeleton from '../../component/Skeleton';
import { IMovie } from '../../type';
import { $ } from '../../util/selector';

const MOVIE_INDEX_FOR_BANNER = 1;

export const renderBanner = async (movies: IMovie[]) => {
  const wrap = $('#wrap');

  const bannerSkeleton = Skeleton({ height: 500 });
  wrap?.prepend(bannerSkeleton);

  const banner = Banner({ movie: movies[MOVIE_INDEX_FOR_BANNER] });
  bannerSkeleton?.replaceWith(banner);
};
