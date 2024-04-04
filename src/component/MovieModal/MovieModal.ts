import {
  addUserVotesToLocalStorage,
  getUserVoteScoreFromLocalStorage,
} from '../../utility/localStorage';
import { $, createElement } from '../../utility/dom';
import starFilledImage from '../../image/star_filled.png';
import starEmptyImage from '../../image/star_empty.png';
import modalCloseImage from '../../image/modal_close.png';
import posterEmptyImg from '../../image/poster_empty.png';
import { ERROR_MESSAGE, IMAGE_BASE_URL, VOTE_SCORE_MESSAGES } from '../../constant/setting';

class MovieModal {
  createMovieModalSection() {
    const movieListSectionElement = $('.item-view') as Element;
    const modalElement = createElement('div', {
      class: 'modal modal-close',
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

    this.#createMovieModalItem();
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
    }) as HTMLImageElement;
    const voteAverageElement = createElement('span', {
      class: 'modal-vote-average',
    });

    starElement.src = starFilledImage;
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

    const buttonCount = 5;
    const buttonElements = Array.from({ length: buttonCount }, (_, index) => {
      const myVoteButtonElement = createElement('button', {
        class: 'my-vote-button',
        value: String((index + 1) * 2),
      });
      const myVoteButtonImageElement = createElement('img', {
        class: 'my-vote-button-image',
        src: starEmptyImage,
      });

      myVoteButtonElement.appendChild(myVoteButtonImageElement);
      return myVoteButtonElement;
    });

    buttonElements.forEach((buttonElement) => {
      myVoteButtonWrapperElement.appendChild(buttonElement);
    });

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

    this.#setModalState();
    this.#handleMyVoteButtonClick();

    return modalContainerElement;
  }

  #setModalState() {
    const movieItemULElement = $('.item-list');
    const modalCancelButtonElement = $('.modal-cancel-button');
    const modalElement = $('.modal') as HTMLDivElement;

    if (movieItemULElement) {
      movieItemULElement.addEventListener('click', () => {
        modalElement?.classList.add('modal-open');
        modalElement?.classList.remove('modal-close');
      });
    }
    if (modalCancelButtonElement) {
      modalCancelButtonElement.addEventListener('click', () => {
        modalElement?.classList.add('modal-close');
        modalElement?.classList.remove('modal-open');
      });
    }
  }

  #handleMyVoteButtonClick() {
    const myVoteButtonWrapperElement = $('.modal-my-vote-wrapper');

    if (myVoteButtonWrapperElement) {
      myVoteButtonWrapperElement.addEventListener('click', (event) => {
        const targetElement = event.target as HTMLElement;
        if (!targetElement.classList.contains('my-vote-button-wrapper')) {
          const myVoteButtonWrapperElement = targetElement.closest(
            '.my-vote-button-wrapper',
          ) as HTMLDivElement;
          const myVoteButtonElement = targetElement.closest(
            '.my-vote-button',
          ) as HTMLButtonElement;

          const voteData = {
            id: Number(myVoteButtonWrapperElement.id),
            score: Number(myVoteButtonElement.value),
          };

          addUserVotesToLocalStorage(voteData);
          this.#updateMyVote(voteData.id);
        }
      });
    }
  }

  setMovieModalItem(movieDetail: IMovieDetailData) {
    const titleElement = $('.modal-title') as HTMLSpanElement;
    const posterElement = $('.modal-poster') as HTMLImageElement;
    const genresElement = $('.modal-genres') as HTMLSpanElement;
    const voteAverageElement = $('.modal-vote-average') as HTMLSpanElement;
    const overviewElement = $('.modal-overview') as HTMLParagraphElement;
    const myVoteButtonWrapperElement = $('.my-vote-button-wrapper');

    if (myVoteButtonWrapperElement) {
      myVoteButtonWrapperElement.id = String(movieDetail.id);
      this.#updateMyVote(movieDetail.id);
    }

    titleElement.textContent =
      movieDetail.title || ERROR_MESSAGE.NO_TITLE;

    posterElement.src = movieDetail.poster_path
      ? `${IMAGE_BASE_URL}${movieDetail.poster_path}`
      : posterEmptyImg;

    const names = movieDetail.genres.map((genre: IGenre) => genre.name);
    genresElement.textContent =
      movieDetail.genres.length !== 0
        ? names.join(', ')
        : ERROR_MESSAGE.NO_GENRES;

    const voteAverage = movieDetail.vote_average;
    voteAverageElement.textContent = voteAverage
      ? String(voteAverage.toFixed(1))
      : ERROR_MESSAGE.NO_VOTE;

    const overview = movieDetail.overview;
    overviewElement.textContent = overview
      ? overview
      : ERROR_MESSAGE.NO_OVERVIEW;
  }

  #updateMyVote(movieID: number) {
    const myVoteButtonWrapperElement = $('.my-vote-button-wrapper');
    const myVoteScoreNumberElement = $('.my-vote-score-number');
    const myVoteScoreTextElement = $('.my-vote-score-text');
    const voteScore = getUserVoteScoreFromLocalStorage(movieID);
    const starCount = voteScore / 2 - 1;

    if (myVoteButtonWrapperElement) {
      myVoteButtonWrapperElement.childNodes.forEach((myVoteButton, index) => {
        const myVoteButtonElement = myVoteButton as HTMLButtonElement;
        const myVoteButtonImageElement =
          myVoteButtonElement.firstChild as HTMLImageElement;
        if (index <= starCount && myVoteButtonImageElement) {
          myVoteButtonImageElement.src = starFilledImage;
          return;
        }
        myVoteButtonImageElement.src = starEmptyImage;
      });
    }

    if (myVoteScoreNumberElement) {
      if (voteScore === 0) {
        myVoteScoreNumberElement.textContent = '';
        return;
      }
      myVoteScoreNumberElement.textContent = String(voteScore);
    }

    if (myVoteScoreTextElement) {
      switch (voteScore) {
        case 2:
          myVoteScoreTextElement.textContent = VOTE_SCORE_MESSAGES.WORST;
          break;
        case 4:
          myVoteScoreTextElement.textContent = VOTE_SCORE_MESSAGES.NOT_GOOD;
          break;
        case 6:
          myVoteScoreTextElement.textContent = VOTE_SCORE_MESSAGES.AVERAGE;
          break;
        case 8:
          myVoteScoreTextElement.textContent = VOTE_SCORE_MESSAGES.FUN;
          break;
        case 10:
          myVoteScoreTextElement.textContent = VOTE_SCORE_MESSAGES.MASTERPIECE;
          break;
        default:
          myVoteScoreTextElement.textContent = '';
          break;
      }
    }
  }
}

export default MovieModal;
