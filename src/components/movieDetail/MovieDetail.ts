import { movieDetail } from "../../store/store";
import { useEvents } from "../../utils/Core";
import { $, $$ } from "../../utils/domHelper";

const VOTE_TEXT = [
  "최악이에요(2/10)",
  "별로예요(4/10)",
  "보통이예요(6/10)",
  "재밌었어요(8/10)",
  "명작이예요(10/10)",
];

const MovieDetail = () => {
  const [addEvent] = useEvents(".modal");

  addEvent("click", ".close-modal", () => {
    $(".modal-background").classList.remove("active");
  });

  addEvent("click", ".my-vote-star", (event) => {
    window.localStorage.setItem(movieDetail.id, event.target.dataset.index);
  });

  addEvent("mouseover", ".my-vote-star", (event) => {
    const index = parseInt(event.target.dataset.index);

    const starElements = $$(".my-vote-star");
    const starTextElement = $(".my-vote-text");

    starElements.forEach((element, i) => {
      if (i <= index) {
        element.src = "./star_filled.png";
        starTextElement.textContent = VOTE_TEXT[i];
      } else element.src = "./star_empty.png";
    });
  });

  addEvent("mouseout", ".my-vote-star", () => {
    const vIndex = Number(window.localStorage.getItem(movieDetail.id));
    const starElements = $$(".my-vote-star");
    starElements.forEach((element) => {
      const index = parseInt(element.dataset.index);
      if (vIndex >= index) element.src = "./star_filled.png";
      else element.src = "./star_empty.png";
    });
    $(".my-vote-text").textContent = VOTE_TEXT[vIndex];
  });

  if (!movieDetail) return;

  const voteIndex = window.localStorage.getItem(movieDetail.id) || -1;
  return `
        <button class="close-modal" id="closeModal">
          <img src=/modal_button_close.png />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="https://image.tmdb.org/t/p/original//${
                movieDetail.poster_path
              }"
            />
          </div>
          <div class="modal-description">
            <h2>${movieDetail.title}</h2>
            <p class="category">
              ${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres
    .map((genre) => genre.name)
    .join(", ")}
            </p>
            <p class="rate">
              <img src="./star_filled.png" class="star" /><span
                >${movieDetail.vote_average.toFixed(1)}</span
              >
            </p>
            <hr />
            <h4>내 별점</h4>
            <div class="my-vote-container">
              ${Array.from(
                { length: 5 },
                (_, index) =>
                  `<img src=${
                    voteIndex < index ? "./star_empty.png" : "./star_filled.png"
                  } class="star my-vote-star" data-index="${index}" />`
              ).join("")}
              <span class="my-vote-text">${VOTE_TEXT[voteIndex] || ""}</span>
            </div>
            <hr />
            <h4>줄거리</h4>
            <p class="detail">
              ${movieDetail.overview}
            </p>
          </div>
        </div>
  `;
};

export default MovieDetail;
