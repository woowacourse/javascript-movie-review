import { createElement } from '../../util/utils.js'
import MovieItem from './MovieItem.js'
import roundRating from '../../util/roundRating.js'

function MovieList(dataList) {
  return `
    <ul id="thumbnailList" class="thumbnail-list">
    ${dataList
      .map((data) => {
        return `<li>
        ${MovieItem({
          img: data.poster_path,
          rating: roundRating(data.vote_average),
          title: data.title,
        })}
      </li>
      `
      })
      .join(' ')}
    </ul>
    `
}

export default MovieList
