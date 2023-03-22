import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { CLASS } from '../../constants/selector';
import './MovieDetailModal.style.css';
import { IMAGE_URL } from '../../constants';

const MovieDetailModal = {
  template() {
    return `
      <dialog id="movie-detail-modal">
        <div id="movie-detail-title">
          <h2></h2>
          <button id="movie-detail-close">x</button>
        </div>
        <div>
          <img
            class="${CLASS.SKELETON}"
            src=""
            onerror="this.src='${posterNotFoundImage}'"
            loading="lazy"
            alt=""
          />
          <div>
            <div id="movie-detail-genres"></div>
            <div id="movie-detail-rate"><img src=${starFilledImage} alt="별점" /><div>
            <p id="movie-detail-overview"></p>
            <div>
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
    const poster = modal?.querySelector('img') as HTMLImageElement;
    poster.src = IMAGE_URL + data.backdrop_path;
    const genres = modal?.querySelector('#movie-detail-genres') as HTMLElement;
    genres.innerHTML = data.genres
      .map((genre: any) => {
        return genre.name;
      })
      .join(', ');
    const rate = modal?.querySelector('#movie-detail-rate') as HTMLElement;
    rate.insertAdjacentText('beforeend', data.vote_average);
    const overview = modal?.querySelector('#movie-detail-overview') as HTMLElement;
    overview.innerHTML = data.overview;

    modal?.showModal();

    const closeButton = document.querySelector('#movie-detail-close') as HTMLElement;
    closeButton.addEventListener('click', () => {
      modal?.close();
    });
  },
};

export default MovieDetailModal;
