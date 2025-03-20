import MovieList from "./MovieList.js";
import Button from "./Button.js";
import { fetchPopularMovies } from "../../api/fetch.js";
import hideskeleton from "../../util/hideskeleton.js";

class MovieLayout {
    #state

    constructor(movieData) {
        this.#state = {
            title: "지금 인기 있는 영화",
            eventName: "readMoreMovieList",
            isPossibleMore:true,
            movieData,
        }
        this.render();
    }

    setState(newState) {
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    template() {
        if(this.#state.movieData.length === 0){
            return`
            <div class="flex-center gap-16">
                <img src="../public/images/hangsung.png" />
                <div class="text-xl">검색 결과가 없습니다.</div>
            </div>
            `
        }

        return `
            <h2 id="movieListTitle" class="text-xl">${this.#state.title}</h2>
            <div id="movieListContainer">
                ${MovieList(this.#state.movieData).template().outerHTML}
            </div>
            ${this.#state.isPossibleMore? Button({content: '더보기', eventName: this.#state.eventName, type: 't', width:'100%'}) : ""}
        `}
    
    render(){
        document.getElementById('MovieSection').innerHTML = this.template();
        hideskeleton();
    }

    newMovieListRender(dataList) {
        const ul = MovieList(dataList).template();
        document.getElementById('movieListContainer').appendChild(ul);
    }

}

   

export default MovieLayout;