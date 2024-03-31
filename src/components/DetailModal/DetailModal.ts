import { Movie } from '../../index.d';
import closeButtonImg from '../../images/close_button.png';
import starImg from '../../images/star_filled.png';
import emptyStarImg from '../../images/star_empty.png';
import './DetailModal.css';
import MovieApi from '../../API/MovieApi';

class DetailModal {
  #modalElement = document.querySelector('dialog');

  #movieDetail: any;

  #count = 0;

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
    this.#addCloseButtonEvent(button);

    return button;
  }

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
          <div class="modal-user-star-container">
            <span class="text-subtitle">내 별점</span>
            <div class="modal-user-star-box">
             ${this.#generateStarImg()}${this.#generateEmptyStarImg()}
            </div>
            <span class="text-body">${this.#count * 2}</span>
            <span class="text-body">보통이에요</span>
          </div>
        </div>
    `;

    container.classList.add('modal-content-container');
    container.innerHTML = content;

    return container;
  }

  #addCloseButtonEvent(button: HTMLButtonElement) {
    const modal = document.querySelector('dialog');

    if (modal) {
      button.addEventListener('click', () => {
        modal.close();
      });
    }
  }

  #generateStarImg() {
    const container = document.createElement('div');

    for (let i = 0; i < this.#count; i++) {
      const button = document.createElement('button');

      button.type = 'button';
      button.classList.add('modal-user-star-button');
      button.innerHTML = /* html */ `<img src="${starImg}">`;
      this.#addStarButtonEvent(button);
      container.appendChild(button);
    }

    const img = /* html */ `
    <button type="button" class="modal-user-star-button"><img src="${starImg}"></button>
    `;
    return img.repeat(this.#count);
  }

  #generateEmptyStarImg() {
    const img = /* html */ `
    <button type="button" class="modal-user-star-button"><img src="${emptyStarImg}"></button>
    `;
    return img.repeat(5 - this.#count);
  }

  #addStarButtonEvent(button: HTMLButtonElement) {
    button.addEventListener('click', () => {
      console.log('click');
    });
  }

  get element() {
    return this.#modalElement;
  }
}

export default DetailModal;
