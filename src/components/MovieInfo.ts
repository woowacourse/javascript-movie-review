import { ModalContent } from '../index.d';
import { fetchMovieDetail } from '../store/API';

import NoImage from '../images/no-image.png';
import StarFilled from '../images/star_filled.png';
import StarEmpty from '../images/star_empty.png';

class MovieInfo {
  async fetchMovieDetail(movieId: number) {
    const moviedetail = await fetchMovieDetail(movieId);
    const movieDetail = await moviedetail.json();

    return movieDetail;
  }

  prepareModalContent(movieDetail: any) {
    const { title, poster_path, genres, vote_average, overview } = movieDetail;

    return {
      title,
      posterPath: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : NoImage,
      genres: genres.map((genre: any) => genre.name).join(', '),
      voteAverage: vote_average.toFixed(2),
      overview: overview || '해당 영화의 줄거리 정보가 없습니다.',
    };
  }

  // eslint-disable-next-line max-lines-per-function
  createModalElement(content: ModalContent) {
    const { title, posterPath, genres, voteAverage, overview } = content;
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal', 'modal--open');

    const modalHTML = /* html */ `
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="detail-title text-detail-title">${title}</h3>
          <button class="modal-close-button"></button>
        </div>
        <div class="modal-body">
          <img src=${posterPath} alt="포스터 이미지" class="detail-poster"/>
          <div class="modal-contents">
            <div class="detail-text-container">
              <div class="detail-text-top">
                <p class="detail-genres text-detail-contents">${genres}</p>
                <p class="detail-vote_average text-detail-contents">
                  <img src=${StarFilled} alt="별점" class="star-start" />
                  ${voteAverage}
                </p>
              </div>
              <p class="detail-overview text-detail-contents">${overview}</p>
            </div>
            <div class="my-vote">
              <p class="my-vote-title text-detail-vote">내 별점</p>
              <div class="my-vote-body">
                ${Array(5).fill(`<button><img src=${StarEmpty} /></button>`).join('')}
              </div>
              <p class="my-vote-number text-detail-vote-contents">0</p>
              <p class="my-vote-description text-detail-vote-contents">남겨주세요</p>
            </div>
          </div>
        </div>
      </div>
    `;

    modalElement.innerHTML = modalHTML;
    return modalElement;
  }

  generateSkeletonModal() {
    const modalElement = this.createSkeletonModalElement();
    document.body.appendChild(modalElement);

    return modalElement;
  }

  // eslint-disable-next-line max-lines-per-function
  createSkeletonModalElement() {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal', 'modal--open');

    const modalHTML = /* html */ `
      <div class="modal-backdrop"></div>
      <div class="modal-container .skeleton-container">
        <div class="modal-header">
          <h3 class="detail-title skeleton"></h3>
        </div>
        <div class="modal-body">
          <div class="detail-poster skeleton"></div>
          <div class="modal-contents">
            <div class="detail-text-container skeleton">
              <div class="detail-text-top skeleton"></div>
              <p class="detail-overview skeleton"></p>
            </div>
            <div class="my-vote skeleton"></div>
          </div>
        </div>
      </div>
    `;

    modalElement.innerHTML = modalHTML;
    return modalElement;
  }
}

const movieInfo = new MovieInfo();
export default movieInfo;
