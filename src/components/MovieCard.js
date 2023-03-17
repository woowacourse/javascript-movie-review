import Star from "../assets/star_filled.png";

export default class MovieCard extends HTMLElement {
  get title() {
    return this.getAttribute("title");
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
           alt="${this.title}"
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

    $moiveImage.addEventListener("load", () => {
      if (!$moiveImage.complete) return;

      const $title = this.querySelector(".item-title");
      const $rating = this.querySelector(".item-score");

      this.querySelector("#skeleton").classList.add("hidden");
      $title.innerText = this.title;
      $title.classList.remove("skeleton");
      $rating.innerHTML = `${this.rating}<img src=${Star} alt="별점" />`;
      $rating.classList.remove("skeleton");
      $moiveImage.classList.remove("hidden");
    });
  }
}

customElements.define("movie-card", MovieCard);
