import MovieList from "../common/MovieList.js";
import Button from "../common/Button.js";
import hideskeleton from "../../util/hideskeleton.js";
import {MovieData,MovieState} from "../../../types/movieDataType";
import createSkeletonData from "../../util/createSkeletonData.js";
import { getElement } from "../../util/utils.js";
import { MOVIE_COUNT_PER_PAGE } from "../../constant/constant.js";

class MovieLayout {
    #state:MovieState;

    constructor(movieData: MovieData[]) {
        this.#state = {
            title: "지금 인기 있는 영화",
            eventName: "readMoreMovieList",
            isPossibleMore: movieData.length === MOVIE_COUNT_PER_PAGE,
            movieData,
        }
        this.render();
    }

    async setState(newState:MovieState) {
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
    const movieSectionEl = getElement('#MovieSection')
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
        const movieSectionEl = getElement('#MovieSection')
        if(movieSectionEl) movieSectionEl.innerHTML = this.template();
         hideskeleton()
    }

    newMovieListRender(dataList:MovieData[]) {
        const ul = MovieList(dataList).template();
        getElement('#movieListContainer')?.appendChild(ul);
    }

}

   

export default MovieLayout;