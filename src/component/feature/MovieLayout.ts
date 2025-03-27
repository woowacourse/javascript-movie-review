import MovieList from '../common/MovieList.js'
import hideskeleton from '../../util/hideskeleton.js'
import { IMovieData, IMovieState } from '../../../types/movieDataType'
import createSkeletonData from '../../util/createSkeletonData.js'
import Button from '../common/Button.js'
import { fetchPopularMovies, fetchSearchMovies } from '../../api/fetch.js'

class MovieLayout {
  #state: IMovieState
  constructor(movieData: IMovieData[]) {
    this.#state = {
      title: '지금 인기 있는 영화',
      isPossibleMore: movieData.length === 20,
      movieData,
      currentPage: 1,
      searchKeyword: '',
      totalPages: 0,
    }
    this.render()
  }

  incrementCurrentPage() {
    this.#state.currentPage = (this.#state.currentPage ?? 1) + 1
  }

  replaceChildren(newState: IMovieState) {
    this.#state = { ...this.#state, ...newState }
    this.render()
  }

  static skeletonRender() {
    const skeletonTemplate = `
        <h2 id="movieListTitle" class="text-xl"></h2>
        <div id="movieListContainer">
            ${MovieList(createSkeletonData)}
        </div>
    `
    const movieSectionEl = document.getElementById('movieSection')
    if (movieSectionEl) movieSectionEl.innerHTML = skeletonTemplate
  }

  template() {
    console.log(this.#state.currentPage)
    if (this.#state.movieData?.length === 0) {
      return `
            <div class="flex-center gap-16">
                <img src="./images/hangsung.png" />
                <div class="text-xl">검색 결과가 없습니다.</div>
            </div>
            `
    }
    return `
            <h2 id="movieListTitle" class="text-xl">${this.#state.title}</h2>
            <div id="movieListContainer">
                ${MovieList(this.#state.movieData)}
            </div>
            ${
              this.#state.isPossibleMore
                ? Button({
                    id: 'readMoreButton',
                    content: '더보기',
                    type: 't',
                    width: '100%',
                    onclick: () => this.newMovieListRender(),
                  })
                : ''
            }
        `
  }

  hideButton() {
    const readMoreButton = document.getElementById('readMoreButton')
    if (this.#state.totalPages === this.#state.currentPage && readMoreButton) {
      readMoreButton.style.display = 'none'
    }
  }

  render() {
    const readMoreButton = document.getElementById('readMoreButton')
    if (readMoreButton) readMoreButton.removeEventListener('click', () => this.newMovieListRender())
    const movieSectionEl = document.getElementById('movieSection')
    if (movieSectionEl) movieSectionEl.innerHTML = this.template()
    hideskeleton()
    document
      .getElementById('readMoreButton')
      ?.addEventListener('click', () => this.newMovieListRender())
    this.hideButton()
  }

  async newMovieListRender() {
    setTimeout(hideskeleton, 500)
    this.incrementCurrentPage()
    const fetchFn = this.#state.searchKeyword ? fetchSearchMovies : fetchPopularMovies
    const { results } = await fetchFn(this.#state.currentPage ?? 1, this.#state.searchKeyword ?? '')
    //const { results } = await fetchPopularMovies(this.#state.currentPage ?? 1)
    const ul = MovieList(results)
    const movieListContainer = document.getElementById('movieListContainer')
    if (movieListContainer) movieListContainer.innerHTML += ul
    hideskeleton()
    this.hideButton()
  }
}
export default MovieLayout
