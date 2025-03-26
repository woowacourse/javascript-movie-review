import createDOMElement from '../util/createDomElement.js';
import { $ } from '../util/selector.js';

const Skeleton = ({ height }: { height: number }) => {
  return createDOMElement({
    tag: 'div',
    className: 'skeleton',
    attributes: {
      style: `height: ${height}px`
    }
  });
};

export default Skeleton;

export const addBannerSkeleton = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const bannerSkeleton = createDOMElement({
    tag: 'div',
    className: 'banner-skeleton-wrapper',
    children: [Skeleton({ height: 500 })]
  });

  wrap.prepend(bannerSkeleton);
};

export const removeBannerSkeleton = () => {
  const skeleton = $('.banner-skeleton-wrapper');
  if (!skeleton) return;

  skeleton.remove();
};
