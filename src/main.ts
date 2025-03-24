import Header from './component/common/Header.js'
import MovieLayout from './component/feature/MovieLayout'
import clickEvent from './component-event/ClickEvent.js'
import submitEvent from './component-event/submitEvent.js'
import { fetchPopularMovies } from './api/fetch.js'
import Banner from './component/common/Banner.js'

history.scrollRestoration = 'manual'
addEventListener('load', async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  MovieLayout.skeletonRender()
  const movieData = await fetchPopularMovies(1)
  const movieLayout = new MovieLayout(movieData.results)
  const bannerElement = document.getElementById('bannerSection')
  if (bannerElement) bannerElement.innerHTML = Banner(movieData.results[0])
  await submitEvent(movieLayout)
  clickEvent(movieLayout)
  Header()
})
