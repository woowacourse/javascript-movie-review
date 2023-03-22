import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { CLASS } from '../../constants/selector';
import './MovieDetailModal.style.css';
import { IMAGE_URL } from '../../constants';

const MovieDetailModal = {
  template() {
    return `
      <dialog id="movie-detail-modal">
        <div class="modal-backdrop"></div>
        <button id="movie-detail-close">X</button>
        <h2 id="movie-detail-title">
        </h2>
        <div id="movie-detail-main">
          <img
            class="${CLASS.SKELETON}"
            src=""
            onerror="this.src='${posterNotFoundImage}'"
            loading="lazy"
            alt=""
          />
          <div id="movie-detail">
            <div id="movie-detail-text">
              <div id="movie-detail-genre-rate">
                <div id="movie-detail-genres"></div>
                <img src=${starFilledImage} alt="별점" />
                <div id="movie-detail-rate"></div>
              </div>
              <p id="movie-detail-overview"></p>
            </div>
            <div id="movie-detail-score">
              <div>내 별점</div>
              <div>
                <img src=${starFilledImage} alt="별점" />
                <img src=${starFilledImage} alt="별점" />
                <img src=${starFilledImage} alt="별점" />
                <img src=${starFilledImage} alt="별점" />
                <img src=${starFilledImage} alt="별점" />
              </div>
              <div>6 보통이에요</div>
            </div>
          </div>
        </div>
      </dialog>
    `;
  },
  open(data: any) {
    console.log(data);
    const modal = document.querySelector<HTMLDialogElement>('dialog');
    const title = modal?.querySelector('h2') as HTMLElement;
    title.innerHTML = data.title as string;
    const overview = modal?.querySelector('#movie-detail-overview') as HTMLElement;
    if (data.overview === '') {
      overview.innerHTML = 'overview가 존재하지 않습니다.';
    } else {
      overview.innerHTML = data.overview;
    }
    const poster = modal?.querySelector('img') as HTMLImageElement;
    poster.src = IMAGE_URL + data.poster_path;
    const genres = modal?.querySelector('#movie-detail-genres') as HTMLElement;
    genres.innerHTML = data.genres
      .map((genre: any) => {
        return genre.name;
      })
      .join(', ');
    const rate = modal?.querySelector('#movie-detail-rate') as HTMLElement;
    rate.innerText = data.vote_average.toFixed(1);

    const backdrop = modal?.querySelector('.modal-backdrop') as HTMLElement;
    backdrop.style.display = 'block';
    modal?.showModal();

    const closeButton = document.querySelector('#movie-detail-close') as HTMLElement;
    closeButton.addEventListener('click', () => {
      backdrop.style.display = 'none';
      modal?.close();
    });
  },
};

export default MovieDetailModal;
