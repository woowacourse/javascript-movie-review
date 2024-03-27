import IMAGES from "../images";
import { $ } from "../utils/dom";
import { HTMLTemplate } from "./abstract/BaseComponent";
import EventComponent from "./abstract/EventComponent";

export default class MovieDetail extends EventComponent {
  protected getTemplate(): HTMLTemplate {
    return `
    <div class="movie-detail-container">
    <h1 class="movie-detail-title">
      해리 포터 20주년: 리턴 투 호그와트
    </h1>
    <img class="modal-close-button" src="${IMAGES.modalCloseButton}" />
    <hr class="movie-detail-hr" />
    <div class="movie-detail-inner-wrapper">
      <img class="movie-detail-poster" src="https://image.tmdb.org/t/p/w220_and_h330_face/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg" />
      <div class="movie-detail-info">
        <div>
          <div class="flex-box">
            <p class="movie-detail-genre">액션, 코미디, 범죄</p>
            <p class="movie-detail-vote"><img class="movie-detail-star-icon" src="${IMAGES.starFilled}" /> 8.1</p>
          </div>
          <p class="movie-detail-overview">
            해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며,
            배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다.
            DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가
            끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다.
            또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다. 
          </p>
        </div>
        <div class="my-vote-container">
          <p class="my-vote-label">내 별점</p>
          <div class="my-vote-star-container">
            <img class="my-vote-star" src="${IMAGES.starFilled}" />
            <img class="my-vote-star" src="${IMAGES.starFilled}" />
            <img class="my-vote-star" src="${IMAGES.starFilled}" />
            <img class="my-vote-star" src="${IMAGES.starFilled}" />
            <img class="my-vote-star" src="${IMAGES.starFilled}" />
          </div>
          <p class="my-vote-text">6 보통이에요</p>
        </div>
      </div>
    </div>

    </div>
    `;
  }

  protected onInitialized(): void {
    $<HTMLDialogElement>(this.targetId)?.showModal();
  }

  protected setEvent(): void {}
}
