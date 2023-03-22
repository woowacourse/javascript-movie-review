import MovieSummary from "../type/MovieInfo";
import { $ } from "../util/querySelector";

const modalTemplate = `
<div class="modal-header">
  <h1></h1>
  <button type="button" class="modal-close">&times;</button>
</div>
<div class="movie-poster"></div>
<div class="movie-info">
</div>
  `.trim();

class MovieModal {
  private readonly element;

  constructor(element: HTMLDialogElement) {
    this.element = element;

    this.element.innerHTML = modalTemplate;

    this.addCloseEvent();
  }

  render(info?: MovieSummary) {
    if (info) $('h1', this.element).textContent = info.genreList.join(', ');
    return this.element;
  }

  catchMovieIdEvent(event: CustomEvent) {
    if (!event.detail.info) throw new Error('[ERROR] 이벤트 detail에 id가 없습니다');
    this.render(event.detail.info);
    this.element.showModal();
  }

  private addCloseEvent() {
    $('.modal-close', this.element).addEventListener('click', () => this.element.close());

    this.element.addEventListener('click', (event) => {
      const modalPosition = this.element.getBoundingClientRect();

      if (
        modalPosition.left > event.clientX ||
        modalPosition.right < event.clientX ||
        modalPosition.top > event.clientY ||
        modalPosition.bottom < event.clientY
      ) {
        this.element.close();
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' || 'Esc' || 'Backspace') this.element.close();
    });

    window.addEventListener('popstate', () => {
      if (this.element.dataset.open === 'true') {
        history.forward();
        this.element.close();
      }
    })
  }

}

export default MovieModal;
