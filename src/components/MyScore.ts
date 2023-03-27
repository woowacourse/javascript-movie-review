import emptyStar from "../../templates/star_empty.png";

export const SCORE_COMMENT: any = {
  0: "별점을 입력해주세요",
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

const MyScore = (target: any, movieId: number) => {
  const score = (localStorage.getItem(String(movieId))) === null ? 0 : localStorage.getItem(String(movieId));

  const create = () => {
    console.log(emptyStar)
    return `
        <div class="my-score">내 별점</div>
        <div class="stars">
        ${Array.from({ length: 5 }).map((_, index) => {
      const IntScore = Number(score)
      return index <= (IntScore / 2) - 1 ? `<img class="star" src="./star_filled.png" id=${index} />` : `<img class="star" src="./star_empty.png" id=${index} />`
    }).join("")}
        </div>
        <div class="score-number">${score}</div>
        <div class="score-text">${SCORE_COMMENT[Number(score)]}</div>
    `;
  };

  const render = () => {
    if (document.querySelector('.my-score-container')) {
      return
    }
    const myScore = document.createElement("div");
    myScore.classList.add("my-score-container");
    myScore.innerHTML = create();
    target.appendChild(myScore);

    bindEvent()
  };

  const bindEvent = () => {
    const starsList = document.querySelector(".stars");
    if (!starsList) return;

    starsList.addEventListener("click", (e: any) => {
      const target = e.target;
      if (!target) return;

      const index = Number(target.closest('.star').id)
      const newScore = `${(index + 1) * 2}`;
      updateInfo(index)
      updateStar(index, Number(newScore))
      localStorage.setItem(String(movieId), `${(index + 1) * 2
        }`)

    })

  }

  const updateInfo = (index: any) => {
    const scoreNumber = document.querySelector('.score-number');
    const scoreText = document.querySelector('.score-text');

    if (!scoreNumber) return;
    scoreNumber.textContent = `${(index + 1) * 2
      }`;

    if (!scoreText) return;
    const newScore = `${(index + 1) * 2}`;
    scoreText.textContent = `${SCORE_COMMENT[Number(newScore)]}`
  }

  const updateStar = (index: number, newScore: number) => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star: any, starIndex: number) => {
      if (starIndex <= (newScore / 2) - 1) {
        star.src = "./star_filled.png"
      } else {
        star.src = "./star_empty.png"
      }
    });
  };


  render();
}

export default MyScore