import { RATING_COMMENTS } from '../constant';
import { localStorageRate, renderRate } from '../domain/localStorageRate';
import { MoveDetailType, RatingScore } from '../type';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

function Modal(movieDetail: MoveDetailType) {
  const genre = movieDetail.genres.map((genre) => genre.name).join(', ');
  const releaseYear = movieDetail.releaseDate.substring(0, 4);

  const { rate, status } = renderRate(movieDetail.id);
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

const createRateStars = (rate: number, status: boolean) => {
  const starsBox = document.createElement('div');
  starsBox.classList.add('rate-box');

  Array.from({ length: 5 }, (_, i) => {
    const starRate = (i + 1) * 2;
    const fill = status && starRate <= rate ? 'fill-star' : '';
    const label = document.createElement('label');
    label.innerHTML = `<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg" class="${fill}">
<path d="M16.5514 24.0789L22.8558 28.0731C23.6617 28.5837 24.6622 27.8243 24.4231 26.8836L22.6016 19.7183C22.5503 19.5188 22.5564 19.3088 22.6191 19.1125C22.6819 18.9162 22.7987 18.7417 22.9563 18.6089L28.6097 13.9034C29.3525 13.2851 28.9691 12.0523 28.0147 11.9904L20.6318 11.5112C20.4329 11.497 20.2422 11.4266 20.0818 11.3082C19.9214 11.1898 19.7979 11.0283 19.7258 10.8424L16.9722 3.90828C16.8974 3.71101 16.7643 3.54117 16.5906 3.42133C16.417 3.30149 16.211 3.2373 16 3.2373C15.789 3.2373 15.583 3.30149 15.4094 3.42133C15.2357 3.54117 15.1026 3.71101 15.0278 3.90828L12.2742 10.8424C12.2021 11.0283 12.0786 11.1898 11.9182 11.3082C11.7578 11.4266 11.5671 11.497 11.3682 11.5112L3.98525 11.9904C3.03087 12.0523 2.64746 13.2851 3.3903 13.9034L9.04371 18.6089C9.20126 18.7417 9.31813 18.9162 9.38088 19.1125C9.44362 19.3088 9.4497 19.5188 9.39841 19.7183L7.70918 26.3634C7.42222 27.4922 8.62287 28.4034 9.58991 27.7907L15.4486 24.0789C15.6134 23.974 15.8047 23.9183 16 23.9183C16.1953 23.9183 16.3866 23.974 16.5514 24.0789V24.0789Z" stroke="#FFC700" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'rateInput';
    radioInput.value = `${starRate}`;
    label.appendChild(radioInput);
    starsBox.appendChild(label);
  });

  return starsBox;
};

const changeStarState = (e: Event) => {
  const target = e.target;
  if (target instanceof HTMLInputElement) {
    const currentRate = Number(target.value) || 0;
    const rateStars = (e.currentTarget as HTMLFormElement)?.querySelectorAll<HTMLInputElement>(
      'input[name="rateInput"]'
    );

    localStorageRate(currentRate);

    rateStars?.forEach((star) => {
      if (parseInt(star.value, 10) <= currentRate) {
        star.previousElementSibling?.classList.add('fill-star');
      } else {
        star.previousElementSibling?.classList.remove('fill-star');
      }
    });

    const rateScoreTextElement = $('#rateScoreText');
    if (rateScoreTextElement) {
      rateScoreTextElement.textContent = RATING_COMMENTS[currentRate as RatingScore];
    }

    const rateScoreElement = $('#rateScore');
    if (rateScoreElement) {
      rateScoreElement.textContent = `(${currentRate}/10)`;
    }
  }
};

export default Modal;
