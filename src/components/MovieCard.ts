import { $ } from "../utils/Dom";

export default class MovieCard extends HTMLElement {
  get movieTitle() {
    return this.getAttribute("movieTitle");
  }

  get rating() {
    return this.getAttribute("rating");
  }

  get poster() {
    return this.getAttribute("poster");
  }

  get movieId() {
    return this.getAttribute("movieId");
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
  <li>
     <a href="#">
       <div class="item-card">
         <div id='skeleton' class="item-thumbnail skeleton"></div>
         <img
           class="item-thumbnail hidden"
           src="https://image.tmdb.org/t/p/w220_and_h330_face${this.poster}"
           alt="${this.movieTitle}"
         />
         <p class="item-title skeleton"></p>
         <p class="item-score skeleton"></p>
       </div>
     </a>
   </li>
     `;
  }

  setEvent() {
    const $moiveImage = this.querySelector("img");
    $moiveImage?.addEventListener("load", () => {
      this.keepSkeletonWhileImageLoading($moiveImage);
    });

    this.addEventListener("click", () => {
      const $modal = $("movie-modal");

      if (this.movieTitle && this.movieId) {
        $modal?.setAttribute("movie-title", this.movieTitle);
        $modal?.setAttribute("movie-id", this.movieId);
      }
      $modal?.classList.toggle("hidden");

      this.dispatchEvent(
        new CustomEvent("send-my-rating", {
          bubbles: true,
          detail: { movieId: Number(this.movieId) },
        })
      );
    });
  }

  keepSkeletonWhileImageLoading($moiveImage: HTMLImageElement) {
    if (!$moiveImage.complete) return;

    const $title = this.querySelector(".item-title");
    const $rating = this.querySelector(".item-score");
    const $skeleton = this.querySelector("#skeleton");

    if (
      $skeleton instanceof HTMLDivElement &&
      $title instanceof HTMLParagraphElement &&
      $rating instanceof HTMLParagraphElement
    ) {
      $skeleton.classList.add("hidden");
      if (this.movieTitle) $title.innerText = this.movieTitle;
      $title.classList.remove("skeleton");
      $rating.innerHTML = `${this.rating}<img class="star-filled" alt="별점" />`;
      $rating.classList.remove("skeleton");
      $moiveImage.classList.remove("hidden");
    }
  }
}

customElements.define("movie-card", MovieCard);
