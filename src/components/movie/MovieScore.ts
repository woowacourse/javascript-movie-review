import { StarFilled, StartEmpty } from "../../../images";
import { $, dispatchCustomEvent } from "../../utils/dom";

class MovieScore extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    const movieScore = Number(this.getAttribute("movie-score")) ?? 0;
    const scores = [2, 4, 6, 8, 10];

    this.innerHTML = /* html */ `
        <div id="detail-score-title">내 별점</div> 
        <div id="detail-score-image">
          ${scores
            .map((score) => {
              return /* html */ `
                <img class="star" src="${
                  movieScore < score ? StartEmpty : StarFilled
                }" class="star" alt="별점 ${score}" data-score="${score}"/>`;
            })
            .join("")}    
        </div>
        <div id="detail-score-description">
          ${this.getScoreMessage(movieScore)}
        </div>
     `;
  }

  addEvent() {
    $("#detail-score-image", this)?.addEventListener("click", (event) =>
      this.onClickScoreImage(event)
    );
  }

  onClickScoreImage(event: Event) {
    if (event.target instanceof HTMLImageElement) {
      const score = <string>event.target.dataset.score;

      dispatchCustomEvent(<HTMLElement>$("movie-detail"), {
        eventType: "setMovieScore",
        data: {
          movieId: <string>this.getAttribute("movie-id"),
          score,
        },
      });
      this.setAttribute("movie-score", score);
      this.render();
      this.addEvent();
    }
  }

  getScoreMessage(score: number) {
    switch (score) {
      case 0:
        return "별점 매기기";
      case 2:
        return "2 최악이예요";
      case 4:
        return "4 별로예요";
      case 6:
        return "6 보통이에요";
      case 8:
        return "8 재미있어요";
      case 10:
        return "10 명작이에요";
    }
  }
}

interface MovieScore {
  "movie-score": typeof MovieScore;
}

customElements.define("movie-score", MovieScore);

export default MovieScore;
