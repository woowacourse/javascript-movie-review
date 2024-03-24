import './style.css';

import { IMAGE_URL_PREFIX } from '../../constants/url';
import VoteScore from '../VoteScore/VoteScore';

interface MovieItemProps {
  id: number;
  poster: string;
  title: string;
  voteAverage: number;
}

const template = /* html */ `
  <img class="item-thumbnail" loading="lazy" />
  <p class="item-title"></p>
`;

class MovieItem {
  private template: HTMLLIElement;

  constructor(props: MovieItemProps) {
    this.template = this.createTemplate();
    this.template.appendChild(this.createVoteScore(props.voteAverage));
    this.setMovieInfo(props);
  }

  get element() {
    return this.template;
  }

  private createTemplate() {
    const movieItem = document.createElement('li');
    movieItem.classList.add('item-card');
    movieItem.innerHTML = template;
    return movieItem;
  }

  private createVoteScore(voteAverage: number) {
    const voteScore = new VoteScore(voteAverage);
    return voteScore.element;
  }

  private setMovieInfo({ id, poster, title, voteAverage }: MovieItemProps) {
    this.template.id = `${id}`;
    this.template.querySelector('.item-thumbnail')?.setAttribute('src', IMAGE_URL_PREFIX + poster);
    (this.template.querySelector('.item-title') as HTMLElement).textContent = title;
    (this.template.querySelector('.item-score') as HTMLElement).textContent = `${voteAverage}`;
  }
}

export default MovieItem;
