import './style.css';

import StarFilled from '../../imgs/star_filled.png';
import { IMAGE_URL_PREFIX } from '../../constants/url';

interface MovieItemsProps {
  poster_path: string;
  title: string;
  vote_average: number;
}

const template = /* html */ `
  <a href="#">
    <div class="item-card">
      <img class="item-thumbnail" loading="lazy" />
      <p class="item-title"></p>
      <div class="item-score-container">
        <p class="item-score"></p>
        <img class="star-icon" alt="별점" />
      </div>
    </div>
  </a>
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

  createTemplate() {
    const movieItem = document.createElement('li');
    movieItem.innerHTML = template;
    return movieItem;
  }

  setMovieInfo({ poster_path, title, vote_average }: MovieItemsProps) {
    this.template
      .querySelector('.item-thumbnail')
      ?.setAttribute('src', IMAGE_URL_PREFIX + poster_path);
    (this.template.querySelector('.item-title') as HTMLElement).textContent = title;
    (this.template.querySelector('.item-score') as HTMLElement).textContent = `${vote_average}`;
    this.template.querySelector('.star-icon')?.setAttribute('src', StarFilled);
  }
}

export default MovieItem;
