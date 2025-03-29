import { createElement, getHTML } from '../../util/utils.js'
import MovieItem from './MovieItem.js'
import roundRating from '../../util/roundRating.js'
import { fetchMovieDetail } from '../../api/fetch.js'
import ModalLayout from '../feature/ModalLayout.js'

function MovieList() {
  const ul = createElement({ tag: 'ul', id: 'thumbnailList', className: 'thumbnail-list' })
  const itemMap = new Map()
  const modalLayout = ModalLayout()

  async function fetchMoreMovieItemInfo(e) {
    const li = e.target.closest('li')
    if (!li) return

    const movieId = itemMap.get(li)
    if (!movieId) return
    const { title, release_date, genres, poster_path, vote_average, overview } =
      await fetchMovieDetail(movieId)
    document.getElementById('dialogID').showModal()
    modalLayout.replaceContent({
      title,
      release_date,
      genres,
      poster_path,
      vote_average,
      overview,
    })
  }

  function setEvent() {
    getHTML('thumbnailList').removeEventListener('click', fetchMoreMovieItemInfo)
    getHTML('thumbnailList').addEventListener('click', fetchMoreMovieItemInfo)
  }

  function render(dataList) {
    getHTML('movieListContainer').appendChild(ul)
    const movieList = createMovieList(dataList)
    ul.replaceChildren(movieList)
    setEvent()
  }

  function moreMovieListRender(dataList) {
    const movieList = createMovieList(dataList)
    ul.appendChild(movieList)
  }

  function createMovieList(dataList) {
    const movieList = dataList.map((data) => {
      const movieItem = MovieItem({
        id: data.id,
        img: data.poster_path,
        rating: roundRating(data.vote_average),
        title: data.title,
      }).template()
      itemMap.set(movieItem, data.id)
      return movieItem
    })
    const docfrag = new DocumentFragment()
    movieList.forEach((li) => docfrag.appendChild(li))
    return docfrag
  }

  return { render, moreMovieListRender, setEvent }
}

export default MovieList
