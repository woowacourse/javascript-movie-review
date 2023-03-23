import CustomComponent from "../abstracts/CustomComponent";

export default class ModalComponent extends CustomComponent {
  template() {
    return `
            <div class="modal-body">
            <div class="content-header">
                <h3>영화 이름</h3>
                <button>닫기 버튼</button>
            </div>
            <div class="content-body">
              <img alt="영화 포스터 이미지">
              <div class="movie-details">
              <div class="movie-detail-header">
                <p>장르</p>
                <div>별점</div>
              </div>
              <div> 설명입니다. 설명입니다 </div>
              <div> 평점 매기기 </div>
            </div>
            </div>
        `;
  }
}

customElements.define("modal-component", ModalComponent);
