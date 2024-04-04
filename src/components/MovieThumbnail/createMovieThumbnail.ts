import "./style.css";

import createElement from "../../utils/createElement";
import { createMovieThumbnailSkeleton } from "../MoviePreview/utils/createMovieSkeleton";

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
        class: "item-thumbnail display-none",
        src,
        alt,
      },
    });
    return img;
  }

  #setImgEvent() {
    this.#img.onload = () => {
      this.#skeletonThumbnail.classList.add("display-none");

      this.#img.classList.remove("display-none");
    };
  }
}

export default MovieThumbnail;
