const MovieDetailModal = () => {
  const create = () => {
    return `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <section class="modal-header">
            <div class="modal-title">${1}</div>
            <button class="modal-close">X</button>
          </section>
          <section class="modal-info-container">
            <div class="modal-poster">
              <img
                src="https://image.tmdb.org/t/p/w220_and_h330_face/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg"
              />
            </div>
            <div class="modal-info">
              <div class="modal-genre-rating-container">
                <span class="modal-genre">액션,코미디,범죄</span>
                <span class="modal-rating">
                  <img src="./star_filled.png" />
                  6.0
                </span>
              </div>
              <p class="modal-description">
                해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며,
                배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이
                이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에
                참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의
                커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난
                배우들에 대한 기억들을 회상하는 시간도 가졌다.
              </p>
            </div>
          </section>
        </div>
    `;
  };

  const render = () => {
    const movieDetailModal = document.createElement("dialog");
    movieDetailModal.innerHTML = create();

    document.querySelector("main")?.appendChild(movieDetailModal);
    movieDetailModal.showModal();
  };

  render();
}

export default MovieDetailModal;
