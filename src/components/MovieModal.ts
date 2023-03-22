import { MovieDetail } from '../@types/movieType';
import starEmpty from '../asset/star_empty.png';
import starFilled from '../asset/star_filled.png';
import handleImageLoadError from '../libs/handleImageLoadError';

class MovieModal {
  private _node!: HTMLElement;
  private movieDetail: MovieDetail | null = null;
  private body = document.querySelector('body') as HTMLBodyElement;

  constructor() {
    this.createTemplate();
    this.initEventListener();
    this.body.classList.add('overflow-hidden');
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('div');
    this._node.classList.add('modal');

    this._node.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-layout">
          <div class="movie-detail-top">
            <div class="movie-detail-title skeleton"></div>
            <div class="back-button"><div>ｘ</div></div>
          </div>
          <div class="movie-detail-contents">
            <div class="movie-detail-image">
              <div class="movie-detail-thumbnail skeleton thumbnail-skeleton"></div>
            </div>
            <div class="movie-detail-info">
              <div class="movie-detail-genres-grade skeleton"></div>
              <div class="movie-detail-overview skeleton"></div>
              <div class="movie-detail-voteContainer">
                <div>내 별점</div>
                <div>
                  <img src="${starEmpty}" alt="별점" />
                  <img src="${starEmpty}" alt="별점" />
                  <img src="${starEmpty}" alt="별점" />
                  <img src="${starEmpty}" alt="별점" />
                  <img src="${starEmpty}" alt="별점" />
                </div>
                <div>이 영화 어떠나요?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
    );
  }

  // toggleBodyOverflow() {
  //   const $body = document.querySelector('body');

  //   if (!$body) return;

  //   $body.classList.toggle('overflow-hidden');
  // }

  updateMovieDetail(movieDetail: MovieDetail) {
    this.movieDetail = movieDetail;

    if (!this.movieDetail) return;

    this.updateMovieTitle();
    this.updateMovieOverview();
    this.updateMovieThumbnail();
    this.updateMovieGenresAndGrade();
  }

  updateMovieGenresAndGrade() {
    const $movieGenresAndGradeContainer = document.querySelector<HTMLDivElement>('.movie-detail-genres-grade');

    if (!$movieGenresAndGradeContainer || !this.movieDetail) return;

    const genres = this.movieDetail.genres.map(genre => genre.name).join(', ');

    $movieGenresAndGradeContainer.classList.remove('skeleton');
    $movieGenresAndGradeContainer.insertAdjacentHTML(
      'afterbegin',
      `
      <div>${genres}</div>
      <div class="movie-detail-grade"><img src="${starFilled}" alt="별점" /> ${this.movieDetail.voteAverage}</div>
    `
    );
  }

  updateMovieTitle() {
    const $movieTitle = document.querySelector<HTMLDivElement>('.movie-detail-title');

    if (!$movieTitle || !this.movieDetail) return;

    $movieTitle.classList.remove('skeleton');
    $movieTitle.innerText = this.movieDetail.title;
  }

  updateMovieOverview() {
    const $movieOverview = document.querySelector<HTMLDivElement>('.movie-detail-overview');

    if (!$movieOverview || !this.movieDetail) return;

    const overview = this.movieDetail.overview === '' ? '해당 콘텐츠의 줄거리가 없습니다.' : this.movieDetail.overview;

    $movieOverview.classList.remove('skeleton');
    $movieOverview.innerText = overview;
  }

  updateMovieThumbnail() {
    const $thumbnailSkeleton = this._node.querySelector<HTMLDivElement>('.thumbnail-skeleton');
    const $movieThumbnailContainer = document.querySelector('.movie-detail-image');
    const $thumbnail = this.createMovieThumbnail();

    if (!$movieThumbnailContainer || !$thumbnail || !$thumbnailSkeleton) return;

    $movieThumbnailContainer.insertAdjacentElement('beforeend', $thumbnail);
    $thumbnailSkeleton.remove();

    this.addThumbnailEventListener($thumbnail);
  }

  addThumbnailEventListener($thumbnail: HTMLImageElement) {
    $thumbnail.addEventListener('error', () => {
      handleImageLoadError($thumbnail);
    });
  }

  createMovieThumbnail() {
    if (!this.movieDetail) return;

    const $thumbnail = document.createElement('img');
    $thumbnail.classList.add('movie-detail-thumbnail');
    $thumbnail.src = `${this.movieDetail.posterPath}`;
    $thumbnail.alt = `${this.movieDetail.title}`;

    return $thumbnail;
  }

  closeModal() {
    this.body.classList.remove('overflow-hidden');
    this._node.dispatchEvent(new CustomEvent('closeMovieModal', { bubbles: true }));
  }

  initEventListener() {
    const $backButton = this._node.querySelector('.back-button');

    if (!$backButton) return;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Backspace' || event.key === 'Escape') this.closeModal();
    });

    $backButton.addEventListener('click', this.closeModal.bind(this));
  }
}

export default MovieModal;
