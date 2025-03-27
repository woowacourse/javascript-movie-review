import Header from './component/common/Header.js'
import MovieLayout from './component/feature/MovieLayout'
import submitEvent from './component-event/submitEvent.js'
import { fetchPopularMovies } from './api/fetch.js'
import Banner from './component/common/Banner.js'

history.scrollRestoration = 'manual'
submitEvent
MovieLayout.skeletonRender()
const movieData = await fetchPopularMovies(1)
const movieLayout = new MovieLayout(movieData.results)
const bannerElement = document.getElementById('bannerSection')
if (bannerElement) bannerElement.innerHTML = Banner(movieData.results[0])
await submitEvent(movieLayout)
Header()
