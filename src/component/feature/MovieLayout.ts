import MovieList from './MovieList.js'
import hideskeleton from '../../util/hideskeleton.js'
import { IMovieData, IMovieState } from '../../../types/movieDataType'
import { fetchPopularMovies, fetchSearchMovies } from '../../api/fetch.js'
import ScrollObserver from './ScrollObserver.js'

function MovieLayout(movieData: IMovieData[]) {
  let state: IMovieState = {
    title: '지금 인기 있는 영화',
    movieData,
    currentPage: 1,
    searchKeyword: '',
    totalPages: 0,
  }

  const scrollTrigger = ScrollObserver()

  const movieList = MovieList()
  render()

  function incrementCurrentPage() {
    state.currentPage = (state.currentPage ?? 1) + 1
  }

  function replaceChildren(newState: IMovieState) {
    state = { currentPage: 1, ...newState }
    render()
  }

  function template() {
    if (state.movieData?.length === 0) {
      return `
            <div class="flex-center gap-16">
                <img src="./images/hangsung.png" />
                <div class="text-xl">검색 결과가 없습니다.</div>
            </div>
            `
    }
    return `
            <h2 id="movieListTitle" class="text-xl my-36 ml-48">${state.title}</h2>
            <div id="movieListContainer">
                
            </div>

            <div id="scrollObserverContainer">
  
            </div>
        `
  }

  function render() {
    const movieSectionEl = document.getElementById('movieSection')
    if (movieSectionEl) movieSectionEl.innerHTML = template()
    movieList.render(state.movieData)

    scrollTrigger.render('scrollObserverContainer', newMovieListRender)

    if (state.totalPages === state.currentPage && scrollTrigger) scrollTrigger.hideTrigger()

    hideskeleton()
  }

  async function newMovieListRender() {
    setTimeout(hideskeleton, 500)
    incrementCurrentPage()
    const fetchFn = state.searchKeyword ? fetchSearchMovies : fetchPopularMovies
    const { results } = await fetchFn(state.currentPage ?? 1, state.searchKeyword ?? '')
    movieList.moreMovieListRender(results)
    hideskeleton()
    if (state.totalPages === state.currentPage && scrollTrigger) scrollTrigger.hideTrigger()
  }

  return { render, replaceChildren }
}
export default MovieLayout
