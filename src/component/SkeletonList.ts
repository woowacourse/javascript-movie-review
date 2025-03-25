import createDOMElement from '../util/createDomElement.js';
import { $ } from '../util/selector.js';
import Skeleton from './Skeleton.js';

function SkeletonList({ height }: { height: number }) {
  return createDOMElement({
    tag: 'ul',
    className: 'skeleton-list',
    children: Array.from({ length: 20 }, () => {
      return Skeleton({ height });
    })
  });
}

export default SkeletonList;

export const addSkeletonList = (container: Element) => {
  const skeletonList = SkeletonList({ height: 300 });
  container.appendChild(skeletonList);
  return skeletonList;
};

export const removeSkeletonList = () => {
  const skeletonList = $('.skeleton-list');
  if (!skeletonList) return;
  skeletonList.remove();
};
