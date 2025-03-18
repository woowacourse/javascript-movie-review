const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function MovieItem({ img, rating, title }) {
  function template() {
    return `<div class="item">
        <img
          class="thumbnail"
          src="${BASE_IMAGE_URL}${img}"
          alt="${title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./public/images/star_empty.png" class="star" /><span
              >${rating}</span
            >
          </p>
          <strong>${title}</strong>
        </div>
      </div>`
  }

  return template()
}

export default MovieItem
