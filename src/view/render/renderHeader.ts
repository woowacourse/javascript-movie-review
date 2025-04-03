import Header from '../Header';
import { $ } from '../../util/selector';
import { hideBannerSkeletons } from './skeleton/bannerSkeleton';

export const renderHeader = () => {
  const wrap = $('#wrap');

  const header = Header();
  wrap?.prepend(header);

  hideBannerSkeletons();
};
