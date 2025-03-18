function MovieItem({ img, rating, title }) {
  function template() {
    return `<div class="item">
        <img
          class="thumbnail"
          src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
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
