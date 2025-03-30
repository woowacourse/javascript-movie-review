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

const createRatingSection = (vote_average: number): HTMLParagraphElement => {
  const formattedRating = vote_average.toFixed(1);

  return createElement<HTMLParagraphElement>('p', {
    className: 'rate',
    children: [
      createElement<HTMLImageElement>('img', {
        src: './images/star_filled.png',
        className: 'star',
      }),
      createElement<HTMLSpanElement>('span', {
        textContent: formattedRating,
      }),
    ],
  });
};

const createMyRatingSection = (): HTMLDivElement => {
  const starButtons = [];
  for (let i = 1; i <= 5; i++) {
    starButtons.push(
      createElement<HTMLButtonElement>('button', {
        className: 'rating-star',
        children: [
          createElement<HTMLImageElement>('img', {
            src: './images/star_empty.png',
          }),
        ],
      }),
    );
  }

  return createElement<HTMLDivElement>('div', {
    className: 'my-rating',
    children: [
      createElement<HTMLParagraphElement>('p', {
        className: 'rating-label',
        textContent: '내 별점',
      }),
      createElement<HTMLDivElement>('div', {
        className: 'star-container',
        children: starButtons,
      }),

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
  const children = [
    createElement<HTMLHeadingElement>('h2', {
      textContent: movie.title,
    }),
    createElement<HTMLParagraphElement>('p', {
      className: 'category',
      textContent: createCategoryText(movie),
    }),
    createRatingSection(movie.vote_average),
    createElement<HTMLHRElement>('hr'),
  ];

  children.push(createMyRatingSection());

  children.push(
    createElement<HTMLParagraphElement>('div', {
      textContent: '줄거리',
    }),
  );

  children.push(
    createElement<HTMLParagraphElement>('p', {
      className: 'detail',
      textContent: movie.overview || '',
    }),
  );

  return createElement<HTMLDivElement>('div', {
    className: 'modal-description',
    children,
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

export const MovieModal = (movie: MovieDetail): HTMLDivElement => {
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

  closeButton.addEventListener('click', () => {
    modalBackground.classList.remove('active');
    setTimeout(() => {
      modalBackground.remove();
    }, 300);
  });

  modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
      closeButton.click();
    }
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeButton.click();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  // 별점 선택 이벤트
  setTimeout(() => {
    const starButtons = modalBackground.querySelectorAll('.rating-star');
    starButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        starButtons.forEach((btn, i) => {
          const starImg = btn.querySelector('img');
          if (starImg) {
            starImg.src =
              i <= index
                ? './images/star_filled.png'
                : './images/star_empty.png';
          }
        });

        // 여기에 별점 저장 로직 추가
      });
    });
  }, 0);

  return modalBackground;
};

export const openModal = (movie: MovieDetail): HTMLDivElement => {
  const modalElement = MovieModal(movie);
  document.body.appendChild(modalElement);
  return modalElement;
};
