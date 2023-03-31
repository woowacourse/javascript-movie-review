import NoImage from '../imgs/no_image.png';

export default class MovieCard extends HTMLElement {
  get movieTitle() {
    return this.getAttribute('movie-title');
  }

  get rating() {
    return this.getAttribute('rating');
  }

  get poster() {
    return this.getAttribute('poster');
  }

  get movieId() {
    return Number(this.getAttribute('movie-id'));
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
         <img
           class="item-thumbnail skeleton"
           src='${
             this.poster === 'null'
               ? NoImage
               : `https://image.tmdb.org/t/p/w220_and_h330_face${this.poster}`
           }'
           alt="${this.movieTitle}"
         />
         <p class="item-title skeleton">${this.movieTitle}</p>
         <p class="item-score skeleton">${
           this.rating
         }<img class="star-filled hidden" alt="별점" /></p>
       </div>
     </a>
   </li>
     `;
  }

  setEvent() {
    const $moiveImage = this.querySelector(
      '.item-thumbnail',
    ) as HTMLImageElement;
    const $skeletonList = this.querySelectorAll('.skeleton');
    const $star = this.querySelector('.star-filled');
    $moiveImage?.addEventListener('load', () => {
      if (!$moiveImage.complete) return;

      $skeletonList.forEach((element) => element.classList.remove('skeleton'));
      $star?.classList.remove('hidden');
    });

    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent('send-my-rating', {
          bubbles: true,
          detail: {
            movieId: this.movieId,
            movieTitle: this.movieTitle,
          },
        }),
      );
    });
  }
}

customElements.define('movie-card', MovieCard);
