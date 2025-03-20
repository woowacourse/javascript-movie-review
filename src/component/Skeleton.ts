import createDOMElement from '../util/createDomElement.js';

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
