import { starEmptyImage, starFilledImage } from '../../assets/images';
import { SCORE_MESSAGE } from '../../constants';

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
    const starRateBox = document.querySelector('#star-rate-box') as HTMLDivElement;
    const starRateMessage = document.querySelector('#star-rate-message') as HTMLDivElement;

    const score = Number(localStorage.getItem(id));
    starRateBox.dataset.id = id;

    StarRate.fillStar(score);

    starRateMessage.innerText = `${score * 2} ${SCORE_MESSAGE[score]}`;
  },
  setEvent(target: HTMLElement) {
    const starRateBox = target.querySelector('#star-rate-box') as HTMLDivElement;
    const starRateMessage = target.querySelector('#star-rate-message') as HTMLDivElement;

    starRateBox.addEventListener('click', (event) => {
      const targetElement = event.target;

      if (targetElement instanceof HTMLImageElement) {
        const score = Number(targetElement.dataset.rate);
        const id = starRateBox.dataset.id as string;
        StarRate.fillStar(score);
        localStorage.setItem(id, String(score));
        starRateMessage.innerText = `${score * 2} ${SCORE_MESSAGE[score]}`;
      }
    });
  },
  fillStar(score: number) {
    const stars = document.querySelectorAll('#star-rate-box img') as NodeListOf<HTMLImageElement>;
    stars.forEach((star) => {
      const clickedScore = Number(star.dataset.rate);
      if (score >= clickedScore) {
        star.setAttribute('src', starFilledImage);
      }
      if (score < clickedScore) {
        star.setAttribute('src', starEmptyImage);
      }
    });
  },
};

export default StarRate;
