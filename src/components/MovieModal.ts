import MovieSummary from "../type/MovieInfo";
import { $ } from "../util/querySelector";

const modalTemplate = `
<section class="modal-header">
  <h1></h1>
  <button type="button" class="modal-close">&times;</button>
</section>
<section class="modal-body">
  <div class="movie-poster"></div>
  <div class="movie-info">
    <div>
      <span class="genres"></span>
      <span class="rating"></span>
    </div>
    <p class="overview"></p>
    <div class="star"></div>
  </div>
</section>

</section>
`.trim();

class MovieModal {
  private readonly element;

  constructor(element: HTMLDialogElement) {
    this.element = element;

    this.element.innerHTML = modalTemplate;

    this.addCloseEvent();
  }

  render(info?: MovieSummary) {
    if (!info) return this.element;

    const { title, genreList, overview, posterPath, voteAverage } = info;

    $('h1', this.element).textContent = title;
    $('.genres', this.element).textContent = genreList.join(', ');
    $('.rating', this.element).innerHTML = 
      `<img class="rating-icon" src="./assets/star_filled.png" alt="별점">${voteAverage.toFixed(1).toString()}`
    $('.overview', this.element).textContent = overview;
    $('.movie-poster', this.element).innerHTML = '<div class="item-thumbnail skeleton"></div>';

    const poster = document.createElement('img');
    poster.addEventListener('load', () => $('.skeleton', this.element).replaceWith(poster));
    poster.setAttribute('src', `https://image.tmdb.org/t/p/w500${posterPath}`);
    poster.setAttribute('alt', `영화 '${title}'의 포스터 사진`);

    return this.element;
  }

  catchMovieIdEvent(event: CustomEvent) {
    if (!event.detail.info) throw new Error('[ERROR] 이벤트 detail에 info가 없습니다');
    this.render(event.detail.info);
  }

  private closeModal() {
    history.back();
  }

  private isEventsPositionModalBackdrop = (event: MouseEvent) => {
    const modalPosition = this.element.getBoundingClientRect();

    if (
      modalPosition.left > event.clientX ||
      modalPosition.right < event.clientX ||
      modalPosition.top > event.clientY ||
      modalPosition.bottom < event.clientY
    ) {
      return true;
    }

    return false;
  }

  private isModalCloseKey (key: string) {
    return ['Escape', 'Esc', 'Backspace'].includes(key);
  }

  private addCloseEvent() {
    $('.modal-close', this.element).addEventListener('click', this.closeModal);

    this.element.addEventListener('click', (event) => {
      if (this.isEventsPositionModalBackdrop(event)) this.closeModal();
    });

    this.element.addEventListener('cancel', (event) => event.preventDefault());

    window.addEventListener('keyup', (event) => {
      if (this.element.open && this.isModalCloseKey(event.key)) this.closeModal();
    });

    window.addEventListener('popstate', () => {
      if (!this.element.open) this.element.showModal();
      else this.element.close();
    });
  }

}

export default MovieModal;
