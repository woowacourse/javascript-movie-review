import { BASE_IMAGE_URL } from "../../constant/constant.js"

function MovieDetail({img, title, year, category, detail}){
    return `
        <button class="close-modal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
              <img
                src="${img}"
                alt="${title}"
             />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <p class="category">
              ${year} · ${category}
            </p>
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span
                >7.7</span
              >
            </p>
            <hr />
            <p class="detail">
              ${detail}
            </p>
          </div>
        </div>`
}

export default MovieDetail