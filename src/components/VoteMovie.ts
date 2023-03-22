import starEmpty from '../asset/star_empty.png';

class VoteMovie {
  private _node!: HTMLElement;

  constructor() {
    this.createTemplate();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('div');
    this._node.classList.add('movie-detail-voteContainer');

    this._node.insertAdjacentHTML(
      'afterbegin',
      ` <div>내 별점</div>
        <div>
        <img src="${starEmpty}" alt="별점" />
        <img src="${starEmpty}" alt="별점" />
        <img src="${starEmpty}" alt="별점" />
        <img src="${starEmpty}" alt="별점" />
        <img src="${starEmpty}" alt="별점" />
        </div>
        <div>이 영화 어떠나요?</div>`
    );
  }
}

export default VoteMovie;
