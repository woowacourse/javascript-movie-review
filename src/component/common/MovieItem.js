const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
//import nullIma

function MovieItem({ img, rating, title }) {
  
  function template() {
    const imgSrc = img ? `${BASE_IMAGE_URL}${img}` : './images/nullImage.png';
    return `<div class="item">
        <img
          class="thumbnail"
          src="${imgSrc}"
          alt="${title}"
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span
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
