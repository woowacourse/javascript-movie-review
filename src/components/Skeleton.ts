class Skeleton {
  static get MovieDetailModal() {
    return /*html*/ `
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="./images/modal_button_close.png" />
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <div class="modal-image-skeleton"></div>
            </div>
            <div class="modal-description">
              <h2>로딩중...</h2>
              <p class="category">
                로딩중...
              </p>
              <p class="rate">
                <img src="./images/star_filled.png" class="star" /><span
                  >0.0</span>
              </p>
              <hr />
              <div class="my-rate">
                ${this.MyRate}
             </div>
              
              <hr />
              <p class="detail">
                로딩중...
              </p>
            </div>
          </div>
      </div>`;
  }

  static get MyRate() {
    return /*html*/ `
    <div>내 별점</div>
    <div class="star-container"> 
      <span class="stars">
        <img src="./images/star_empty.png" id="star-1" />
        <img src="./images/star_empty.png" id="star-2" />
        <img src="./images/star_empty.png" id="star-3" />
        <img src="./images/star_empty.png" id="star-4" />
        <img src="./images/star_empty.png" id="star-5" />
      </span>
      <span class="rate-comment">   (0/10)</span>
    </div>
    `;
  }

  static get MovieList() {
    return /*html*/ `
      ${Array.from({ length: 20 })
        .map(
          () => /*html*/ `
          <li class="skeleton-list">
            <div class="skeleton-item">
              <div class="skeleton-thumbnail"></div>
              <div class="skeleton-item-desc">
                <div class="skeleton-text"></div>
                <div class="skeleton-text" style="width: 50%"></div>
              </div>
            </div>
          </li>
        `
        )
        .join("")}`;
  }

  static get TopRatedMovie() {
    return /*html*/ `
      <div class="background-container">
        <div class="overlay" aria-hidden="true"></div>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" alt="star-empty"/>
            <span class="rate-value">0</span>
          </div>
          <div class="title">로딩중...</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>`;
  }
}

export default Skeleton;
