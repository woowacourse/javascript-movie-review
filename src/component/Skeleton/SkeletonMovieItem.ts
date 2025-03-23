import createDOMElement from "../../util/createDomElement";

const SkeletonMovieItem = () => {
  return createDOMElement({
    tag: "div",
    className: "skeleton thumbnail",
  });
};

export default SkeletonMovieItem;
