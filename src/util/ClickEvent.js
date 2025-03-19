import { fetchPopularMovies } from "../api/fetch.js";
import { fetchSearchMovies } from "../api/fetch.js";


async function clickEvent(movieLayout) {
    document.addEventListener("click", onClick);

    function reload() {
      location.reload();
    }
  
    const readMoreMovieList = (function () {
      let pageIndex = 2;
      async function loadMovieData() {
        const cachedData = await fetchPopularMovies(pageIndex);
        pageIndex++;
        return cachedData;
      }
      return async function () {
        const movieData = await loadMovieData();
        movieLayout.newMovieListRender(movieData);
      };
    })();

    const readMoreSearchList = (function () {
      let pageIndex = 2;
      async function loadMovieData() {
        const layoutTitleText = document.getElementById("movieListTitle").innerText;
        const regex = /"([^"]*)"/;
        const searchKeyword = layoutTitleText.match(regex)[1];
        const cachedData = await fetchSearchMovies(searchKeyword,pageIndex);
        pageIndex++;
         return cachedData;
      }
      return async function () {
        const movieData = await loadMovieData();
        movieLayout.newMovieListRender(movieData);
      };
    })();

  
    async function onClick(event) {
      const target = event.target.closest("[data-action]");
      if (!target) return;
  
      if (target.dataset.action === 'readMoreMovieList') {
        await readMoreMovieList();
      }

      if (target.dataset.action === 'readMoreSearchList') {
        await readMoreSearchList();
      }

      if (target.dataset.action === 'reload') reload();
    }
  }

export default clickEvent;

