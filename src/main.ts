import Header from './component/common/Header.js'
import MovieLayout from './component/feature/MovieLayout'
import submitEvent from './component-event/submitEvent.js'
import { fetchPopularMovies } from './api/fetch.js'
import Banner from './component/common/Banner.js'
;(async () => {
  history.scrollRestoration = 'manual'
  const movieData = await fetchPopularMovies(1)
  const movieLayout = MovieLayout(movieData.results)

  const bannerElement = document.getElementById('bannerSection')
  if (bannerElement) bannerElement.innerHTML = Banner(movieData.results[0])

  await submitEvent(movieLayout)
  Header()

  window.addEventListener('scroll', () => {
    const headerBack = document.querySelector('#headerBackground')
    if (!headerBack) return
    if (window.scrollY > 400) {
      headerBack.classList.add('scrolled')
    } else {
      headerBack.classList.remove('scrolled')
    }
  })
})()
