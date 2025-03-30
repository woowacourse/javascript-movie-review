import { BASE_IMAGE_URL} from "../../constant/constant.js"
import roundRating from "../../util/roundRating.js";
import MyRating from "./MyRating.js";
import StarButton from "./StarButton.js";

function MovieDetail({poster_path, title, vote_average,release_date, genres, overview}){
    const imgSrc = poster_path ? `${BASE_IMAGE_URL}${poster_path}` : './images/nullImage.png';
    const genresName = genres.map((genre)=>genre.name).join(", ")
    const year = release_date.split("-")[0];
    const rating = roundRating(vote_average)
    const myRating = MyRating(title)

    const starEls = document.querySelectorAll(".star-button");
  
    return `
        <button class="close-modal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
              <img
                src="${imgSrc}"
                alt="${title}"
             />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
              ${year} · ${genresName}
            </p>
            <p class="rate">
              <span>평균</span>
                  <img src="./images/star_filled.png" class="star" />
                  <span class="rate-text">${rating}</span>
            </p>
            <hr class="line"/>
            <p class="label-text">
              내 별점
            </p>
            <div class="my-rating-container">
              ${myRating}
            </div>
            <hr class="line"/>
            <p class="label-text">줄거리</p>
            <p class="detail">
              ${overview}
            </p>
          </div>
        </div>`
}



export default MovieDetail