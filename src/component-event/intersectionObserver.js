import hideskeleton from "../util/hideskeleton.js";
import { fetchPopularMovies,fetchSearchMovies } from "../api/fetch.js";
import state from "../state/state.js";
import InfiniteScrollLoader from "../component/common/InfiniteScrollLoader.js";

export const intersectionObserver = (movieLayout) => {
    const $target = document.getElementById("loader")

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
            const handleFetch = async ()=>{
                try{
                    if(!state.searchKeyword){
                        readMoreMovieList(movieLayout);
                    }else{
                        readMoreSearchList(movieLayout)
                    }
                }catch(error){
                    console.error(error)
                    observer.disconnect();
                }
            }

            handleFetch();
            }
        })
    })

    observer.observe($target);
}

const readMoreMovieList = (function () {
    InfiniteScrollLoader.render()
    let pageIndex = 2;

    async function loadMovieData() {
      const { results, total_pages } = await fetchPopularMovies(pageIndex);
      pageIndex++;
      return results;
    }
  
    return async function (movieLayout) {
      const movieData = await loadMovieData();
      movieLayout.newMovieListRender(movieData);
      hideskeleton();
    };
  })();


 const readMoreSearchList = (function () {
    InfiniteScrollLoader.render()
      let pageIndex = 2;
      async function loadMovieData() {
 
        const {results, total_pages} = await fetchSearchMovies(pageIndex);
        pageIndex++;
        
         return results;
      }
      
      return async function (movieLayout) {
        const movieData = await loadMovieData();
        if (movieData) movieLayout.newMovieListRender(movieData);
        hideskeleton()
      };
})();