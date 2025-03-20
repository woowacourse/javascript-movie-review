import createDOMElement from "../../util/createDomElement";
import SkeletonMovieItem from "./SkeletonMovieItem";

const SkeletonMovieListSection = () => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
      }),
      createDOMElement({
        tag: "ul",
        class: "thumbnail-list",
        children: Array.from({ length: 20 }).map(() => SkeletonMovieItem()),
      }),
    ],
  });
};

export default SkeletonMovieListSection;
