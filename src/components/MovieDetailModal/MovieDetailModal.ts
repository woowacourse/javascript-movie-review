import './style.css';

import MovieGenresCollection from '../../domain/MovieGenresCollection';

import ScoreSelector from '../ScoreSelector/ScoreSelector';

import { BACKDROP_URL_PREFIX, IMAGE_URL_PREFIX } from '../../constants/url';

import StarFilled from '../../imgs/star_filled.png';
import CloseButton from '../../imgs/close_button.svg';
import Placeholder from '../../imgs/poster-placeholder.svg';

interface MovieDetailModalProps {
  title: string;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
}

class MovieDetailModal {
  private template: HTMLElement;
  private scoreSelector: ScoreSelector;

  constructor() {
    this.scoreSelector = new ScoreSelector();
    this.template = this.createTemplate();
    this.createMovieDetail();
    this.setEventListener();
  }

  createTemplate() {
    const div = document.createElement('div');
    div.classList.add('modal');

    const backDrop = document.createElement('div');
    backDrop.classList.add('modal-backdrop');

    const container = document.createElement('div');
    container.classList.add('modal-container');

    div.appendChild(backDrop);
    div.appendChild(container);

    return div;
  }

  createMovieDetail() {
    const html = `
    <div class="movie-detail-header">
      <h1 class="font-title movie-detail-title">
      타이틀이에요
      </h1>
      <img class="close-button" src=${CloseButton} alt="닫기"></img>
    </div>
    <main class="detail-items">
      <div class="detail-poster-container">
        <img class="detail-poster"></img>
      </div>
      <section class="detail-contents">
        <div class="detail-genre-score">
          <p class="font-body detail-genre"></p>
          <div class="detail-score-container">
            <img class="star-icon" src=${StarFilled} alt="별점"></img>
            <p class="font-body detail-score">6.12</p>
          </div>
        </div>
        <p class="font-body detail-overview">
          설명임
        </p>
        </section>
        <div class="backdrop-image"></div>
      </main>
    `;

    const modalContainer = this.template.querySelector('.modal-container') as HTMLElement;
    modalContainer.innerHTML = html;

    const section = this.template.querySelector('section') as HTMLElement;
    section.appendChild(this.scoreSelector.getElement());
  }

  setMovieDetail({
    title,
    genre_ids,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
  }: MovieDetailModalProps) {
    this.scoreSelector.initializeScore(title);

    const backdrop = this.template.querySelector('.backdrop-image') as HTMLDivElement;
    backdrop.style.backgroundImage = `url(${BACKDROP_URL_PREFIX}${backdrop_path})`;

    const titleElement = this.template.querySelector('.movie-detail-title') as HTMLHeadingElement;
    titleElement.textContent = title;

    const genreElement = this.template.querySelector('.detail-genre') as HTMLParagraphElement;
    genreElement.textContent = this.genreIdsToGenreNames(genre_ids).join(', ');

    const posterElement = this.template.querySelector('.detail-poster') as HTMLImageElement;
    posterElement.setAttribute('src', poster_path ? IMAGE_URL_PREFIX + poster_path : Placeholder);
    posterElement.alt = title;

    const scoreElement = this.template.querySelector('.detail-score') as HTMLParagraphElement;
    scoreElement.textContent = `${vote_average}`;

    const overviewElement = this.template.querySelector('.detail-overview') as HTMLParagraphElement;
    overviewElement.textContent = overview ? overview : '등록된 영화 설명이 없어요.';
  }

  genreIdsToGenreNames(genreIds: number[]): string[] {
    return genreIds.map(
      (genreId) => MovieGenresCollection.getGenreNameByGenreId(genreId) ?? '기타',
    );
  }

  setEventListener() {
    this.template.querySelector('.close-button')?.addEventListener('click', () => {
      this.toggleModal();
    });

    this.template.querySelector('.modal-backdrop')?.addEventListener('click', () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    this.template.classList.toggle('modal--open');
    document.body.classList.toggle('body--overflow-hidden');
  }

  getElement() {
    return this.template;
  }
}

export default MovieDetailModal;
