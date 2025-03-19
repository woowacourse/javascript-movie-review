import { fetchPopularMovies } from "../api/fetch.js";
import { fetchSearchMovies } from "../api/fetch.js";
import hideskeleton from "./hideskeleton.ts";

function removeButton(movieLayout, total_pages, pageIndex){
  if(total_pages<pageIndex){
    movieLayout.setState(
      {
        isPossibleMore:false,
    }
    )
  }
}


async function clickEvent(movieLayout) {
    document.addEventListener("click", onClick);

    function reload() {
      location.reload();
    }
  
    const readMoreMovieList = (function () {
      let pageIndex = 2;
      setTimeout(hideskeleton, 500);
      async function loadMovieData() {
        const {results, total_pages} = await fetchPopularMovies(pageIndex);
        pageIndex++;

        removeButton(movieLayout, total_pages, pageIndex)

        return results;
      }
      return async function () {
        const movieData = await loadMovieData();
        movieLayout.newMovieListRender(movieData);
        hideskeleton();
      };
    })();

    const readMoreSearchList = (function () {
      let pageIndex = 2;
      async function loadMovieData() {
        const layoutTitleText = document.getElementById("movieListTitle").innerText;
        const regex = /"([^"]*)"/;
        const searchKeyword = layoutTitleText.match(regex)[1];
        const {results, total_pages} = await fetchSearchMovies(searchKeyword,pageIndex);
        pageIndex++;

        removeButton(movieLayout, total_pages, pageIndex)
        
         return results;
      }
      return async function () {
        const movieData = await loadMovieData();
        movieLayout.newMovieListRender(movieData);
        hideskeleton();
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


