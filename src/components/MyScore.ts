import { SCORE_COMMENT, TOTAL_STAR_CNT } from "../constant/constant";

const MyScore = (movieId: number) => {
  const score: string = localStorage.getItem(String(movieId)) ?? "0";

  const create = () => {
    return `
        <div class="my-score">내 별점</div>
        <div class="stars">
        ${Array.from({ length: TOTAL_STAR_CNT }).map((_, index) => {
      const intScore = Number(score);
      const filledStarCount = (intScore / 2) - 1;
      return index <= filledStarCount ? `<img class="star" src="/star_filled.png" id=${index} />` :
        `<img class="star" src="/star_empty.png" id=${index} />`
    }).join("")}
        </div>
        <div class="score-number">${score}</div>
        <div class="score-text">${SCORE_COMMENT[Number(score)]}</div>
    `;
  };

  const render = () => {

    const myScore = document.createElement("div");
    myScore.classList.add("my-score-container");
    myScore.innerHTML = create();

    const target = document.querySelector(".modal-info")
    if (!target) return;

    target.appendChild(myScore);

    bindEvent()
  };

  const bindEvent = () => {
    const starsList = document.querySelector(".stars");
    if (!starsList) return;

    starsList.addEventListener("click", (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const index = Number(target.closest('.star')?.id);
      if (isNaN(index)) return;

      const newScore = `${(index + 1) * 2}`;
      updateInfo(index)
      updateStar(Number(newScore))
      localStorage.setItem(String(movieId), newScore)
    });


  }

  const updateInfo = (index: number) => {
    const scoreNumber = document.querySelector('.score-number');
    const scoreText = document.querySelector('.score-text');

    const newScore = `${(index + 1) * 2}`;
    if (!scoreNumber) return;
    scoreNumber.textContent = newScore;

    if (!scoreText) return;
    scoreText.textContent = `${SCORE_COMMENT[Number(newScore)]}`
  }

  const updateStar = (newScore: number) => {
    const stars = document.querySelectorAll<HTMLImageElement>(".star");
    stars.forEach((star, starIndex) => {
      const filledStarCount = (newScore / 2) - 1;

      if (starIndex <= filledStarCount) {
        star.src = "./star_filled.png";
      } else {
        star.src = "./star_empty.png";
      }
    });
  };

  render();
}

export default MyScore
