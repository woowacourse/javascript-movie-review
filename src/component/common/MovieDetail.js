import { BASE_IMAGE_URL } from "../../constant/constant.js"

function MovieDetail({poster_path, title, vote_average,release_date, genres, overview}){
    const imgSrc = poster_path ? `${BASE_IMAGE_URL}${poster_path}` : './images/nullImage.png';
    const genresName = genres.map((genre)=>genre.name).join(", ")
    const year = release_date.split("-")[0];
  
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
              <img src="./images/star_filled.png" class="star" /><span
                >${vote_average}</span
              >
            </p>
            <hr />
            <p class="detail">
              ${overview}
            </p>
          </div>
        </div>`
}

export default MovieDetail