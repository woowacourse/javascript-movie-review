import {
  getMovieRating,
  getRatingText,
  saveMovieRating,
} from '../../service/MovieRatingService';
import { MovieDetail } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const DEFAULT_IMAGE_URL = './images/no_image.png';

const createCloseButton = (): HTMLButtonElement => {
  return createElement<HTMLButtonElement>('button', {
    className: 'close-modal',
    id: 'closeModal',
    children: [
      createElement<HTMLImageElement>('img', {
        src: './images/modal_button_close.png',
      }),
    ],
  });
};

const createImageSection = (movie: MovieDetail): HTMLDivElement => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : DEFAULT_IMAGE_URL;

  return createElement<HTMLDivElement>('div', {
    className: 'modal-image',
    children: [
      createElement<HTMLImageElement>('img', {
        src: posterUrl,
        alt: movie.title,
      }),
    ],
  });
};

const createRatingSection = (average: number): HTMLParagraphElement => {
  return createElement<HTMLParagraphElement>('p', {
    className: 'rate',
    children: [
      createElement<HTMLImageElement>('img', {
        src: './images/star_filled.png',
        className: 'star',
      }),
      createElement<HTMLSpanElement>('span', {
        textContent: average.toFixed(1),
      }),
    ],
  });
};

const createMyRatingSection = (movieId: number): HTMLDivElement => {
  const savedRating = getMovieRating(movieId);
  const ratingText = getRatingText(savedRating);

  const starContainer = createElement<HTMLDivElement>('div', {
    className: 'star-container',
  });

  const ratingLabel = createElement<HTMLSpanElement>('span', {
    className: 'rating-text',
    textContent: ratingText,
  });

  for (let starValue = 2; starValue <= 10; starValue += 2) {
    const isFilled = savedRating >= starValue;

    const starImg = createElement<HTMLImageElement>('img', {
      src: isFilled ? './images/star_filled.png' : './images/star_empty.png',
      className: 'star',
    });

    const starButton = createElement<HTMLButtonElement>('button', {
      className: 'rating-star',
      children: [starImg],
    });

    starButton.addEventListener('click', () => {
      saveMovieRating(movieId, starValue);

      const stars = starContainer.querySelectorAll('.rating-star img');
      stars.forEach((star, index) => {
        const starImg = star as HTMLImageElement;
        starImg.src =
          index * 2 < starValue
            ? './images/star_filled.png'
            : './images/star_empty.png';
      });

      ratingLabel.textContent = getRatingText(starValue);
    });

    starContainer.append(starButton, ratingLabel);
  }

  return createElement<HTMLDivElement>('div', {
    className: 'my-rating',
    children: [
      createElement<HTMLDivElement>('div', {
        className: 'rating-header',
        children: [
          createElement<HTMLParagraphElement>('p', {
            className: 'rating-label',
            textContent: '내 별점',
          }),
        ],
      }),
      starContainer,
      createElement<HTMLHRElement>('hr'),
    ],
  });
};

const createCategoryText = (movie: MovieDetail): string => {
  const year = movie.release_date ? movie.release_date.split('-')[0] : '';
  let categories = '';

  if (movie.genres && movie.genres.length > 0) {
    categories = movie.genres.map((genre) => genre.name).join(', ');
  }

  return `${year}${categories ? ' · ' + categories : ''}`;
};

const createDescriptionSection = (movie: MovieDetail): HTMLDivElement => {
  return createElement<HTMLDivElement>('div', {
    className: 'modal-description',
    children: [
      createElement<HTMLHeadingElement>('h2', {
        textContent: movie.title,
      }),
      createElement<HTMLParagraphElement>('p', {
        className: 'category',
        textContent: createCategoryText(movie),
      }),
      createRatingSection(movie.vote_average),
      createElement<HTMLHRElement>('hr'),
      createMyRatingSection(movie.id),
      createElement<HTMLParagraphElement>('div', {
        className: 'subtitle',
        textContent: '줄거리',
      }),
      createElement<HTMLParagraphElement>('p', {
        className: 'detail',
        textContent: movie.overview || '줄거리가 없습니다',
      }),
    ],
  });
};

const createModalContainer = (
  imageSection: HTMLDivElement,
  descriptionSection: HTMLDivElement,
): HTMLDivElement => {
  return createElement<HTMLDivElement>('div', {
    className: 'modal-container',
    children: [imageSection, descriptionSection],
  });
};

const createModal = (
  closeButton: HTMLButtonElement,
  modalContainer: HTMLDivElement,
): HTMLDivElement => {
  return createElement<HTMLDivElement>('div', {
    className: 'modal',
    children: [closeButton, modalContainer],
  });
};

export const MovieDetailModal = (movie: MovieDetail): HTMLDivElement => {
  const closeButton = createCloseButton();
  const imageSection = createImageSection(movie);
  const descriptionSection = createDescriptionSection(movie);
  const modalContainer = createModalContainer(imageSection, descriptionSection);
  const modal = createModal(closeButton, modalContainer);

  const modalBackground = createElement<HTMLDivElement>('div', {
    className: 'modal-background active',
    id: 'modalBackground',
    children: [modal],
  });

  const closeModal = () => {
    modalBackground.classList.remove('active');
    setTimeout(() => {
      modalBackground.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  closeButton.addEventListener('click', closeModal);

  modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
      closeModal();
    }
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return modalBackground;
};

export const openModal = (movie: MovieDetail): HTMLDivElement => {
  const detailModal = MovieDetailModal(movie);
  document.body.appendChild(detailModal);
  document.body.style.overflow = 'hidden';

  return detailModal;
};
