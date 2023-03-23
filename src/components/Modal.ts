import './Modal.css';
import STAR_FILLED from '../image/star-filled.png';
import { $ } from '../utils/common';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setModalCloseEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
        <dialog id="modal" class="modal-wrapper" open>
            <div id="modal-background" class="modal-background"></div> 
            <div class="modal">
                <header class="modal-header">
                    <div></div>
                    <div class="modal-header-title">해리 포터 20주년: 리턴 투 호그와트</div>
                    <div id="modal-close-button" class="mocal-cancle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="modal-cancle-content">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </header>
                <main class="modal-main">
                    <div class="modal-main-image-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Clifton_Down_darkness.jpg">
                    </div>
                    <div class="modal-main-content">
                        <div>
                            <div class="modal-main-category-score">
                                <div>액션, 코미디, 범죄</div>
                                <div class="modal-score">
                                    <img src="${STAR_FILLED}">
                                    <span>8.1<span>
                                </div>
                            </div>
                            <p class="modal-description">
                            해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.
                            </p>
                        </div>
                        <div class="modal-my-score-wrapper">
                            <span class="modal-my-score">내 별점</span>
                            <div class="modal-star-score">
                                <img src="${STAR_FILLED}">
                                <img src="${STAR_FILLED}">
                                <img src="${STAR_FILLED}">
                                <img src="${STAR_FILLED}">
                                <img src="${STAR_FILLED}">
                            </div>
                            <span class="modal-number-score">6</span>
                            <span class="modal-comment">보통이에요</span>
                        </div>
                    </div>
                </main>
            </div>
        </dialog> 
     `;
  }

  setModalCloseEvent() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });

    $('#modal-background')?.addEventListener('click', () => this.closeModal());

    $('#modal-close-button')?.addEventListener('click', () => this.closeModal());
  }

  closeModal() {
    const modal = $('#modal') as HTMLDialogElement;
    $('body')?.classList.remove('overflow-hidden');
    modal.close();
  }
}

export default Modal;
