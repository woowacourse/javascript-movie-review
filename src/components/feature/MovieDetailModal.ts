import { MovieDetailResponse } from '../../types/MovieDetail.types';
import { Box } from '../common/Box';
import { Horizon } from '../common/Horizon';
import { IconButton } from '../common/IconButton';
import { Img } from '../common/Img';
import { Text } from '../common/Text';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const DEFAULT_IMAGE_URL = './images/no_image.png';

const scoreTexts: Record<number, string> = {
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
  classList: ['text-xl', 'font-semibold', 'text-yellow'],
  props: {
    textContent: '0점',
  },
});

const scoreElement = Text({
  classList: ['text-lg', 'font-semibold', 'text-white'],
  props: {
    textContent: '(0/10)',
  },
});

export const MovieDetailModal = (movieDetailData: MovieDetailResponse) => {
  const { title, release_date, genres, overview, vote_average, poster_path } =
    movieDetailData;

  let selectedScore = 0;

  const formattedReleaseDate = new Date(release_date).getFullYear();
  const genreNames = genres.map((genre) => genre.name).join(', ');

  const updateStars = (score: number) => {
    selectedScore = score;

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

    scoreTextElement.textContent = scoreTexts[score] || '0점';
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

  return Box({
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
              Box({
                classList: ['modal-between'],
                props: {
                  children: [
                    Text({
                      classList: ['text-xl', 'font-bold'],
                      props: {
                        textContent: title,
                      },
                    }),
                    IconButton({
                      width: '15',
                      height: '15',
                      src: './images/modal_button_close.png',
                      onClick: () => {
                        handleCloseBtnClick();
                      },
                    }),
                  ],
                },
              }),

              Text({
                classList: ['text-lg', 'font-semibold', 'text-yellow'],
                props: {
                  textContent: `${formattedReleaseDate} | ${genreNames}`,
                },
              }),
              Box({
                classList: ['rate'],
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
                            width: '16',
                            height: '16',
                            src: './images/star_filled.png',
                          }),
                          Text({
                            classList: [
                              'text-lg',
                              'font-semibold',
                              'text-yellow',
                            ],
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
              Horizon({ classList: ['custom-hr'] }),
              Text({
                classList: ['text-lg', 'font-semibold'],
                props: {
                  textContent: '내 별점',
                },
              }),
              Box({
                classList: ['rate'],
                props: {
                  children: [
                    Box({
                      classList: ['flex-row'],
                      props: {
                        children: starElements,
                      },
                    }),
                    scoreTextElement,
                    scoreElement,
                  ],
                },
              }),
              Horizon({ classList: ['custom-hr'] }),
              Text({
                classList: ['text-lg', 'font-semibold'],
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
                        textContent: overview,
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
