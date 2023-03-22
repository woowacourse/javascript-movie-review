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
    if (!event.detail.info) throw new Error('[ERROR] 이벤트 detail에 info가 없습니다');
    this.render(event.detail.info);
  }

  private addCloseEvent() {
    $('.modal-close', this.element).addEventListener('click', () => history.back());

    this.element.addEventListener('click', (event) => {
      const modalPosition = this.element.getBoundingClientRect();

      if (
        modalPosition.left > event.clientX ||
        modalPosition.right < event.clientX ||
        modalPosition.top > event.clientY ||
        modalPosition.bottom < event.clientY
      ) {
        history.back();
      }
    });

    this.element.addEventListener('cancel', (event) => event.preventDefault());

    window.addEventListener('keyup', (event) => {
      if (
        this.element.open &&
        ['Escape', 'Esc', 'Backspace'].includes(event.key)
       ) {
        history.back();
       }
    });

    window.addEventListener('popstate', () => {
      if (!this.element.open) {
        this.element.showModal();
        ($('body') as HTMLElement).style.overflow = 'hidden';
      }
      else {
        this.element.close();
        ($('body') as HTMLElement).style.overflow = 'auto';
      }
    });
  }

}

export default MovieModal;
