import './style.css';

import StarFilled from '../../imgs/star_filled.png';
import { IMAGE_URL_PREFIX } from '../../constants/url';

interface MovieItemsProps {
  poster: string;
  title: string;
  voteAverage: number;
}

const template = /* html */ `
  <img class="item-thumbnail movie-item" loading="lazy" />
  <p class="item-title movie-item"></p>
  <div class="item-score-container movie-item">
    <p class="item-score movie-item"></p>
    <img class="star-icon movie-item" alt="별점" />
  </div>
`;

class MovieItem {
  private template: HTMLLIElement;

  constructor(props: MovieItemsProps) {
    this.template = this.createTemplate();
    this.setMovieInfo(props);
  }

  get element() {
    return this.template;
  }

  private createTemplate() {
    const movieItem = document.createElement('li');
    movieItem.classList.add('item-card', 'movie-item');
    movieItem.innerHTML = template;
    return movieItem;
  }

  private setMovieInfo({ poster, title, voteAverage }: MovieItemsProps) {
    this.template.querySelector('.item-thumbnail')?.setAttribute('src', IMAGE_URL_PREFIX + poster);
    (this.template.querySelector('.item-title') as HTMLElement).textContent = title;
    (this.template.querySelector('.item-score') as HTMLElement).textContent = `${voteAverage}`;
    this.template.querySelector('.star-icon')?.setAttribute('src', StarFilled);
  }
}

export default MovieItem;
