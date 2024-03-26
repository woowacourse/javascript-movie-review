import { IMAGE_URL_PREFIX } from '../../constants/url';
import { Genre } from '../../types/ResponseMovieDetail';
import './style.css';

interface MovieDetailModalProps {
  title: string;
  genres: Genre[];
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
}

class MovieDetailModal {
  private template: HTMLElement;

  constructor() {
    this.template = this.createBackdrop();
    this.setEventListener();
    this.createMovieDetail();
  }

  createBackdrop() {
    const div = document.createElement('div');
    div.classList.add('modal', 'modal--open');
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
      <h class="movie-detail-title">
      타이틀이에요
      </h>
    </div>
    <main class="detail-items">
      <img class="detail-poster"></img>
      <section class="detail-contents">
        <div class="detail-genre-score">
          <p class="detail-genre">액션, 코미디</p>
          <div class="detail-score-container>
            <img class="star-icon"></img>
            <p class="detail-score">6.12</p>
          </div>
        </div>
        <p class="detail-overview">
          설명임
        </p>
        <div class="my-score">
        별 점 별 점
        </div>
        </section>
      </main>
    `;
    const modalContainer = this.template.querySelector('.modal-container') as HTMLElement;
    modalContainer.innerHTML = html;
  }

  setMovieDetail({
    title,
    genres,
    poster_path,
    backdrop_path,
    vote_average,
    overview,
  }: MovieDetailModalProps) {
    const titleElement = this.template.querySelector('.movie-detail-title') as HTMLHeadingElement;
    titleElement.textContent = title;
    const genreElement = this.template.querySelector('.detail-genre') as HTMLParagraphElement;
    genreElement.textContent = genres.map((genre) => genre.name).join(', ');
    const posterElement = this.template.querySelector('.detail-poster') as HTMLImageElement;
    posterElement.src = `${IMAGE_URL_PREFIX}${poster_path}`;
    posterElement.alt = title;
    const scoreElement = this.template.querySelector('.detail-score') as HTMLParagraphElement;
    scoreElement.textContent = `${vote_average}`;
    const overviewElement = this.template.querySelector('.detail-overview') as HTMLParagraphElement;
    overviewElement.textContent = overview;
  }

  setEventListener() {
    this.template.querySelector('.modal-backdrop')?.addEventListener('click', () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    this.template.classList.toggle('modal--open');
  }

  getElement() {
    return this.template;
  }
}

export default MovieDetailModal;
