import MovieList from '../common/MovieList.js'
import hideskeleton from '../../util/hideskeleton.js'
import { IMovieData, IMovieState } from '../../../types/movieDataType'
import Button from '../common/Button.js'
import { fetchPopularMovies, fetchSearchMovies } from '../../api/fetch.js'

function MovieLayout(movieData: IMovieData[]) {
  let state: IMovieState = {
    title: '지금 인기 있는 영화',
    isPossibleMore: movieData.length === 20,
    movieData,
    currentPage: 1,
    searchKeyword: '',
    totalPages: 0,
  }

  const movieList = MovieList()
  render()

  function incrementCurrentPage() {
    state.currentPage = (state.currentPage ?? 1) + 1
  }

  function replaceChildren(newState: IMovieState) {
    state = { currentPage: 1, ...newState }
    render()
  }

  // static skeletonRender() {
  //   const skeletonTemplate = `
  //       <h2 id="movieListTitle" class="text-xl"></h2>
  //       <div id="movieListContainer">
  //           ${MovieList(createSkeletonData)}
  //       </div>
  //   `
  //   const movieSectionEl = document.getElementById('movieSection')
  //   if (movieSectionEl) movieSectionEl.innerHTML = skeletonTemplate
  // }

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
            <h2 id="movieListTitle" class="text-xl">${state.title}</h2>
            <div id="movieListContainer">
                
            </div>
            ${
              state.isPossibleMore
                ? Button({
                    id: 'readMoreButton',
                    content: '더보기',
                    type: 't',
                    width: '100%',
                    onclick: () => newMovieListRender(),
                  })
                : ''
            }
        `
  }

  function hideButton() {
    const readMoreButton = document.getElementById('readMoreButton')
    if (state.totalPages === state.currentPage && readMoreButton) {
      readMoreButton.style.display = 'none'
    }
  }

  function render() {
    const readMoreButton = document.getElementById('readMoreButton')
    if (readMoreButton) readMoreButton.removeEventListener('click', () => newMovieListRender())
    const movieSectionEl = document.getElementById('movieSection')
    if (movieSectionEl) movieSectionEl.innerHTML = template()
    movieList.render(state.movieData)

    hideskeleton()
    document.getElementById('readMoreButton')?.addEventListener('click', () => newMovieListRender())
    hideButton()
  }

  async function newMovieListRender() {
    setTimeout(hideskeleton, 500)
    incrementCurrentPage()
    const fetchFn = state.searchKeyword ? fetchSearchMovies : fetchPopularMovies
    const { results } = await fetchFn(state.currentPage ?? 1, state.searchKeyword ?? '')
    movieList.moreMovieListRender(results)
    hideskeleton()
    hideButton()
  }

  return { render, replaceChildren }
}
export default MovieLayout
