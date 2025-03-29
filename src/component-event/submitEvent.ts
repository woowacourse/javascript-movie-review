import { fetchSearchMovies } from '../api/fetch.js'
import MovieLayout from '../component/feature/MovieLayout'

async function submitEvent(this: void, movieLayout: MovieLayout) {
  document.addEventListener('submit', onSubmit.bind(this))

  async function getSearchData(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault()
    const formData = new FormData(form)
    const searchKeyword = String(formData.get('searchInput'))

    const { results: searchData, total_pages } = await fetchSearchMovies(1, searchKeyword)
    movieLayout.replaceChildren({
      title: `"${searchKeyword}" 검색 결과`,
      movieData: searchData,
      isPossibleMore: searchData.length === 20,
      searchKeyword,
      totalPages: total_pages,
    })
  }

  async function onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    if (!form) return

    if (form.id === 'searchForm') {
      await getSearchData(event, form)
    }

    document.getElementById('bannerSection')?.setAttribute('style', 'display: none')

    window.scrollTo({ top: 0, behavior: 'smooth' })

    form.reset()
  }
}

export default submitEvent
