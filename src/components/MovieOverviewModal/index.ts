import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';

export interface MovieOverviewModalProps {}

const MovieOverviewModal = assemble((props: MovieOverviewModalProps) => {
  const $events: Event[] = [];

  const $template = getElement(
    ` 
    <div class='movie-overview-modal-container'>
      <div class='modal-backdrop'></div>
      <div class='movie-overview-modal'>
        <section class='movie-overview-modal__header'>
          <h1 class='movie-overview-modal__title'>해리 포터 20주년: 리턴 투 호그와트</h1>
          <button class='movie-overview-modal__close-btn'>X</button>
        </section>
        <section class='movie-overview-modal__body'>
          <aside class='movie-overview-modal__left-aside'>
            <img class='movie-overview-modal__poster' alt="해리 포터 20주년: 리턴 투 호그와트<"/>
          </aside>
          <aside class='movie-overview-modal__right-aside'>
            <div class='movie-overview-modal__subInfo'>
              <span class='movie-overview__genres'>범죄 액션물</span>
              <div>
                <img class='movie-overview-modal__star-img' alt="별점"/>
                <span class='movie-overview-modal__vote-average'>8.1</span>
              </div>
            </div>
            <p class='movie-overview-modal__overview'>
              해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.
            </p>
            <div class='movie-overview-modal__my-vote-container'>
              <span>내 별점</span>
              <div><img alt="별점"/><img alt="별점"/><img alt="별점"/><img alt="별점"/><img alt="별점"/></div>
              <span>6 보통이예요</span>
            </div>
          </aside>
        </section>
      </div>
    </div>
      
    `
  );

  return [$template, $events];
});

export { MovieOverviewModal };
