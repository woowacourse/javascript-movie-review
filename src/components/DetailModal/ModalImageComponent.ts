import createDOMElement from "../../util/createDomElement";
import defaultImage from "../../../public/images/default_poster_image.png";

const ModalImageComponent = (moviePoster: string, movieTitle: string) => {
  return createDOMElement({
    tag: "div",
    className: "modal-image loading",
    children: [
      createDOMElement({
        tag: "img",
        src: moviePoster ? `https://media.themoviedb.org/t/p/w440_and_h660_face${moviePoster}` : defaultImage,
        alt: movieTitle,
        onload: function () {
          this.parentElement?.classList.remove("loading");
        },
      }),
    ],
  });
};

export default ModalImageComponent;
