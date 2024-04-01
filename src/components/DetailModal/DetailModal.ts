import closeButtonImg from '../../images/close_button.png';
import starImg from '../../images/star_filled.png';
import './DetailModal.css';
import MovieApi from '../../API/MovieApi';
import UserRate from '../UserRate/UserRate';

class DetailModal {
  #modalElement = document.querySelector('dialog');

  #movieDetail: any;

  constructor(movie: any) {
    this.#getMovieDetail(movie.id);
  }

  async #getMovieDetail(movieId: number) {
    if (this.#modalElement) {
      this.#modalElement.innerHTML = this.#generateSkeleton();
      const detailData = await MovieApi.getDetailData(movieId);

      this.#modalElement.innerHTML = '';
      this.#movieDetail = detailData;
      this.#generateContainer(detailData);
      this.#generateUserRate(movieId);
    }
  }

  #getMovieGenres(genres: any[]) {
    const genresName = genres.map((genre) => genre.name);

    return genresName.join(', ');
  }

  #generateContainer(detailData: any) {
    const container = document.createElement('div');

    container.classList.add('modal-container');

    container.appendChild(this.#generateHeader(detailData));
    container.appendChild(this.#generateCloseButton());
    container.appendChild(this.#generateContent(detailData));
    this.#modalElement?.appendChild(container);
  }

  #generateHeader(detailData: any) {
    const container = document.createElement('div');
    const title = document.createElement('h3');

    container.classList.add('modal-header');
    title.classList.add('text-title', 'modal-title');
    title.innerText = detailData.title;

    container.appendChild(title);

    return container;
  }

  #generateCloseButton() {
    const button = document.createElement('button');
    const img = document.createElement('img');

    img.src = closeButtonImg;
    button.classList.add('modal-button');
    button.appendChild(img);
    this.#addCloseEvent(button);

    return button;
  }

  /* eslint-disable max-lines-per-function */
  #generateSkeleton() {
    const element = /* html */ `
    <div class="modal-container">
      <div class="modal-header"></div>
      <div class="modal-content-container">
        <div class="modal-img skeleton"></div>
        <div class="modal-content">
        <div>
          <div class="modal-title skeleton"></div>
          <div class="modal-score skeleton"></div>
        </div>
        </div>
      </div>
    </div>
     `;

    return element;
  }

  /* eslint-disable max-lines-per-function */
  #generateContent(detailData: any) {
    const container = document.createElement('div');
    const content = /* html */ `
        <div class="modal-img-container">
          <img src="https:image.tmdb.org/t/p/w220_and_h330_face${detailData.poster_path}" loading="lazy" class="modal-img">
        </div>
        <div class="modal-content">
          <div class="modal-movie-info">
            <div class="modal-genre-star-box">
              <div class="modal-genre text-body">
                ${this.#getMovieGenres(detailData.genres)}
              </div>
              <div class="modal-star">
                <img src=${starImg}> <span class="text-body">${detailData.vote_average.toFixed(2)}</span>
              </div>
            </div>
            <p class="modal-description text-body">
              ${detailData.overview}
            </p>
          </div>

        </div>
    `;

    container.classList.add('modal-content-container');
    container.innerHTML = content;

    return container;
  }

  #addCloseEvent(button: HTMLButtonElement) {
    button.addEventListener('click', () => {
      this.#modalElement?.close();
    });
    this.#modalElement?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.nodeName === 'DIALOG') this.#modalElement?.close();
    });
  }

  #generateUserRate(movieId: number) {
    const modalContent = document.querySelector('.modal-content');
    const userRate = new UserRate(movieId);

    modalContent?.appendChild(userRate.element);
  }

  get element() {
    return this.#modalElement;
  }
}

export default DetailModal;
