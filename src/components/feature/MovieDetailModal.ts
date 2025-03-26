import MovieRating from '../../domain/MovieRating';
import { MovieDetailResponse } from '../../types/MovieDetail.types';
import { Box } from '../common/Box';
import { Horizon } from '../common/Horizon';
import { IconButton } from '../common/IconButton';
import { Img } from '../common/Img';
import { Text } from '../common/Text';
import { DEFAULT_IMAGE_URL, IMAGE_BASE_URL } from './MovieItem';

const SCORE_TEXT: Record<number, string> = {
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

const handleCloseBtnClick = () => {
  const modalBackground = document.querySelector('.modal-background');
  modalBackground?.classList.remove('active');
  modalBackground?.addEventListener('transitionend', () => {
    modalBackground?.remove();
  });
};

const scoreTextElement = Text({
  classList: ['text-xl', 'font-semibold', 'text-white'],
  props: {
    textContent: '0점',
  },
});

const scoreElement = Text({
  classList: ['text-lg', 'font-semibold', 'text-opacity-blue'],
  props: {
    textContent: '(0/10)',
  },
});

const movieInfo = (
  title: string,
  formattedReleaseDate: number,
  genreNames: string,
  vote_average: number,
) => {
  return Box({
    classList: ['modal-info'],
    props: {
      children: [
        Text({
          classList: ['text-xl', 'font-bold'],
          props: {
            textContent: title,
          },
        }),

        Text({
          classList: ['text-lg', 'font-semibold', 'text-white'],
          props: {
            textContent: `${formattedReleaseDate} | ${genreNames}`,
          },
        }),
        Box({
          classList: ['movie-rate'],
          props: {
            children: [
              Text({
                classList: ['text-lg', 'font-semibold', 'text-white'],
                props: {
                  textContent: '평점',
                },
              }),
              Box({
                classList: ['flex-row'],
                props: {
                  children: [
                    Img({
                      width: '20',
                      height: '20',
                      src: './images/star_filled.png',
                    }),
                    Text({
                      classList: ['text-lg', 'font-semibold', 'text-yellow'],
                      props: {
                        textContent: ` ${vote_average}`,
                      },
                    }),
                  ],
                },
              }),
            ],
          },
        }),
      ],
    },
  });
};

const myRatingSection = (movieId: number, title: string) => {
  const movieRate = new MovieRating(movieId, title);

  const updateStars = (score: number) => {
    movieRate.setRating(score);

    starElements.forEach((star, index) => {
      const starScore = (index + 1) * 2;
      const starImg = star.querySelector('img');

      if (starImg) {
        starImg.src =
          starScore <= score
            ? './images/star_filled.png'
            : './images/star_empty.png';
      }
    });

    scoreTextElement.textContent = SCORE_TEXT[score] || '0점';
    scoreElement.textContent = `(${score}/10)`;
  };

  const starElements = Array.from({ length: 5 }, (_, index) => {
    const starScore = (index + 1) * 2;

    return IconButton({
      width: '25',
      height: '25',
      src: './images/star_empty.png',
      onClick: () => updateStars(starScore),
      props: {
        alt: `Star ${index + 1}`,
      },
    });
  });

  const storedRating = movieRate.getRating();
  updateStars(storedRating || 0);

  return Box({
    classList: ['modal-my-rate'],
    props: {
      children: [
        Text({
          classList: ['text-xl', 'font-semibold'],
          props: {
            textContent: '내 별점',
          },
        }),
        Box({
          classList: ['modal-rate'],
          props: {
            children: [
              Box({
                classList: ['flex-row'],
                props: {
                  children: starElements,
                },
              }),
              Box({
                classList: ['flex-row'],
                props: {
                  children: [scoreTextElement, scoreElement],
                },
              }),
            ],
          },
        }),
      ],
    },
  });
};

const overView = (overview: string) => {
  return Box({
    props: {
      children: [
        Text({
          classList: ['text-xl', 'font-semibold'],
          props: {
            textContent: '줄거리',
          },
        }),
        Box({
          classList: ['detail'],
          props: {
            children: [
              Text({
                props: {
                  textContent: overview ? overview : '줄거리 정보가 없습니다.',
                },
              }),
            ],
          },
        }),
      ],
    },
  });
};

export const MovieDetailModal = (movieDetailData: MovieDetailResponse) => {
  const {
    id,
    title,
    release_date,
    genres,
    overview,
    vote_average,
    poster_path,
  } = movieDetailData;

  const formattedReleaseDate = new Date(release_date).getFullYear();
  const genreNames = genres.map((genre) => genre.name).join(', ');

  return Box({
    classList: ['modal-col'],
    props: {
      children: [
        IconButton({
          width: '15',
          height: '15',
          src: './images/modal_button_close.png',
          classList: ['modal-close-btn'],
          onClick: () => handleCloseBtnClick(),
        }),
        Box({
          classList: ['modal-container'],
          props: {
            children: [
              Img({
                src: poster_path
                  ? `${IMAGE_BASE_URL}${poster_path}`
                  : DEFAULT_IMAGE_URL,
                classList: ['modal-image'],
                props: {
                  alt: title,
                },
              }),

              Box({
                classList: ['modal-description'],
                props: {
                  children: [
                    movieInfo(
                      title,
                      formattedReleaseDate,
                      genreNames,
                      vote_average,
                    ),
                    Horizon({ classList: ['custom-hr'] }),
                    myRatingSection(id, title),
                    Horizon({ classList: ['custom-hr'] }),
                    overView(overview),
                  ],
                },
              }),
            ],
          },
        }),
      ],
    },
  });
};
