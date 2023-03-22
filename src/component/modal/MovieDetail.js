import CustomElement from "../basic/CustomElement";

class MovieDetail extends CustomElement {
  template() {
    return `
    <section class="modal-head">
      <span></span>
      <h3 class="text-title">고양이가 세상을 구한다 : 고양라이팅</h1>
      <div class="close-btn text-title">X</div>
    </section>
    <hr />
    <section class="modal-main">
      <img class="modal-img" src="./image/noImg.jpeg" />
      <section class="modal-detail">
        <div class="title text-body">
          <p>고양이</p>
          <img class="detail-star" src="./image/star_filled.png" alt="별점" />
          <p>10.0</p>
        </div>
        <div class="detail text-body">
          고양이(Felis catus)는 포유류 식육목 고양이과의 동물이다.

          현생 고양이를 포함한 모든 고양이과 동물들이 공통 조상으로부터 약 2000만 년 전 분화한 이후, 들고양이는 10만~7만여 년 전부터 출현했으며, 가축화는 약 5만여 년전 이집트나 메소포타미아 등 중동 지역의 아프리카들고양이(Felis lybica)가 식량 확보 등의 이유로 도시 등 인간의 대규모 정착지에 나와 살던 것을 인간이 키우기 시작한 것이 오늘날 고양이의 유래다. 인간과 고양이의 공존은 인간에게는 쥐를 잡아주고 고양이에게는 안정적인 식량 확보가 가능하다는 상호간의 이점이 있었으며, 이로 인해 고양이는 오랜 시간이 지나며 자연스럽게 자기가축화되었다. 
        </div>
        <div class="user-rate">
          <p class="user-rate-title">내 별점</p>
          <div class="rate-container">
            <img class="rate" src="./image/star_filled.png" alt="별점" />
            <img class="rate" src="./image/star_filled.png" alt="별점" />
            <img class="rate" src="./image/star_filled.png" alt="별점" />
            <img class="rate" src="./image/star_filled.png" alt="별점" />
            <img class="rate" src="./image/star_filled.png" alt="별점" />
          </div>
          <p class="user-rate-title">10점: 명작이에요</p>
        </div>
      </section>
    </section>
    `;
  }
}

customElements.define("movie-detail", MovieDetail);

export default MovieDetail;
