import MovieList from "./MovieList.js";
import Button from "./Button.js";
import { fetchPopularMovies } from "../../api/fetch.js";


async function MovieLayout({title}) {
    const initialData = await fetchPopularMovies(1);

    function template() {
        return `
            <h2>${title}</h2>
            <div id="movieListContainer">
                ${MovieList(initialData).template().outerHTML}
            </div>
            ${Button({content: '더보기', eventName: 'readMoreMovieList', type: 't'})}
        `}
    function newMovieListRender(dataList) {
        const ul = MovieList(dataList).template();
        document.getElementById('movieListContainer').appendChild(ul);
    }
    function render(){
        document.getElementById('MovieSection').innerHTML = template();
    }

    return {
        render, 
        newMovieListRender
    }
}

export default MovieLayout;