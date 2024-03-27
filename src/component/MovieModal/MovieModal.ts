import { $, createElement } from '../../utility/dom';
import starEmptyImage from '../../image/star_empty.png';
import modalCloseImage from '../../image/modal_close.png';
import posterEmptyImg from '../../image/poster_empty.png';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

class MovieModal {
  constructor() {
    this.#createMovieModalSection();
    this.#createMovieModalItem();
    this.#setModalDelete();
  }

  #createMovieModalSection() {
    const movieListSectionElement = $('.item-view') as Element;
    const modalElement = createElement('div', {
      class: 'modal modal-open',
    });
    const modalBackDropElement = createElement('div', {
      class: 'modal-backdrop',
    });
    const modalContainerElement = createElement('div', {
      class: 'modal-container',
    });

    modalElement.appendChild(modalBackDropElement);
    modalBackDropElement.appendChild(modalContainerElement);

    movieListSectionElement.appendChild(modalElement);
  }

  #createMovieModalItem() {
    const modalContainerElement = $('.modal-container');

    const headerElement = createElement('header', {
      class: 'modal-header',
    });
    const titleElement = createElement('span', {
      class: 'modal-title',
    });
    const cancelElement = createElement('button', {
      class: 'modal-cancel-button',
    });
    const cancelImageElement = createElement('img', {
      class: 'modal-cancel-image',
    }) as HTMLImageElement;
    cancelImageElement.src = modalCloseImage;

    cancelElement.appendChild(cancelImageElement);

    headerElement.appendChild(titleElement);
    headerElement.appendChild(cancelElement);

    const contentElement = createElement('div', {
      class: 'modal-content',
    });
    const posterWrapperElement = createElement('div', {
      class: 'modal-poster-wrapper',
    });
    const posterElement = createElement('img', {
      class: 'modal-poster',
    });

    posterWrapperElement.appendChild(posterElement);
    contentElement.appendChild(posterWrapperElement);

    const detailWrapperElement = createElement('div', {
      class: 'modal-detail-wrapper',
    });
    const genresAndvoteAverageWrapperElement = createElement('div', {
      class: 'modal-genres-and-vote-average-wrapper',
    });
    const genresElement = createElement('span', {
      class: 'modal-genres',
    });
    const voteAverageWrapper = createElement('div', {
      class: 'modal-vote-average-wrapper',
    });
    const starElement = createElement('img', {
      class: 'modal-star-filled',
    });
    const voteAverageElement = createElement('span', {
      class: 'modal-vote-average',
    });
    voteAverageWrapper.appendChild(starElement);
    voteAverageWrapper.appendChild(voteAverageElement);

    genresAndvoteAverageWrapperElement.appendChild(genresElement);
    genresAndvoteAverageWrapperElement.appendChild(voteAverageWrapper);

    detailWrapperElement.appendChild(genresAndvoteAverageWrapperElement);

    const overviewElement = createElement('p', {
      class: 'modal-overview',
    });

    detailWrapperElement.appendChild(overviewElement);

    const myVoteElementWrapper = createElement('div', {
      class: 'modal-my-vote-wrapper',
    });
    const myVoteTextElement = createElement('span', {
      class: 'modal-my-vote-text',
    });
    myVoteTextElement.textContent = '내 별점';

    const myVoteButtonWrapperElement = createElement('div', {
      class: 'my-vote-button-wrapper',
    });
    const myVoteButtonElement = createElement('button', {
      class: 'my-vote-button',
    });
    const myVoteButtonImageElement = createElement('img', {
      class: 'my-vote-button-image',
      src: starEmptyImage,
    });
    myVoteButtonElement.appendChild(myVoteButtonImageElement);

    myVoteButtonWrapperElement.appendChild(myVoteButtonElement);
    myVoteButtonWrapperElement.appendChild(myVoteButtonElement);
    myVoteButtonWrapperElement.appendChild(myVoteButtonElement);
    myVoteButtonWrapperElement.appendChild(myVoteButtonElement);
    myVoteButtonWrapperElement.appendChild(myVoteButtonElement);

    const myVoteScoreNumberElement = createElement('span', {
      class: 'my-vote-score-number',
    });

    const myVoteScoreTextElement = createElement('span', {
      class: 'my-vote-score-text',
    });

    myVoteElementWrapper.appendChild(myVoteTextElement);
    myVoteElementWrapper.appendChild(myVoteButtonWrapperElement);
    myVoteElementWrapper.appendChild(myVoteScoreNumberElement);
    myVoteElementWrapper.appendChild(myVoteScoreTextElement);

    detailWrapperElement.appendChild(myVoteElementWrapper);

    contentElement.appendChild(detailWrapperElement);

    modalContainerElement?.appendChild(headerElement);
    modalContainerElement?.appendChild(contentElement);

    return modalContainerElement;
  }

  #setModalDelete() {
    const cancelElement = $('.modal-cancel-button');
    if (cancelElement) {
      cancelElement.addEventListener('click', () => {
        const modalElement = $('.modal');
        if (modalElement) modalElement.remove();
      });
    }
  }

  setMovieModalItem(movieDetail: IMovieDetailData) {
    const titleElement = $('.modal-title') as HTMLSpanElement;
    const posterElement = $('.modal-poster') as HTMLImageElement;
    const genresElement = $('.modal-genres') as HTMLSpanElement;
    const voteAverageElement = $('.modal-vote-average') as HTMLSpanElement;
    const overviewElement = $('.modal-overview') as HTMLParagraphElement;

    titleElement.textContent =
      movieDetail.title || '해당 영화는 제목 정보를 제공하지 않습니다.';

    posterElement.src = movieDetail.poster_path
      ? `${IMAGE_BASE_URL}${movieDetail.poster_path}`
      : posterEmptyImg;

    const names = movieDetail.genres.map((genre: IGenre) => genre.name);
    genresElement.textContent =
      movieDetail.genres.length !== 0
        ? names.join(', ')
        : '해당 영화는 장르 정보를 제공하지 않습니다.';

    const voteAverage = movieDetail.vote_average;
    voteAverageElement.textContent = voteAverage
      ? String(voteAverage.toFixed(1))
      : '해당 영화는 평점 정보를 제공하지 않습니다.';

    const overview = movieDetail.overview;
    overviewElement.textContent = overview
      ? overview
      : '해당 영화는 줄거리 정보를 제공하지 않습니다.';
  }
}

export default MovieModal;
