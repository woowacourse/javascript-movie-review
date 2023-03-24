import MovieList from './abstract/MovieList';

export default class MovieDetail extends MovieList {
  $target;

  constructor($target: HTMLElement) {
    super($target);

    this.$target = $target;
  }

  async getMovieDetail(router: string) {
    this.state.getValue('movieDetail'); // subscribe logic

    const movieDetailData = await this.getMovieDetailData(router);

    this.state.setValue('movieDetail', null);
    this.state.setValue('movieDetail', movieDetailData);
    this.state.emit();

    return this;
  }

  template() {
    if (this.state.getValue('movieDetail') === null) return '';

    return `
      <div class="modal">
        <div class="modal-content">
          <h2 class="movie-item-title">${
            this.state.getValue('movieDetail')?.title
          }</h2>
          <img alt="대충 그런 별" />
          <div>
            <div class="movie-genre">${
              this.state.getValue('movieDetail')?.genres
            }</div>
            <div class="stars">
              <img alt="대충 별" />
              <span class="movie-score">${
                this.state.getValue('movieDetail')?.voteAverage
              }</span>
            </div>
          </div>
          <div class="movie-content">${
            this.state.getValue('movieDetail')?.overview
          }</div>
          <div class="my-movie-scope">
            <div class="my-scope-title">내 별점</div>
            <div class="my-scepe-star"></div>
            <div class="my-scope-text">6.보통이에요</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();

    this.setEvent();
  }

  removeModal() {
    this.state.setValue('movieDetail', null);
    this.state.emit();
  }

  setEvent() {
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

  emit(router: string) {
    this.getMovieDetail(router);
  }
}
