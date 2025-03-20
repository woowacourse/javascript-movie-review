import { fetchSearchMovies } from "../api/fetch";
import MovieLayout from "../component/common/MovieLayout.js";

async function submitEvent(this:SubmitEvent, movieLayout: MovieLayout) {
  document.addEventListener("submit", onSubmit.bind(this));

  async function getSearchData(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault();
    const formData = new FormData(form);
    const searchKeyword = String(formData.get("searchInput"));

    const {results: searchData} = await fetchSearchMovies(searchKeyword, 1);
    console.log(searchData);
    movieLayout.setState({title: `"${searchKeyword}" 검색 결과`, eventName: 'readMoreSearchList', movieData: searchData});
  }


  async function onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form) return;

    if (form.id === "searchForm") {
        await getSearchData(event, form);
    }

    document.getElementById('bannerSection')?.setAttribute('style','display: none');

    window.scrollTo({ top: 0, behavior: "smooth" });

    form.reset();
  }
}

export default submitEvent;
