export default class MovieDetailModal extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <dialog id="movie-detail">
      <div class="modal-backdrop"></div>
      <div class="modal">
        <h2>해리 포터 20주년: 리턴 투 호그와트</h2>
        <button class="modal-close-button"><i class="bi bi-x-lg"></i></button>
        <div id="detail-wrap">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/w500//gOnmaxHo0412UVr1QM5Nekv1xPi.jpg" 
            onerror="
              this.style.border='1px solid #e2e2e2';
              this.style.background='var(--background-color)';
              this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
            loading="lazy" alt="코카인 베어">
          <article id="detail">
            <div id="genre-and-score">
              <h3 class="item-genres">액션, 범죄</h3>
              <p class="item-score">
                <img src="./assets/star_filled.png" alt="별점" />
                <span>8.1</span>
              </p>
            </div>
            <p>overview</p>
            <section id="user-ratings">
              <h3>내 별점</h3>
              <div class="ratings">
                <div class="stars">
                  ${'<img src="./assets/star_empty.png" alt="별점" />'.repeat(
                    5
                  )}
                </div>
                <div id="filled-stars" class="stars">
                  ${'<img src="./assets/star_filled.png" alt="별점" />'.repeat(
                    5
                  )}
                </div>
                <input
                  type="range"
                  value="1"
                  step="1"
                  min="0"
                  max="5"
                />
              </div>
            </section>
          </article>
        </div>
      </div>
    </dialog>
    `;
  }
}
