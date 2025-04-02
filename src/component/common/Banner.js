import roundRating from "../../util/roundRating.js"
import { getElement } from "../../util/utils.js"
import Button from "./Button.js"
import Modal from "./Modal.js";
import MovieDetail from "./MovieDetail.js";
import { fetchDetailMovie } from "../../api/fetch.js";

async function Banner (data) {
  const {poster_path, title, vote_average, release_date, genres, overview} = await fetchDetailMovie(data.id);

  const bannerElement = getElement('#bannerSection');
  if(bannerElement) bannerElement.innerHTML = `
    <div class="background-container" style="background-image: url('https://media.themoviedb.org/t/p/w440_and_h660_face/${data.poster_path}');">
        <div class="overlay" aria-hidden="true"></div>
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${roundRating(data.vote_average)}</span>
            </div>
            <div class="title">${data.title}</div>
            ${Button("자세히 보기","자세히 보기")}
          </div>
        </div>
      </div>
    `

    const detailButton = document.getElementById("자세히 보기");
      detailButton.addEventListener("click", () => {
        Modal(`${data.id}modal`,MovieDetail({poster_path, title, vote_average, release_date, genres, overview}))
        Modal.open(`${data.id}modal`);
      });

}

export default Banner
