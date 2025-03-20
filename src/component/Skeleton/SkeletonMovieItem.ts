import createDOMElement from "../../util/createDomElement";

const SkeletonMovieItem = () => {
  return createDOMElement({
    tag: "div",
    class: "skeleton thumbnail",
  });
};

export default SkeletonMovieItem;
