import Header from './component/common/Header.js'
import { fetchPopularMovies, fetchSearchMovies } from './api/fetch.js'
import Banner from './component/common/Banner.js'
import MovieLayout from './component/feature/MovieLayout.js'
import SearchForm from './component/common/SearchForm.js'

history.scrollRestoration = 'manual'

Header()

async function main() {
  const movieData = await fetchPopularMovies(1)
  const movieLayout = MovieLayout(movieData.results)
  const bannerElement = document.getElementById('bannerSection')
  if (bannerElement) bannerElement.innerHTML = Banner()

  const searchForm = await SearchForm('headerSearchBox')
  searchForm.render()
  searchForm.onSearch(async (keyword) => {
    const { results, total_pages } = await fetchSearchMovies(1, keyword)
    bannerElement?.setAttribute('style', 'display: none')
    movieLayout.replaceChildren({
      title: `"${keyword}" 검색 결과`,
      movieData: results,
      isPossibleMore: results.length === 20,
      searchKeyword: keyword,
      totalPages: total_pages,
    })
  })
}

main()

const headerBack = document.querySelector('#headerBackground')
let isScrolled = window.scrollY > 400
window.addEventListener('scroll', () => {
  if (!headerBack) return
  if (window.scrollY > 400 !== isScrolled) {
    headerBack.classList.toggle('scrolled')
    isScrolled = !isScrolled
  }
})
