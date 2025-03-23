import createDOMElement from "../../util/createDomElement";

const SkeletonBackgroundThumbnailSection = () => {
  return createDOMElement({
    tag: "div",
    className: "background-container skeleton",
  });
};

export default SkeletonBackgroundThumbnailSection;
