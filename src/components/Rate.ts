import { ratingComment } from '../constants';
import { setLocalStorage } from '../util/LocalStorage';

const Rate = {
  template: `
    <div class="star-wrapper">
    <p>내 별점</p> 
        <span class="star">
            <img src="assets/star_empty.png" alt="별점" />
            <img src="assets/star_empty.png" alt="별점" />
            <img src="assets/star_empty.png" alt="별점" />
            <img src="assets/star_empty.png" alt="별점" />
            <img src="assets/star_empty.png" alt="별점" />
            <span>
                <img src="assets/star_filled.png" alt="별점" />
                <img src="assets/star_filled.png" alt="별점" />
                <img src="assets/star_filled.png" alt="별점" />
                <img src="assets/star_filled.png" alt="별점" />
                <img src="assets/star_filled.png" alt="별점" />
            </span>
            <input type="range" value="2" step="2" min="2" max="10">
        </span>
    </div>
    <p class="rating-text"></p>`,
  saveRate(id: number) {
    setLocalStorage(
      String(id),
      JSON.stringify((document.querySelector('.star input') as HTMLInputElement)?.value),
    );
  },
  listener(id: number) {
    const starInput = document.querySelector('.star input');
    const starSpan = document.querySelector('.star span');
    starInput?.addEventListener('input', () => {
      (starSpan as HTMLImageElement).style.width = `${
        Number((starInput as HTMLInputElement).value) * 10
      }%`;
      Rate.saveRate(id);
      (document.querySelector('.rating-text') as HTMLParagraphElement).textContent =
        this.ratingText((document.querySelector('.star input') as HTMLInputElement)?.value);
    });
  },
  renderStar(rate: string) {
    if (rate) {
      (document.querySelector('.star span') as HTMLImageElement).style.width = `${
        Number(rate) * 10
      }%`;

      (document.querySelector('.rating-text') as HTMLParagraphElement).textContent =
        this.ratingText(rate);
    }
  },
  ratingText(rate: string) {
    return window.outerWidth > 480 ? rate + ' ' + ratingComment[Number(rate)] : rate;
  },
};

export default Rate;
