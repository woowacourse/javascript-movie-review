import createDOMElement from '../util/createDomElement';
import { RATING_COMMENTS } from '../constant';
import { currentRateType, MovieDetailType, RatingScore } from '../type';
import { changeStarState } from './events/handleChangeRateState';
import { createRateStars } from './RateStar';

function Modal(movieDetail: MovieDetailType, currentRate: currentRateType) {
  const genre = movieDetail.genres.map((genre) => genre.name).join(', ');
  const releaseYear = movieDetail.releaseDate.substring(0, 4);

  const { rate, status } = currentRate;
  const ratingComment = RATING_COMMENTS[rate as RatingScore];
  const ratingScore = `(${rate}/10)`;

  return createDOMElement({
    tag: 'dialog',
    className: 'modal',
    id: 'modal',
    children: [
      createDOMElement({
        tag: 'button',
        className: 'close-modal',
        id: 'closeModal',
        children: [
          createDOMElement({
            tag: 'img',
            attributes: {
              src: 'images/modal_button_close.png',
              alt: '모달 닫기 버튼'
            }
          })
        ]
      }),
      createDOMElement({
        tag: 'div',
        className: 'modal-container',
        children: [
          createDOMElement({
            tag: 'div',
            className: 'modal-image',
            children: [
              createDOMElement({
                tag: 'img',
                id: 'movieDetailPoster',
                attributes: {
                  src: `https://image.tmdb.org/t/p/original/${movieDetail.posterPath}`,
                  alt: `${movieDetail.title} 포스터 이미지`
                }
              })
            ]
          }),
          createDOMElement({
            tag: 'div',
            className: 'modal-description',
            children: [
              createDOMElement({
                tag: 'h2',
                id: 'movieDetailTitle',
                textContent: movieDetail.title
              }),
              createDOMElement({
                tag: 'p',
                className: 'category',
                id: 'movieDetailGenres',
                textContent: `${releaseYear} · ${genre}`
              }),
              createDOMElement({
                tag: 'p',
                className: 'rate',
                children: [
                  createDOMElement({
                    tag: 'span',
                    className: 'average-title',
                    textContent: '평균'
                  }),
                  createDOMElement({
                    tag: 'img',
                    className: 'star',
                    attributes: {
                      src: 'images/star_filled.png'
                    }
                  }),
                  createDOMElement({
                    tag: 'span',
                    className: 'average-score',
                    id: 'movieAverage',
                    textContent: movieDetail.voteAverage.toFixed(1).toString()
                  })
                ]
              }),
              createDOMElement({
                tag: 'div',
                className: 'my-rate-box',
                children: [
                  createDOMElement({
                    tag: 'b',
                    className: 'rate-title',
                    textContent: '내 별점'
                  }),
                  createDOMElement({
                    tag: 'form',
                    className: 'rate-form',
                    id: 'rateForm',
                    children: [
                      createDOMElement({
                        tag: 'input',
                        id: 'movieId',
                        attributes: {
                          type: 'hidden',
                          name: 'movieId',
                          value: movieDetail.id.toString()
                        }
                      }),
                      createRateStars(rate, status),
                      createDOMElement({
                        tag: 'div',
                        className: 'rate-score',
                        children: [
                          createDOMElement({
                            tag: 'b',
                            id: 'rateScoreText',
                            textContent: ratingComment
                          }),
                          createDOMElement({
                            tag: 'p',
                            id: 'rateScore',
                            textContent: ratingScore
                          })
                        ]
                      })
                    ],
                    event: { click: changeStarState }
                  })
                ]
              }),
              createDOMElement({
                tag: 'div',
                className: 'detail-box',
                children: [
                  createDOMElement({
                    tag: 'b',
                    className: 'plot-title',
                    textContent: '줄거리'
                  }),
                  createDOMElement({
                    tag: 'p',
                    className: 'detail',
                    id: 'plot',
                    textContent: movieDetail.overview ? movieDetail.overview : '줄거리가 없습니다.'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

export default Modal;
