import Star from "../assets/star_filled.png";
class MovieCard extends HTMLElement {
  get title() {
    return this.getAttribute("title");
  }

  get rating() {
    return this.getAttribute("rating");
  }

  get poster() {
    return this.getAttribute("poster");
  }

  connectedCallback() {
    this.innerHTML = `
    <li>
       <a href="#">
         <div class="item-card">
           <img
             class="item-thumbnail"
             src="https://image.tmdb.org/t/p/w220_and_h330_face${this.poster}"
             loading="lazy"
             alt="${this.title}"
           />
           <p class="item-title">${this.title}</p>
           <p class="item-score">${this.rating}<img src=${Star} alt="별점" /> </p>
         </div>
       </a>
     </li>
       `;
  }
}

customElements.define("movie-card", MovieCard);
