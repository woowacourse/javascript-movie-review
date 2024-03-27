import './style.css';

import StarFilled from '../../imgs/star_filled.png';
import { IMAGE_URL_PREFIX } from '../../constants/url';
import MovieDetails from '../../api/MovieDetails';
import { ResponseMovieDetail } from '../../types/ResponseMovieDetail';

interface MovieItemsProps {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}

class MovieItem {
  private template: HTMLElement;
  private movieDetail: MovieItemsProps;

  constructor() {
    this.template = this.createSkeleton();
    this.movieDetail = {
      id: 0,
      title: 'string',
      genre_ids: [],
      poster_path: '',
      backdrop_path: '',
      overview: '',
      vote_average: 0,
    };
  }

  createSkeleton() {
    const li = document.createElement('li');
    li.classList.add('li-skeleton');

    const container = document.createElement('div');
    container.classList.add('item-detail-button');

    const div = document.createElement('div');
    div.classList.add('item-card', 'skeleton');

    const img = document.createElement('img');
    img.classList.add('item-thumbnail', 'skeleton');
    img.setAttribute('loading', 'lazy');

    const p1 = document.createElement('p');
    p1.classList.add('item-title', 'skeleton');

    const scoreContainer = document.createElement('div');
    scoreContainer.classList.add('item-score-container');

    const p2 = document.createElement('p');
    p2.classList.add('item-score', 'skeleton');

    const starImg = document.createElement('img');
    starImg.classList.add('star-icon');

    scoreContainer.appendChild(p2);
    scoreContainer.appendChild(starImg);
    div.appendChild(img);
    div.appendChild(p1);
    div.appendChild(scoreContainer);
    container.appendChild(div);
    li.appendChild(container);

    return li;
  }

  insertInfo(props: MovieItemsProps) {
    this.movieDetail = props;
    this.setEventListener(props.id);
    this.template.classList.remove('li-skeleton');
    const div = this.template.querySelector('.item-card') as HTMLElement;
    div.classList.remove('skeleton');
    const img = this.template.querySelector('.item-thumbnail') as HTMLImageElement;
    img.setAttribute('src', IMAGE_URL_PREFIX + props.poster_path);
    img.setAttribute('alt', props.title);
    img.classList.remove('skeleton');
    const p1 = this.template.querySelector('.item-title') as HTMLElement;
    p1.classList.remove('skeleton');
    p1.textContent = props.title;
    const p2 = this.template.querySelector('.item-score') as HTMLElement;
    p2.classList.remove('skeleton');
    p2.innerHTML = `${props.vote_average}`;
    const starImage = this.template.querySelector('.star-icon') as HTMLImageElement;
    starImage.setAttribute('src', StarFilled);
    starImage.setAttribute('alt', '별점');
  }

  setEventListener(movie_id: number) {
    this.template.querySelector('.item-detail-button')?.addEventListener('click', () => {
      // MovieDetails.fetch({ movie_id }).then((result) => {
      //   this.dispatchToggleMovieDetailModal(result);
      // });
      this.dispatchToggleMovieDetailModal();
    });
  }

  dispatchToggleMovieDetailModal() {
    const toggleMovieDetailModal = new CustomEvent('toggleMovieDetailModal', {
      detail: { value: this.movieDetail },
      bubbles: true,
    });
    document.dispatchEvent(toggleMovieDetailModal);
  }

  getElement() {
    return this.template;
  }
}

export default MovieItem;
