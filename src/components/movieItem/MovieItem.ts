import { dom } from '../../utils/dom';

class MovieItem {
  $target: HTMLElement;

  constructor(movie: IMovie) {
    this.$target = document.createElement('li');
    this.$target.innerHTML = this.template();
    this.paint(movie);
  }

  template() {
    return `   
        <a href="#">
          <div class="item-card">
            <img
              class="item-thumbnail"
              src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
              loading="lazy"
              alt=""
            />
            <p class="item-title"></p>
            <p class="item-score"><img src="./star_filled.png" alt="별점" /></p>
          </div>
        </a>
      `;
  }

  paint(movie: IMovie) {
    const $image = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '.item-title');
    const $score = dom.getElement<HTMLParagraphElement>(this.$target, '.item-score');

    $image.setAttribute('src', movie.imageSrc);
    $image.setAttribute('alt', movie.title);
    $title.textContent = movie.title;
    $score.textContent = movie.toString();
  }
}

export default MovieItem;
