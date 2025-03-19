import MovieList from "./MovieList.js";
import Button from "./Button.js";
import { fetchPopularMovies } from "../../api/fetch.js";

async function MovieLayout({title, eventName}) {
    function template(movieData) {
        return `
            <h2 id="movieListTitle" class="text-xl">${title}</h2>
            <div id="movieListContainer">
                ${MovieList(movieData).template().outerHTML}
            </div>
            ${Button({content: '더보기', eventName, type: 't', width:'100%'})}
        `}
    function newMovieListRender(dataList) {
        const ul = MovieList(dataList).template();
        document.getElementById('movieListContainer').appendChild(ul);
    }
    
    async function initialRender(){
        const initialData = await fetchPopularMovies(1);
        document.getElementById('MovieSection').innerHTML = template(initialData);
    }

    function render(movieData){
        document.getElementById('MovieSection').innerHTML = template(movieData);
    }

    return {
        initialRender,
        render, 
        newMovieListRender
    }
}

export default MovieLayout;