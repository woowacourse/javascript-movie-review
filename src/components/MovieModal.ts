import { $ } from "../util/querySelector";

const modalTemplate = `
  <div class="modal-bg"></div>
  <div class="modal-container">
    <div class="modal-header">
      <h1></h1>
      <button type="button" class="modal-close">&times;</button>
    </div>
    <div class="movie-poster"></div>
    <div class="movie-info">
    
    </div>
  </div>
  `.trim();

class MovieModal {
  private readonly element;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.dataset.open = 'false';

    this.element.innerHTML = modalTemplate;

    this.addCloseEvent();
  }

  render(id?: number) {
    if (id) $('h1', this.element).textContent = id.toString();

    return this.element;
  }

  open() {
    if (this.element.dataset.open === 'true') return;

    this.element.dataset.open = 'true';
  }

  close() {
    if (this.element.dataset.open === 'false') return;

    this.element.dataset.open = 'false';
  }

  catchMovieIdEvent(event: CustomEvent) {
    if (!event.detail.id) throw new Error('[ERROR] 이벤트 detail에 id가 없습니다');
    this.render(event.detail.id);
    this.open();
  }

  private addCloseEvent() {
    $('.modal-close', this.element).addEventListener('click', () => this.close());

    this.element.addEventListener('click', (event) => {
      if (event.target === $('.modal-bg', this.element)) this.close();
    });

    window.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' || 'Esc' || 'Backspace') this.close();
    });
  }

}

export default MovieModal;
