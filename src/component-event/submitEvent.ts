import { fetchSearchMovies } from "../api/fetch.js";
import MovieLayout from "../component/feature/MovieLayout";
import { MOVIE_COUNT_PER_PAGE } from "../constant/constant.js";
import { getElement } from "../util/utils.js";
import state from "../state/state.ts";

async function submitEvent(this:void, movieLayout: MovieLayout) {
  document.addEventListener("submit", onSubmit.bind(this));

  async function getSearchData(event: Event, form: HTMLFormElement): Promise<void> {
    event.preventDefault();
    const formData = new FormData(form);
    const searchKeyword = String(formData.get("searchInput"));
    state.searchKeyword = searchKeyword;


    const {results: searchData} = await fetchSearchMovies(1);
    movieLayout.setState({title: `"${state.searchKeyword}" 검색 결과`, eventName: 'readMoreSearchList', movieData: searchData, isPossibleMore: searchData.length === MOVIE_COUNT_PER_PAGE});

    const inputEl = document.querySelector("#searchInput");
    inputEl?.setAttribute("value", state.searchKeyword); 
  }


  async function onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form) return;

    if (form.id === "searchForm") {
        await getSearchData(event, form);
    }

    getElement('#bannerSection')?.setAttribute('style','display: none');

    window.scrollTo({ top: 0, behavior: "smooth" });

    form.reset();
  }
}

export default submitEvent;
