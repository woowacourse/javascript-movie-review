export default class DetailModal extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <dialog class="movie-modal">
      <div>
        <div>
          <h2>해리 포터 20주년</h2>
          <img src="" alt="닫기" />
        </div>
        <div>
          <img src="" alt="포스터" />
          <div>
            <span>액션</span>
            <img src="" alt="별점" />
            <span>8.1</span>
            <p>해리 포터 영화 시리즈가 ...</p>
            <div>
              <span>내 별점</span>
              <img src="" alt="나의 별점" />
              <span>6</span>
              <span>보통이에요</span>
            </div>
          </div>
        </div>
      </div>
    </dialog>`;
  }
}
