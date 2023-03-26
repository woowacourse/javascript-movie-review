import MovieList from './abstract/MovieList';

import { MOVIE_APP_IMG_PATH, VoteMessage } from '../../constant';
import { localMemoryVoteHook } from '../../utils/localMemory';

export default class MovieDetail extends MovieList {
  $target;

  constructor($target: HTMLElement) {
    super($target);

    this.$target = $target;
  }

  async getMovieDetail(router: string) {
    const movieDetailData = await this.getMovieDetailData(router);

    this.state.setValue('movieDetail', null);
    this.state.setValue('movieDetail', movieDetailData);
    this.state.setValue(
      'star',
      localMemoryVoteHook.getVote(
        Number(this.state.getValue('movieDetail')?.id)
      )
    );
    this.state.emit();

    return this;
  }

  template() {
    if (this.state.getValue('movieDetail') === null) return '';

    return `
      <div class="modal">
        <div id="${
          this.state.getValue('movieDetail')?.id
        } "class="modal-content">
          <h2 class="movie-item-title">${
            this.state.getValue('movieDetail')?.title
          }</h2>
          <div class="flex pd-1rem">
            <img class="movie-img" src="https://image.tmdb.org/t/p/original${
              this.state.getValue('movieDetail')?.poster_path
            }" alt="movie-img" />
            <div class="mg-t-1rem mg-l-1rem flex flex--column flex--space-between">
              <div>
                <div class="flex">
                  <div class="movie-genre flex">${this.state
                    .getValue('movieDetail')
                    ?.genres.map((genre) => `<div>${genre.name}</div>`)
                    .join(',')}</div>
                  <img class="movie-score-star mg-l-1rem" src="${
                    MOVIE_APP_IMG_PATH.starFilled
                  }" alt="대충 별" />
                  <span class="movie-score">${
                    this.state.getValue('movieDetail')?.voteAverage
                  }</span>
                </div>
                <div class="movie-content mg-t-1rem">${
                  this.state.getValue('movieDetail')?.overview
                }</div>
              </div>
              <div class="my-movie-scope flex">
                <div class="my-scope-title">내 별점</div>
                <div class="star mg-l-1rem">
                  ${Array(5)
                    .fill(0)
                    .map(
                      (_, idx) =>
                        `<img data-score="${(idx + 1) * 2}" src="${
                          this.state.getValue('star') < (idx + 1) * 2
                            ? MOVIE_APP_IMG_PATH.starEmpty
                            : MOVIE_APP_IMG_PATH.starFilled
                        }" alt="대충 별" />`
                    )
                    .join('')}
                </div>
                <div class="my-scope-text mg-l-1rem">
                  ${VoteMessage[this.state.getValue('star') / 2]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  removeModal() {
    this.state.setValue('movieDetail', null);
    this.state.emit();
  }

  setModalEvent() {
    this.$target.addEventListener('click', (e) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target?.closest('.modal-content')
      ) {
        this.removeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (
        (e.key === 'Escape' || e.key === 'Backspace') &&
        !!this.state.getValue('movieDetail')
      ) {
        this.removeModal();
      }
    });
  }

  setStarEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target instanceof HTMLImageElement) {
        this.state.setValue('star', Number(e.target.dataset.score));
        this.state.emit();

        localMemoryVoteHook.setVote(
          Number(this.state.getValue('movieDetail')?.id),
          Number(e.target.dataset.score)
        );
      }
    });
  }

  setEvent() {
    this.setModalEvent();
    this.setStarEvent();
  }

  emit(router: string) {
    this.getMovieDetail(router);
  }
}
