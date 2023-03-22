import CustomComponent from "../../abstracts/CustomComponent";
import StarFilledImg from "../../../templates/star_filled.png";
import StarEmptyImg from "../../../templates/star_empty.png";

export default class SelectVoteScoreComponent extends CustomComponent {
  state = {
    movie_id: null,
    vote_star: 0,
  };

  render() {
    super.render();

    this.state.movie_id = this.getAttribute("movie-id");

    if (this.state.movie_id && localStorage.getItem(this.state.movie_id)) {
      this.state.vote_star = localStorage.getItem(this.state.movie_id);
    }

    this.rerenderStar(this.state.vote_star / 2);
  }

  handleEvent() {
    Array.from({ length: 5 }).forEach((_, index) => {
      const number = index + 1;
      this.querySelector(`#score-${number}`).addEventListener("click", () => {
        this.rerenderStar(number);
        localStorage.setItem(this.state.movie_id, number * 2);
      });
    });
  }

  rerenderStar(star) {
    Array.from({ length: star }).forEach((_, index) => {
      const node = this.querySelector(`#score-${index + 1}`);
      node.setAttribute("src", StarFilledImg);
    });

    Array.from({ length: 5 - star }).forEach((_, index) => {
      const node = this.querySelector(`#score-${5 - index}`);
      node.setAttribute("src", StarEmptyImg);
    });

    this.state.vote_star = star * 2;

    const textObject = {
      2: "최악이예요",
      4: "별로예요",
      6: "보통이에요",
      8: "재미있어요",
      10: "명작이에요",
    };

    this.querySelector("#movie-modal-score").textContent = this.state.vote_star;
    this.querySelector("#movie-modal-score-desc").textContent =
      textObject[this.state.vote_star];
  }

  template() {
    return /*html*/ `
        <h2>내 별점</h2>
        <div class="movie-modal-stars"> 
            <img class="movie-vote-star" id="score-1" src=${StarEmptyImg} alt="별점" />
            <img class="movie-vote-star" id="score-2" src=${StarEmptyImg} alt="별점" />
            <img class="movie-vote-star" id="score-3" src=${StarEmptyImg} alt="별점" />
            <img class="movie-vote-star" id="score-4" src=${StarEmptyImg} alt="별점" />
            <img class="movie-vote-star" id="score-5" src=${StarEmptyImg} alt="별점" />
        </div>
        <h3 id="movie-modal-score"></h3>
        <h3 id="movie-modal-score-desc"></h3>
    `;
  }
}

customElements.define("select-vote-score", SelectVoteScoreComponent);
