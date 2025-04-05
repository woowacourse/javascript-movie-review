import { pipe } from "@zoeykr/function-al";
import { images } from "../../assets/images";
import { isDetailError, movieDetail, setIsModalOpen } from "../../store/store";
import { useEvents } from "../../utils/Core";
import { $, $$ } from "../../utils/domHelper";
import { observeLastMovie } from "../../utils/InfiniteScroll";

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
    setIsModalOpen(false);
    observeLastMovie();
  });

  addEvent("click", ".my-vote-star", (event) => {
    const clickProcess = pipe(
      (e: Event) =>
        (e.target as HTMLElement).closest(".my-vote-star") as HTMLImageElement,
      (target: HTMLElement | null) => {
        return target?.dataset?.index ? target.dataset.index : null;
      },
      (index: string | null) => {
        if (index && movieDetail) {
          window.localStorage.setItem(JSON.stringify(movieDetail.id), index);
        }
      }
    );

    clickProcess(event);
  });

  addEvent("mouseover", ".my-vote-star", (event) => {
    const target = (event.target as HTMLElement).closest(
      ".my-vote-star"
    ) as HTMLImageElement;
    if (!target?.dataset?.index) return;
    const index = Number(target.dataset.index);

    const starElements = $$(".my-vote-star") as NodeListOf<HTMLImageElement>;
    const starTextElement = $(".my-vote-text");

    starElements.forEach((element, i) => {
      if (i <= index) {
        element.src = images.starFull;
      } else element.src = images.starEmpty;
    });
    starTextElement.textContent = VOTE_TEXT[index];
  });

  addEvent("mouseout", ".my-vote-star", () => {
    if (movieDetail) {
      const vIndex = Number(
        window.localStorage.getItem(JSON.stringify(movieDetail.id))
      );
      const starElements = $$(".my-vote-star") as NodeListOf<HTMLImageElement>;
      starElements.forEach((element) => {
        if (!element?.dataset?.index) return;
        const index = parseInt(element.dataset.index);
        if (vIndex >= index) element.src = images.starFull;
        else element.src = images.starEmpty;
      });
      $(".my-vote-text").textContent = VOTE_TEXT[vIndex];
    }
  });

  if (!movieDetail) return;

  const voteIndex =
    Number(window.localStorage.getItem(JSON.stringify(movieDetail.id))) || -1;

  if (isDetailError) return `<div>영화 정보를 불러오지 못했습니다.</div>`;
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
              onerror="this.src='${images.fallback}'"
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
              <img src=${images.starFull} class="star" /><span
                >${movieDetail.vote_average.toFixed(1)}</span
              >
            </p>
            <hr />
            <h4>내 별점</h4>
            <div class="my-vote-container">
            <div class="star-container">
              ${Array.from(
                { length: 5 },
                (_, index) =>
                  `<img src=${
                    voteIndex < index ? images.starEmpty : images.starFull
                  } class="star my-vote-star" data-index="${index}" />`
              ).join("")}
              </div>
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
