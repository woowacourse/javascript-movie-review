import MovieLayout from "../component/common/MovieLayout.js";
import { fetchPopularMovies } from "../api/fetch.js";


async function clickEvent() {
    document.addEventListener("click", onClick);
  
    const readMoreMovieList = (function () {
      let pageIndex = 2;
      async function loadMovieData() {
        const cachedData = await fetchPopularMovies(pageIndex);
        pageIndex++;
        return cachedData;
      }
      return async function () {
        const movieData = await loadMovieData();
        const movieLayout = await MovieLayout({ title: 'q2' });
        movieLayout.newMovieListRender(movieData);
      };
    })();
  
    async function onClick(event) {
      const target = event.target.closest("[data-action]");
      if (!target) return;
  
      if (target.dataset.action === 'readMoreMovieList') {
        await readMoreMovieList();
      }
    }
  }

export default clickEvent;

