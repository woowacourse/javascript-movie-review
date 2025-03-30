import createDOMElement from "../../util/createDomElement";
import defaultImage from "../../../public/images/default_poster_image.png";

interface BackgroundThumbnailProps {
  title: string;
  backdropPath: string | null;
}

const BackgroundThumbnail = ({ title, backdropPath }: BackgroundThumbnailProps) => {
  return createDOMElement({
    tag: "div",
    className: "background-thumbnail-wrapper loading",
    children: createDOMElement({
      tag: "img",
      class: "background-thumbnail",
      src: backdropPath ? `https://media.themoviedb.org/t/p/w440_and_h660_face${backdropPath}` : defaultImage,
      alt: title,
      onload: function () {
        this.parentElement?.classList.remove("loading");
      },
    }),
  });
};

export default BackgroundThumbnail;
