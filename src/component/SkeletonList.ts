import createDOMElement from '../util/createDomElement.js';
import Skeleton from './Skeleton.js';

const SkeletonList = ({ height }: { height: number }) => {
  return createDOMElement({
    tag: 'ul',
    className: 'thumbnail-list',
    children: Array.from({ length: 20 }, () => {
      return Skeleton({ height });
    })
  });
};

export default SkeletonList;
