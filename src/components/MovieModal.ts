import VoteMovie from './VoteMovie';
import { Genre } from '../types/fetchJsonType';
import { MovieDetail } from '../types/movieType';
import starFilled from '../asset/star_filled.png';
import handleImageLoadError from '../libs/handleImageLoadError';

class MovieModal {
  private _node!: HTMLElement;
  private body = document.querySelector('body') as HTMLBodyElement;

  constructor(movieId: number) {
    this.createTemplate(movieId);
    this.initEventListener();
    this.body.classList.add('overflow-hidden');
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(movieId: number) {
    this._node = document.createElement('div');
    this._node.classList.add('modal');

    this._node.insertAdjacentHTML(
      'afterbegin',
      /*html*/ `
      <div class="modal-backdrop">
        <div class="modal-layout">
          <div class="movie-detail-top">
            <div class="movie-detail-title skeleton"></div>
            <div class="back-button"><div>𝘅</div></div>
          </div>
          <div class="movie-detail-contents">
            <div class="movie-detail-image">
              <div class="movie-detail-thumbnail skeleton thumbnail-skeleton"></div>
            </div>
            <div class="movie-detail-info">
              <div class="movie-detail-genres-grade skeleton"></div>
              <div class="movie-detail-overview skeleton"></div>
            </div>
          </div>
        </div>
      </div>
      `
    );

    this._node.querySelector('.movie-detail-info')?.insertAdjacentElement('beforeend', new VoteMovie(movieId).node);
  }

  updateMovieDetail(movieDetail: MovieDetail) {
    const { title, voteAverage, genres, overview, posterPath } = movieDetail;

    this.updateMovieTitle(title);
    this.updateMovieOverview(overview);
    this.updateMovieThumbnail(posterPath, title);
    this.updateMovieGenresAndGrade(genres, voteAverage);
  }

  updateMovieGenresAndGrade(genres: Genre[], voteAverage: number) {
    const $movieGenresAndGradeContainer = document.querySelector<HTMLDivElement>('.movie-detail-genres-grade');

    if (!$movieGenresAndGradeContainer) return;

    const movieGenres = genres.map(genre => genre.name).join(', ');

    $movieGenresAndGradeContainer.classList.remove('skeleton');
    $movieGenresAndGradeContainer.insertAdjacentHTML(
      'afterbegin',
      /*html*/ `
      <div>${movieGenres}</div>
      <div class="movie-detail-grade"><img src="${starFilled}" alt="별점" /> ${voteAverage}</div>
    `
    );
  }

  updateMovieTitle(title: string) {
    const $movieTitle = document.querySelector<HTMLDivElement>('.movie-detail-title');

    if (!$movieTitle) return;

    $movieTitle.classList.remove('skeleton');
    $movieTitle.innerText = title;
  }

  updateMovieOverview(overview: string) {
    const $movieOverview = document.querySelector<HTMLDivElement>('.movie-detail-overview');

    if (!$movieOverview) return;

    $movieOverview.classList.remove('skeleton');
    $movieOverview.innerText = overview === '' ? '해당 콘텐츠의 줄거리가 없습니다.' : overview;
  }

  updateMovieThumbnail(posterPath: string, title: string) {
    const $thumbnailSkeleton = this._node.querySelector<HTMLDivElement>('.thumbnail-skeleton');
    const $movieThumbnailContainer = document.querySelector('.movie-detail-image');
    const $thumbnail = this.createMovieThumbnail(posterPath, title);

    if (!$movieThumbnailContainer || !$thumbnail || !$thumbnailSkeleton) return;

    $movieThumbnailContainer.insertAdjacentElement('beforeend', $thumbnail);
    $thumbnailSkeleton.remove();

    this.addThumbnailEventListener($thumbnail);
  }

  createMovieThumbnail(posterPath: string, title: string) {
    const $thumbnail = document.createElement('img');
    $thumbnail.classList.add('movie-detail-thumbnail');
    $thumbnail.src = `${posterPath}`;
    $thumbnail.alt = `${title}`;

    return $thumbnail;
  }

  addThumbnailEventListener($thumbnail: HTMLImageElement) {
    $thumbnail.addEventListener('error', () => {
      handleImageLoadError($thumbnail);
    });
  }

  closeModal() {
    this.body.classList.remove('overflow-hidden');
    this._node.dispatchEvent(new CustomEvent('closeMovieModal', { bubbles: true }));
  }

  initEventListener() {
    const $backButton = this._node.querySelector('.back-button');
    const $modalBackdrop = this._node.querySelector('.modal-backdrop');

    if (!$backButton || !$modalBackdrop) return;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Backspace' || event.key === 'Escape') this.closeModal();
    });

    $backButton.addEventListener('click', this.closeModal.bind(this));
    $modalBackdrop.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.matches('.modal-backdrop')) return;

      this.closeModal.bind(this)();
    });
  }
}

export default MovieModal;
