export default class MovieModal {
  constructor(movie) {
    this.movie = movie;
    this.modalRoot = document.querySelector("#modalBackground");
  }

  render() {
    const modal = this.createModalContent();
    this.modalRoot.textContent = '';
    this.modalRoot.appendChild(modal);
    this.modalRoot.classList.add('active');
    document.body.classList.add('modal-open');
    this.addEventListeners();
  }

  close() {
    this.modalRoot.classList.remove('active');
    document.body.classList.remove('modal-open');
    this.modalRoot.textContent = '';
    document.removeEventListener('keydown', this.handleEsc);
  }

  createModalContent() {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.id = 'closeModal';

    const closeImg = document.createElement('img');
    closeImg.src = 'images/modal_button_close.png';
    closeButton.appendChild(closeImg);

    const container = document.createElement('div');
    container.className = 'modal-container';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'modal-image';

    const poster = document.createElement('img');
    poster.src = this.movie.getPosterUrl();
    poster.alt = this.movie.title;

    imageWrapper.appendChild(poster);

    const description = document.createElement("div");
    description.className = "modal-description";

    const title = document.createElement("h2");
    title.textContent = this.movie.title;

    const category = document.createElement("p");
    category.className = "category";
    category.textContent = `${this.movie.getGenres ?? "장르 정보 없음"}`;

    const rate = document.createElement("p");
    rate.className = "rate";
    const starImg = document.createElement("img");
    starImg.src = "./images/star_filled.png";
    starImg.className = "star";
    const rateText = document.createElement("span");
    rateText.textContent = this.movie.getVoteAverage();
    rate.append(starImg, rateText);

    const hr = document.createElement("hr");

    const detail = document.createElement("p");
    detail.className = "detail";
    detail.textContent = this.movie.overview;

    description.append(title, category, rate, hr, detail);
    container.append(imageWrapper, description);
    modal.append(closeButton, container);

    return modal;
  }

  addEventListeners() {
    const closeButton = document.querySelector('#closeModal');
    const overlay = this.modalRoot;

    closeButton?.addEventListener('click', this.close.bind(this))
    overlay?.addEventListener('click', this.closeModalByOverlay.bind(this));
    document.addEventListener('keydown', this.handleEsc)
  }

  closeModalByOverlay(e) {
    if (e.target === this.modalRoot) {
      this.close();
    }
  }

  handleEsc = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}