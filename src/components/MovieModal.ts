import { MovieDetail } from '../@types/movieType';
import starEmpty from '../asset/star_empty.png';
import starFilled from '../asset/star_filled.png';

class MovieModal {
  private _node!: HTMLElement;
  private movieDetail: MovieDetail | null = null;

  constructor() {
    this.createTemplate();
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
    const $movieThumbnailContainer = document.querySelector('.movie-detail-image');
    const $thumbnail = this.createMovieThumbnail();

    if (!$movieThumbnailContainer || !$thumbnail) return;

    $movieThumbnailContainer.insertAdjacentElement('beforeend', $thumbnail);

    this.addThumbnailEventListener($thumbnail);
  }

  addThumbnailEventListener($thumbnail: HTMLImageElement) {
    $thumbnail.addEventListener('load', () => {
      this.completeLoadImage($thumbnail);
    });

    $thumbnail.addEventListener('error', () => {
      this.errorLoadImage($thumbnail);
    });
  }

  createMovieThumbnail() {
    if (!this.movieDetail) return;

    const $thumbnail = document.createElement('img');
    $thumbnail.classList.add('movie-detail-thumbnail', 'hidden');
    $thumbnail.src = `${this.movieDetail.posterPath}`;
    $thumbnail.alt = `${this.movieDetail.title}`;

    return $thumbnail;
  }

  completeLoadImage($thumbnail: HTMLImageElement) {
    const $thumbnailSkeleton = this._node.querySelector<HTMLDivElement>('.thumbnail-skeleton');

    if (!$thumbnailSkeleton) return;

    $thumbnailSkeleton.remove();
    $thumbnail.classList.remove('hidden');
  }

  errorLoadImage($thumbnail: HTMLImageElement) {
    $thumbnail.src =
      'https://user-images.githubusercontent.com/112997662/223046479-306cc6a7-7024-4616-b28e-be2f2878d2f0.png';
  }
}

export default MovieModal;
