import template from './index.html';
import { STRING, NUMBER } from '../utils/Constant';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fillStar = require('../assets/star_filled.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const emptyStar = require('../assets/star_empty.png');

export class ModalInformation extends HTMLElement {
  $modal: HTMLElement;
  constructor() {
    super();
    this.$modal = document.querySelector('.modal')!;
  }

  eventBind = () => {
    this.starEvent();
    document.querySelector('.modal-close')?.addEventListener('click', () => {
      const modal = document.querySelector('.modal');
      if (!(modal instanceof HTMLDialogElement)) throw new Error(STRING.NOT_FIND_ELEMENT);
      modal.close();
    });
  };

  private starEvent() {
    const score = ['2', '4', '6', '8', '10'];
    const comment = ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'];
    for (let starEvent = 1; starEvent <= 5; starEvent++) {
      document.querySelector(`#stars-${starEvent}`)?.addEventListener('click', () => {
        for (let star = 1; star <= 5; star++) {
          if (starEvent >= star)
            document.querySelector(`#stars-${star}`)?.setAttribute('src', fillStar);
          else document.querySelector(`#stars-${star}`)?.setAttribute('src', emptyStar);
        }
        document.querySelector('.modal-right-score')!.textContent = score[starEvent - 1];
        document.querySelector('.modal-right-comment')!.textContent = comment[starEvent - 1];
        const id = document.querySelector('.modal-information')!.id;
        localStorage.setItem(id, score[starEvent - 1]);
      });
    }
  }

  setInformationToModal = (target: HTMLTextAreaElement) => {
    this.removeModalInformation();
    this.innerHTML = template;
    const information = target.closest('movie-item') as HTMLElement;
    const informationArray = this.makeInformationArray(information);
    this.render(informationArray);
    this.attachModalInformation();
  };

  makeInformationArray(information: HTMLElement): Array<string | null> {
    return [
      information?.id,
      information?.getAttribute('title'),
      information?.getAttribute('poster'),
      information?.getAttribute('vote'),
      information?.getAttribute('genre'),
      information?.getAttribute('overview'),
    ];
  }

  render(informationArray: Array<string | null>) {
    const score = localStorage.getItem(informationArray[0] ?? '') ?? '0';
    this.innerHTML = template
      .replace('{id}', informationArray[0] ?? STRING.UNKNOWN)
      .replace('{title}', informationArray[1] ?? STRING.UNKNOWN)
      .replace('{poster_path}', informationArray[2] ?? STRING.UNKNOWN)
      .replace('{vote_average}', informationArray[3] ?? STRING.UNKNOWN)
      .replace('{genre}', informationArray[4] ?? STRING.UNKNOWN)
      .replace('{overview}', informationArray[5] ?? STRING.UNKNOWN)
      .replace('{star1}', Number(score) >= 2 ? fillStar : emptyStar)
      .replace('{star2}', Number(score) >= 4 ? fillStar : emptyStar)
      .replace('{star3}', Number(score) >= 6 ? fillStar : emptyStar)
      .replace('{star4}', Number(score) >= 8 ? fillStar : emptyStar)
      .replace('{star5}', Number(score) >= 10 ? fillStar : emptyStar)
      .replace('{score}', this.getScore(Number(score)))
      .replace('{comment}', this.getComment(Number(score)));
  }

  private getScore(number: number) {
    if (number === 2) return NUMBER.FIRST_STAR;
    if (number === 4) return NUMBER.SECOND_STAR;
    if (number === 6) return NUMBER.THIRD_STAR;
    if (number === 8) return NUMBER.FOURTH_STAR;
    if (number === 10) return NUMBER.FIFTH_STAR;
    return '';
  }

  private getComment(number: number) {
    if (number === 2) return STRING.BAD;
    if (number === 4) return STRING.NOT_GOOD;
    if (number === 6) return STRING.NORMAL;
    if (number === 8) return STRING.GOOD;
    if (number === 10) return STRING.EXCELLENT;
    return '';
  }

  attachModalInformation() {
    this.$modal.insertAdjacentHTML('beforeend', this.innerHTML);
  }

  removeModalInformation() {
    this.$modal.replaceChildren();
  }
}
