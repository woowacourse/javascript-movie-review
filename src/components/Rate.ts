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
      JSON.stringify((<HTMLInputElement>document.querySelector('.star input')).value),
    );
  },

  listener(id: number) {
    const starInput = <HTMLInputElement>document.querySelector('.star input');
    const starSpan = <HTMLImageElement>document.querySelector('.star span');
    const ratingText = <HTMLParagraphElement>document.querySelector('.rating-text');
    starInput?.addEventListener('input', () => {
      starSpan.style.width = `${Number(starInput.value) * 10}%`;
      Rate.saveRate(id);
      ratingText.textContent = this.ratingText(starInput.value);
    });
  },

  renderStar(rate: string) {
    (<HTMLImageElement>document.querySelector('.star span')).style.width = `${Number(rate) * 10}%`;
    (<HTMLParagraphElement>document.querySelector('.rating-text')).textContent =
      this.ratingText(rate);
  },

  ratingText(rate: string) {
    return window.innerWidth > 480 ? rate + ' ' + ratingComment[Number(rate)] : rate;
  },
};

export default Rate;
