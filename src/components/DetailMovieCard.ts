import Component from '../type/Component';

export default class DetailMovieCard implements Component {
  private $element;

  constructor($parent: Element) {
    this.$element = document.createElement('section');
    this.$element.className = 'movie-detail-view';

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
  }

  template() {
    return /* html */ `
    <div class="movie-title-wrap">
      <h1 class="movie-title">해리 포터 20주년: 리턴 투 호그와트</h1>
      <button class="modal-close-button">✖</button>
    </div>
    <div class="movie-content-container">
      <div class="movie-img-wrap">
        <img class="movie-img" src="./" alt="대체" />
      </div>
      <div class="movie-info-container">
        <div class="movie-info-text-container">
          <div>
            <span class="movie-info-genre">액션, 코미디, 범죄 </span>
            <span class="movie-info-score">🍕8.1</span>
          </div>
          <div class="movie-info-description">
            해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의
            에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의
            오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난
            배우들에 대한 기억들을 회상하는 시간도 가졌다.
          </div>
        </div>
        <div class="movie-vote-container">
          <span class="movie-vote-title">내 별점</span>
          <div class="movie-vote-button-container">
            <button type="button" data-vote-value="2" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="4" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="6" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="8" class="movie-vote-button">🍕</button>
            <button type="button" data-vote-value="10" class="movie-vote-button">🍕</button>
          </div>
          <span class="movie-vote-score">10 최고에요</span>
        </div>
      </div>
    </div>`;
  }

  setEvent() {}
}
