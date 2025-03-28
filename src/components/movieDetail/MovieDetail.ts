import { movieDetail } from "../../store/store";
import { useEvents } from "../../utils/Core";
import { $ } from "../../utils/domHelper";

const MovieDetail = () => {
  const [addEvent] = useEvents(".modal");
  addEvent("click", ".close-modal", () => {
    $(".modal-background").classList.remove("active");
  });

  if (!movieDetail) return;

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
            <p class="detail">
              ${movieDetail.overview}
            </p>
          </div>
        </div>
  `;
};

export default MovieDetail;
