import defaultPoster from "../../../public/images/default_poster_image.png";
import createDOMElement from "../../util/createDomElement";

interface DetailModalImageProps {
  posterPath: string | null;
  onload: () => void;
}

const DetailModalImage = ({ posterPath, onload }: DetailModalImageProps) => {
  return createDOMElement({
    tag: "div",
    class: "modal-image",
    children: createDOMElement({
      tag: "img",
      src: posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : defaultPoster,
      onload,
    }),
  });
};

export default DetailModalImage;
