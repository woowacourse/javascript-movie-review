import template from './index.html';
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

  eventBind() {
    document.querySelector('#stars-1')?.addEventListener('click', () => {
      document.querySelector('#stars-1')?.setAttribute('src', fillStar);
      document.querySelector('#stars-2')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-3')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-4')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-5')?.setAttribute('src', emptyStar);
      document.querySelector('.modal-right-score')!.textContent = '2';
      document.querySelector('.modal-right-comment')!.textContent = '최악이예요';
      const id = document.querySelector('.modal-information')!.id;
      localStorage.setItem(id, '2');
    });

    document.querySelector('#stars-2')?.addEventListener('click', () => {
      document.querySelector('#stars-1')?.setAttribute('src', fillStar);
      document.querySelector('#stars-2')?.setAttribute('src', fillStar);
      document.querySelector('#stars-3')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-4')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-5')?.setAttribute('src', emptyStar);
      document.querySelector('.modal-right-score')!.textContent = '4';
      document.querySelector('.modal-right-comment')!.textContent = '별로예요';
      const id = document.querySelector('.modal-information')!.id;
      localStorage.setItem(id, '4');
    });

    document.querySelector('#stars-3')?.addEventListener('click', () => {
      document.querySelector('#stars-1')?.setAttribute('src', fillStar);
      document.querySelector('#stars-2')?.setAttribute('src', fillStar);
      document.querySelector('#stars-3')?.setAttribute('src', fillStar);
      document.querySelector('#stars-4')?.setAttribute('src', emptyStar);
      document.querySelector('#stars-5')?.setAttribute('src', emptyStar);
      document.querySelector('.modal-right-score')!.textContent = '6';
      document.querySelector('.modal-right-comment')!.textContent = '보통이에요';
      const id = document.querySelector('.modal-information')!.id;
      localStorage.setItem(id, '6');
    });

    document.querySelector('#stars-4')?.addEventListener('click', () => {
      document.querySelector('#stars-1')?.setAttribute('src', fillStar);
      document.querySelector('#stars-2')?.setAttribute('src', fillStar);
      document.querySelector('#stars-3')?.setAttribute('src', fillStar);
      document.querySelector('#stars-4')?.setAttribute('src', fillStar);
      document.querySelector('#stars-5')?.setAttribute('src', emptyStar);
      document.querySelector('.modal-right-score')!.textContent = '8';
      document.querySelector('.modal-right-comment')!.textContent = '재미있어요';
      const id = document.querySelector('.modal-information')!.id;
      localStorage.setItem(id, '8');
    });

    document.querySelector('#stars-5')?.addEventListener('click', () => {
      document.querySelector('#stars-1')?.setAttribute('src', fillStar);
      document.querySelector('#stars-2')?.setAttribute('src', fillStar);
      document.querySelector('#stars-3')?.setAttribute('src', fillStar);
      document.querySelector('#stars-4')?.setAttribute('src', fillStar);
      document.querySelector('#stars-5')?.setAttribute('src', fillStar);
      document.querySelector('.modal-right-score')!.textContent = '10';
      document.querySelector('.modal-right-comment')!.textContent = '명작이에요';
      const id = document.querySelector('.modal-information')!.id;
      localStorage.setItem(id, '10');
    });

    document
      .querySelector('.modal-close')
      ?.addEventListener('click', () =>
        (document.querySelector('.modal') as HTMLDialogElement).close(),
      );
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
      .replace('{id}', informationArray[0] ?? '알 수 없음')
      .replace('{title}', informationArray[1] ?? '알 수 없음')
      .replace('{poster_path}', informationArray[2] ?? '알 수 없음')
      .replace('{vote_average}', informationArray[3] ?? '알 수 없음')
      .replace('{genre}', informationArray[4] ?? '알 수 없음')
      .replace('{overview}', informationArray[5] ?? '알 수 없음')
      .replace('{star1}', Number(score) >= 2 ? fillStar : emptyStar)
      .replace('{star2}', Number(score) >= 4 ? fillStar : emptyStar)
      .replace('{star3}', Number(score) >= 6 ? fillStar : emptyStar)
      .replace('{star4}', Number(score) >= 8 ? fillStar : emptyStar)
      .replace('{star5}', Number(score) >= 10 ? fillStar : emptyStar)
      .replace('{score}', this.getScore(Number(score)))
      .replace('{comment}', this.getComment(Number(score)));
  }

  getScore(number: number) {
    if (number === 2) return '2';
    if (number === 4) return '4';
    if (number === 6) return '6';
    if (number === 8) return '8';
    if (number === 10) return '10';
    return '';
  }

  getComment(number: number) {
    if (number === 2) return '최악이예요';
    if (number === 4) return '별로예요';
    if (number === 6) return '보통이에요';
    if (number === 8) return '재미있어요';
    if (number === 10) return '명작이에요';
    return '';
  }

  attachModalInformation() {
    this.$modal.insertAdjacentHTML('beforeend', this.innerHTML);
  }

  removeModalInformation() {
    this.$modal.replaceChildren();
  }
}
