import createDOMElement from "../../util/createDomElement";

const SkeletonBackgroundThumbnailSection = () => {
  return createDOMElement({
    tag: "div",
    class: "background-container skeleton",
  });
};

export default SkeletonBackgroundThumbnailSection;
