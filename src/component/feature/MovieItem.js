import { createElement } from '../../util/utils'
import StarIcon from '../common/StarIcon'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

function MovieItem({ id, img, rating, title }) {
  const movieId = id
  function template() {
    const li = createElement({ tag: 'li' })
    const imgSrc = img ? `${BASE_IMAGE_URL}${img}` : './images/nullImage.png'
    li.innerHTML = `<div class="item">
      <div class="skeleton-loading">
        <div class="skeleton-image"></div>
        <img
          class="thumbnail"
          src="${imgSrc}"
          alt="${title}"
        />
        </div>


        <div class="item-desc">
        
        <div class="skeleton-loading">
          <div class="skeleton-image"></div>
          <p class="rate">
            ${StarIcon({ type: 'small', rating })}
          </p>
          </div>
          <div class="skeleton-loading">
            <div class="skeleton-image"></div>
            <strong>${title}</strong>
          </div>
        </div>
       
      </div>`
    return li
  }

  return { template, getId: () => movieId }
}

export default MovieItem
