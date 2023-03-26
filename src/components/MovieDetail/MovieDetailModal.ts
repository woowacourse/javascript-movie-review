import Component from '../../types/component';
import MovieDetail from '../../types/MovieDetail';
import MovieDetailDescription from './MovieDetailDescription';
import MovieDetailHeader from './MovieDetailHeader';
import MovieDetailImage from './MovieDetailImage';
import MovieDetailMyRating from './MovieDetailMyRating';
import MovieDetailRating from './MovieDetailRating';

class MovieDetailModal implements Component {
  readonly node: HTMLElement;
  private children: { [key: string]: Component } = {};

  private modal!: HTMLDialogElement;
  private backdrop!: HTMLDivElement;
  private modalBody!: HTMLDivElement;
  private modalInfo!: HTMLDivElement;

  constructor(movieDetail: MovieDetail) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-container');

    this.setChildren(movieDetail).composeNode().setElements().structContent().addEvents().showModal();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <div class='backdrop'></div>
      <dialog class="modal">
        <div class="modal-body">
        <div class="modal-info">
        </div>
      </div> 
      </dialog>
      `;

    return this;
  }

  structContent(): this {
    this.modal.insertAdjacentElement('afterbegin', this.children.header.node);
    this.modalBody.insertAdjacentElement('afterbegin', this.children.image.node);
    this.modalInfo.append(this.children.rating.node, this.children.description.node, this.children.myRating.node);

    return this;
  }

  setChildren({ title, genres, voteAverage, posterPath, overview, id }: MovieDetail): this {
    this.children = {
      header: new MovieDetailHeader(title, {
        onClose: this.#closeModal.bind(this),
      }),
      rating: new MovieDetailRating(genres, voteAverage),
      image: new MovieDetailImage(posterPath, title),
      description: new MovieDetailDescription(overview),
      myRating: new MovieDetailMyRating(id),
    };

    return this;
  }

  setElements(): this {
    const modal = this.node.querySelector<HTMLDialogElement>('dialog');
    const backdrop = this.node.querySelector<HTMLDivElement>('.backdrop');
    const modalBody = this.node.querySelector<HTMLDivElement>('.modal-body');
    const modalInfo = this.node.querySelector<HTMLDivElement>('.modal-info');

    if (!modal || !backdrop || !modalBody || !modalInfo) return this;

    this.modal = modal;
    this.backdrop = backdrop;
    this.modalBody = modalBody;
    this.modalInfo = modalInfo;

    return this;
  }

  addEvents(): this {
    this.backdrop.addEventListener('click', this.#closeModal.bind(this));
    this.modal.addEventListener('cancel', this.#closeModal.bind(this));

    return this;
  }

  #closeModal() {
    document.body.style.overflow = 'auto';
    this.node.remove();

    return this;
  }

  showModal() {
    this.modal.setAttribute('open', 'true');
    document.body.style.overflow = 'hidden';

    return this;
  }
}

export default MovieDetailModal;
