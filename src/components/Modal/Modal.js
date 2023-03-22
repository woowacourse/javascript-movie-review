import './Modal.css';
import StarFilled from '../../image/star_filled.png';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h2>해리 포터 20주년: 리턴 투 호그와트</h2>
            <button class="modal-button">X</button>
          </div>
          <div class="modal-contents">
            <img class="contents-image" src="https://image.tmdb.org/t/p/w300/rKgvctIuPXyuqOzCQ16VGdnHxKx.jpg">
            <div class="contents-info">
              <div class="contents-info-top">
                <div class="info-header">
                  <p>액션, 코미디, 범죄</p>
                  <img src="${StarFilled}" alt="별점" />
                  <p>8.1</p>
                </div>  
                <p>해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.</p>
              </div>
              <div class="contents-info-bottom">
                <div class="my-favorite-score-box">
                  <p class="my-score-text">내 별점</p>
                  <div>
                    <img src="${StarFilled}" alt="별점" />
                    <img src="${StarFilled}" alt="별점" />
                    <img src="${StarFilled}" alt="별점" />
                    <img src="${StarFilled}" alt="별점" />
                    <img src="${StarFilled}" alt="별점" />
                  </div>
                  <p>10</p>
                  <p class="score-feeling-text">명작이에요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('info-modal', Modal);

export default Modal;
