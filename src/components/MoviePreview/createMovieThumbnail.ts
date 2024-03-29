import createElement from "../../utils/createElement";
import { createMovieThumbnailSkeleton } from "./utils/createMovieSkeleton";

class MovieThumbnail {
  element = createElement<HTMLDivElement>("div");
  #skeletonThumbnail = createMovieThumbnailSkeleton();
  #img;

  constructor(src: string, alt: string) {
    this.#img = this.#createImg(src, alt);

    this.#setImgEvent();
    this.element.append(this.#skeletonThumbnail, this.#img);
  }

  #createImg(src: string, alt: string) {
    const img = createElement<HTMLImageElement>("img", {
      attrs: {
        class: "item-thumbnail visibility-hidden-no-position",
        src,
        loading: "lazy",
        alt,
      },
    });
    return img;
  }

  #setImgEvent() {
    this.#img.onload = () => {
      this.#skeletonThumbnail.classList.add("display-none");

      this.#img.classList.remove("visibility-hidden-no-position");
    };
  }
}

export default MovieThumbnail;
