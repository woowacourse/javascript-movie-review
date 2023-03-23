import template from './index.html';

export class ModalInformation extends HTMLElement {
  $modal: HTMLElement;
  constructor() {
    super();
    this.$modal = document.querySelector('.modal')!;
  }

  setInformationToModal = (target: HTMLTextAreaElement) => {
    this.removeModalInformation();
    this.innerHTML = template;
    const information = target.closest('movie-item') as HTMLElement;
    console.log(information);
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
    this.innerHTML = template
      .replace('{id}', informationArray[0] ?? '알 수 없음')
      .replace('{title}', informationArray[1] ?? '알 수 없음')
      .replace('{poster_path}', informationArray[2] ?? '알 수 없음')
      .replace('{vote_average}', informationArray[3] ?? '알 수 없음')
      .replace('{genre}', informationArray[4] ?? '알 수 없음')
      .replace('{overview}', informationArray[5] ?? '알 수 없음');
  }

  attachModalInformation() {
    this.$modal.insertAdjacentHTML('beforeend', this.innerHTML);
  }

  removeModalInformation() {
    this.$modal.replaceChildren();
  }
}
