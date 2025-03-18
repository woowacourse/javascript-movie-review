import { createElement } from '../../util/utils'
import MovieItem from './MovieItem'

function MovieList() {
  const li = createElement('li')
  function createList(dataList) {
    dataList.map((data) => {
      MovieItem({ img: data.img, rating: data.rating, title: data.title })
    })
  }
}

export default MovieList
