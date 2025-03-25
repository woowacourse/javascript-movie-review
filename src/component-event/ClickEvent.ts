import { fetchPopularMovies } from "../api/fetch.js";
import { fetchSearchMovies } from "../api/fetch.js";
import hideskeleton from "../util/hideskeleton.ts";
import { MovieLayout } from "../../types/movieDataType";

function removeButton(movieLayout:MovieLayout, total_pages:number, pageIndex:number){
  if(total_pages<pageIndex){
    movieLayout.setState(
      {
        isPossibleMore:false,
    }
    )
  }
}


async function clickEvent(movieLayout:MovieLayout) {
    document.addEventListener("click", onClick);

    function reload() {
      location.reload();
    }
  
    const readMoreMovieList = (function () {
      let pageIndex = 2;

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
 
        const {results, total_pages} = await fetchSearchMovies(pageIndex);
        pageIndex++;

        removeButton(movieLayout, total_pages, pageIndex)
        
         return results;
      }
      
      return async function () {
        const movieData = await loadMovieData();
        if (movieData) movieLayout.newMovieListRender(movieData);
        hideskeleton()
      };
    })();

  
    async function onClick(event: DocumentEventMap['click']) {
      const target = event.target instanceof Element 
      ? event.target.closest("[data-action]") 
      : null;
  
      if (!(target instanceof HTMLElement)) return; 
  
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


