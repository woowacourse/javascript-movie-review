import { starEmptyImage, starFilledImage } from '../../assets/images';
import type Movies from '../../domain/Movies';

const SCORE_MESSAGE = ['별점 매기기', '최악이에요', '별로에요', '보통이에요', '재미있어요', '명작이에요'];

const StarRate = {
  template() {
    return `
      <div id="movie-detail-score">
        <div>내 별점</div>
        <div id="star-rate-box">
          <img data-rate="1" src=${starEmptyImage} alt="별점" />
          <img data-rate="2" src=${starEmptyImage} alt="별점" />
          <img data-rate="3" src=${starEmptyImage} alt="별점" />
          <img data-rate="4" src=${starEmptyImage} alt="별점" />
          <img data-rate="5" src=${starEmptyImage} alt="별점" />
        </div>
        <div id="star-rate-message">별점을 매겨주세요.</div>
      </div>
    `;
  },
  paint(id: string) {
    const score = localStorage.getItem(id);
    const starRateBox = document.querySelector('#star-rate-box') as HTMLDivElement;
    starRateBox.dataset.id = id;
    const stars = document.querySelectorAll('#star-rate-box img') as NodeListOf<HTMLImageElement>;
    const starRateMessage = document.querySelector('#star-rate-message') as HTMLDivElement;
    if (score === null) {
      stars.forEach((star) => star.setAttribute('src', starEmptyImage));
      starRateMessage.innerText = SCORE_MESSAGE[0];
    } else {
      stars.forEach((star, index) => {
        const a = Number(star.dataset.rate);
        if (score) {
          if (Number(score) >= a) {
            star.setAttribute('src', starFilledImage);
          }
          if (Number(score) < a) {
            star.setAttribute('src', starEmptyImage);
          }
        }
        starRateMessage.innerText = String(Number(score) * 2) + ' ' + SCORE_MESSAGE[Number(score)];
      });
    }
  },
  setEvent(movies: Movies, target: HTMLElement) {
    const starRateBox = target.querySelector('#star-rate-box') as HTMLElement;
    const stars = document.querySelectorAll('#star-rate-box img') as NodeListOf<HTMLImageElement>;
    const starRateMessage = document.querySelector('#star-rate-message') as HTMLDivElement;
    starRateBox.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      const score = targetElement.dataset.rate as string;
      stars.forEach((star) => {
        const a = star.dataset.rate;
        if (a) {
          if (score >= a) {
            star.setAttribute('src', starFilledImage);
          }
          if (score < a) {
            star.setAttribute('src', starEmptyImage);
          }
        }
        starRateMessage.innerText = String(Number(score) * 2) + ' ' + SCORE_MESSAGE[Number(score)];
      });
      const id = starRateBox.dataset.id as string;
      localStorage.setItem(id, score);
    });
  },
};

export default StarRate;
