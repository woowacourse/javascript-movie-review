import MovieList from "../common/MovieList.js";
import Button from "../common/Button.js";
import hideskeleton from "../../util/hideskeleton.js";
import {IMovieData,IMovieState} from "../../../types/movieDataType";
import createSkeletonData from "../../util/createSkeletonData.js";

class MovieLayout {
    #state:IMovieState;

    constructor(movieData: IMovieData[]) {
        this.#state = {
            title: "지금 인기 있는 영화",
            eventName: "readMoreMovieList",
            isPossibleMore: movieData.length === 20,
            movieData,
        }
        this.render();
    }

    setState(newState:IMovieState) {
        this.#state = {...this.#state, ...newState};
        this.render();
    }

    static skeletonRender() {
        const skeletonTemplate = `
        <h2 id="movieListTitle" class="text-xl"></h2>
        <div id="movieListContainer">
            ${MovieList(createSkeletonData).template().outerHTML}
        </div>
    `
    const movieSectionEl = document.getElementById('MovieSection')
    if (movieSectionEl) movieSectionEl.innerHTML = skeletonTemplate;
        
    }

    template() {
        if(this.#state.movieData?.length === 0){
            return`
            <div class="flex-center gap-16">
                <img src="./images/hangsung.png" />
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
        const movieSectionEl = document.getElementById('MovieSection')
        if(movieSectionEl) movieSectionEl.innerHTML = this.template();
        hideskeleton();
    }

    newMovieListRender(dataList:IMovieData[]) {
        const ul = MovieList(dataList).template();
        document.getElementById('movieListContainer')?.appendChild(ul);
    }

}

   

export default MovieLayout;