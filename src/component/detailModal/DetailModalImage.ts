import createDOMElement from "../../util/createDomElement";
import defaultPoster from "../../../public/images/default_poster_image.png";

interface DetailModalImageProps {
  posterPath: string | null;
}

const DetailModalImage = ({ posterPath }: DetailModalImageProps) => {
  return createDOMElement({
    tag: "div",
    class: "modal-image",
    children: createDOMElement({
      tag: "img",
      src: posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : defaultPoster,
    }),
  });
};

export default DetailModalImage;
