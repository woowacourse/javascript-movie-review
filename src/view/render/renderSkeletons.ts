import Skeleton from '../../component/Skeleton';
import createDOMElement from '../../util/createDomElement';

export const renderSkeletons = ({ height }: { height: number }) => {
  return createDOMElement({
    tag: 'ul',
    className: 'thumbnail-list',
    children: Array.from({ length: 20 }, () => {
      return Skeleton({ height });
    })
  });
};
