import createDOMElement from '../util/createDomElement.js';

const Skeleton = ({ height }: { height: number }) => {
  return createDOMElement({
    tag: 'div',
    className: 'banner skeleton-banner',

    attributes: {
      style: `height: ${height}px`
    }
    // children: [
    //   createDOMElement({
    //     tag: 'div',
    //     className: 'skeleton-image'
    //   }),
    //   createDOMElement({
    //     tag: 'div',
    //     className: 'skeleton-text'
    //   })
    // ]
  });
};

export default Skeleton;
