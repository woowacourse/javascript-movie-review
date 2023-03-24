import starFilled from '../assets/star_filled.png';
import starEmpty from '../assets/star_empty.png';
import { Genre, GetMovieDetailResponse } from '../service/types';

export default class MovieDetailModal {
  movieDetail: GetMovieDetailResponse;
  $parent: HTMLElement;
  $modal: HTMLDialogElement;
  $closeButton: HTMLButtonElement;
  $userVoteStarSpan: HTMLSpanElement;
  starRate: number;

  constructor($parent: HTMLElement, movieDetail: GetMovieDetailResponse) {
    this.movieDetail = movieDetail;
    this.starRate = Number(
      JSON.parse(localStorage.getItem('userMovieVoteValues') ?? '{}')[this.movieDetail.id] ?? 0,
    );

    this.$parent = $parent;
    this.$parent.insertAdjacentHTML('beforeend', this.template());
    this.$modal = this.$parent.querySelector('.movie-detail-modal') as HTMLDialogElement;
    this.$closeButton = this.$modal.querySelector(
      '.movie-detail-modal-close-button',
    ) as HTMLButtonElement;
    this.$userVoteStarSpan = this.$modal.querySelector('#user-vote-star-span') as HTMLSpanElement;
  }

  template() {
    const { title, poster_path, genres, vote_average, overview } = this.movieDetail;

    const getGenreNames = (genres: Genre[]) => {
      return genres.map((genre) => genre.name);
    };
    return `
    <dialog class='movie-detail-modal'>
      <div class="movie-detail-modal-title-container">
        <span class='movie-detail-modal-title'>${title}</span>
        <button class='movie-detail-modal-close-button'>X</button>
      </div>
      <div class='movie-detail-modal-main'>
        <div class="movie-detail-modal-thumbnail">
          <img
            src="https://image.tmdb.org/t/p/original/${poster_path}"
            alt="Grapefruit slice atop a pile of other slices"
          />
        </div>
        <section class="movie-detail-modal-description">
          <div>
            <div class="movie-detail-modal-genre-vote">
              <span>${getGenreNames(genres).join(',')}</span>
              <span class="item-score"><img src="${starFilled}" alt="별점" /><span class='item-vote-average'>${vote_average}</span>
              </div>
            <p>${overview}</p>
          </div>
          <div class="movie-detail-modal-user-vote">
            <span id="user-vote-title">내 별점</span>
            <span id="user-vote-star-span">
              <img data-rate="2" src="${this.starRate >= 2 ? starFilled : starEmpty}" alt="별점"/>
              <img data-rate="4" src="${this.starRate >= 4 ? starFilled : starEmpty}" alt="별점"/>
              <img data-rate="6" src="${this.starRate >= 6 ? starFilled : starEmpty}" alt="별점"/>
              <img data-rate="8" src="${this.starRate >= 8 ? starFilled : starEmpty}" alt="별점"/>
              <img data-rate="10" src="${this.starRate >= 10 ? starFilled : starEmpty}" alt="별점"/>
            </span>
            <span id="user-vote-star-amount">${this.starRate}</span>
            <span id="user-vote-star-description">${this.getStarDescription(this.starRate)}</span>
          </div>
        </section>
      </div>
    </dialog>
    `;
  }

  getStarDescription(starRate: number) {
    return {
      0: '평가해주세요',
      2: '최악이예요',
      4: '별로예요',
      6: '보통이에요',
      8: '재미있어요',
      10: '명작이에요',
    }[starRate];
  }

  bindEvent() {
    // handleUserVoteStar
    this.$closeButton.addEventListener('click', () => {
      this.close();
    });

    this.$userVoteStarSpan.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLImageElement)) return;

      console.log(this.movieDetail.id);
      console.log(e.target.dataset.rate);

      this.starRate = Number(e.target.dataset.rate);
      const $movieDetailModalUserVote = this.$modal.querySelector(
        '.movie-detail-modal-user-vote',
      ) as HTMLDivElement;

      $movieDetailModalUserVote.innerHTML = `
      <span id="user-vote-title">내 별점</span>
      <span id="user-vote-star-span">
        <img data-rate="2" src="${this.starRate >= 2 ? starFilled : starEmpty}" alt="별점"/>
        <img data-rate="4" src="${this.starRate >= 4 ? starFilled : starEmpty}" alt="별점"/>
        <img data-rate="6" src="${this.starRate >= 6 ? starFilled : starEmpty}" alt="별점"/>
        <img data-rate="8" src="${this.starRate >= 8 ? starFilled : starEmpty}" alt="별점"/>
        <img data-rate="10" src="${this.starRate >= 10 ? starFilled : starEmpty}" alt="별점"/>
      </span>
      <span id="user-vote-star-amount">${this.starRate}</span>
      <span id="user-vote-star-description">${this.getStarDescription(this.starRate)}</span>
      `;
    });

    // Esc 누르면 $modal 요소 삭제
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  show() {
    this.$modal.showModal();
  }

  close() {
    this.$modal.remove();
    localStorage.setItem(
      'userMovieVoteValues',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('userMovieVoteValues') ?? '{}'),
        [this.movieDetail.id]: this.starRate,
      }),
    );
  }
}
