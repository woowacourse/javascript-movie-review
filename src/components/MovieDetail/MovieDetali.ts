import './style.css';

import MovieDetailRequest from '../../api/MovieDetailRequest';
import { IMAGE_URL_PREFIX } from '../../constants/url';
import MovieInfo, { IMovieDetail } from '../../domainObject/MovieInfo';
import VoteScore from '../VoteScore/VoteScore';
import StarRating from '../StarRating/StarRating';

const template = /* html */ `
  <header class="detail-header">
    <h2 class="title text-subtitle"></h2>
  </header>
  <div class="detail-body">
    <img class="poster" />
    <article class="detail-content">
      <figcaption class="movie-summary">
        <div class="outline">
          <p class="genres text-body"></p>
        </div>
        <p class="overview text-body"></p>
      </figcaption>
      <aside class="vote-my-rate"></aside>
    </article>
  </article>
`;

class MovieDetail {
  private template: HTMLElement;

  constructor() {
    this.template = this.createElements();
  }

  get element() {
    return this.template;
  }

  private createElements() {
    const container = document.createElement('div');
    container.className = 'detail-container';
    container.innerHTML = template;
    return container;
  }

  private createStarRating() {
    const starRating = new StarRating({ initRate: 6 });
    this.template.querySelector('.vote-my-rate')?.appendChild(starRating.element);
  }

  async requestMovieDetail(id: number) {
    const response = await MovieDetailRequest.list({ id });
    return MovieInfo.getDetail(response);
  }

  private resetMovieDetail() {
    this.setTitle('');
    this.resetPoster();
    this.resetVoteScore();
    this.resetStarRating();
  }

  setMovieDetail(movieDetail: IMovieDetail) {
    const { title, poster, backdropImage } = movieDetail;
    this.resetMovieDetail();
    this.setBackdropImage(backdropImage);
    this.setTitle(title);
    this.setPoster(title, poster);
    this.setMovieContent(movieDetail);
  }

  private setMovieContent({ genres, voteAverage, overview }: IMovieDetail) {
    this.setGenres(genres);
    this.setVoteScore(voteAverage);
    this.setOverview(overview);
    this.createStarRating();
  }

  private setBackdropImage(backdropImage: string) {
    const modalContainer = this.template.closest('.detail-container') as HTMLElement;
    modalContainer.style.backgroundImage = `url(${IMAGE_URL_PREFIX + backdropImage})`;
  }

  private setTitle(title: string) {
    (this.template.querySelector('.title') as HTMLElement).textContent = title;
  }

  private setPoster(title: string, poster: string) {
    const image = this.template.querySelector('.poster');
    image?.setAttribute('src', IMAGE_URL_PREFIX + poster);
    image?.setAttribute('alt', `${title}-poster`);
  }

  private setGenres(genres: string[]) {
    const p = this.template.querySelector('.genres') as HTMLParagraphElement;
    p.textContent = genres.join(', ');
  }

  private setVoteScore(voteAverage: number) {
    this.template.querySelector('.outline')?.appendChild(new VoteScore(voteAverage).element);
  }

  private setOverview(overview: string) {
    const p = this.template.querySelector('.overview') as HTMLParagraphElement;
    p.textContent = overview;
  }

  private resetPoster() {
    const image = this.template.querySelector('.poster');
    image?.removeAttribute('src');
    image?.removeAttribute('alt');
  }

  private resetVoteScore() {
    const itemScore = this.template.querySelector('.item-score-container');
    itemScore?.remove();
  }

  private resetStarRating() {
    this.template.querySelector('.star-rating')?.remove();
  }
}

export default MovieDetail;
