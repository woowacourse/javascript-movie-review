import { State } from '../main.ts';
import { HttpError, fetchDefaultMovieList, fetchSearchMovieList } from '../service/movieApi.ts';
import { getElement, getInputElement, getUListElement } from '../view/getElementView.ts';
import { addMovieList, addMovieSkeletonUIList, Movie, removeMovieSkeletonUIList } from '../view/movieListView.ts';

export const callMovieList = async (
    pageNum: number,
    searchBarText: string,
): Promise<{ results: Movie[]; total_pages: number }> => {
    try {
        if (searchBarText === '') {
            return await fetchDefaultMovieList(pageNum);
        } else {
            return await fetchSearchMovieList(pageNum, searchBarText);
        }
    } catch (e) {
        if (e instanceof HttpError) alert('데이터를 불러오지 못했습니다.');
        else alert('네트워크 오류가 발생하였습니다.');
        return { results: [], total_pages: 0 };
    }
};
const renderMovieList = async (movieDisplay: HTMLUListElement, state: State): Promise<Movie[]> => {
    let movieList;
    movieDisplay.replaceChildren();
    addMovieSkeletonUIList(movieDisplay);

    const { results, total_pages } = await callMovieList(state.pageNum, state.searchBarText);

    movieList = results;
    state.totalPageNum = total_pages;

    removeMovieSkeletonUIList(movieDisplay);

    return movieList;
};

// 상태 변경
const updateSearchState = (state: State, searchBarText: string) => {
    state.searchBarText = searchBarText;
    if (searchBarText === '') {
        state.pageNum = 1;
    }
};

// UI 업데이트
const updateSearchUI = (background: HTMLElement, description: HTMLElement, searchBarText: string) => {
    if (searchBarText === '') {
        background.hidden = false;
        description.textContent = '지금 인기 있는 영화';
    } else {
        background.hidden = true;
        description.textContent = `'${searchBarText}' 검색 결과`;
    }
};

// 검색 결과 없을 때 처리
const handleEmptyResult = (movieList: Movie[]) => {
    const searchError = getElement('.search-error-container');
    searchError.hidden = movieList.length !== 0;
};

const displayMovieBySearch = async (movieDisplay: HTMLUListElement, state: State) => {
    const searchBar = getInputElement('.search-bar');
    const background = getElement('.background-container');
    const description = getElement('.page-title');

    updateSearchState(state, searchBar.value);
    updateSearchUI(background, description, state.searchBarText);

    const movieList = await renderMovieList(movieDisplay, state);

    if (state.searchBarText !== '') {
        handleEmptyResult(movieList);
    }

    addMovieList(movieDisplay, movieList);
};

export const bindSearchEvents = (state: State) => {
    const movieDisplay = getUListElement('.thumbnail-list');

    // 엔터키 이벤트
    const searchBar = getInputElement('.search-bar');
    searchBar.addEventListener('keydown', async (event) => {
        if (event.isComposing) return;

        if (event.key === 'Enter') {
            displayMovieBySearch(movieDisplay, state);
        }
    });

    // 검색 버튼 '클릭'
    const searchBtn = document.querySelector('.search-btn');
    searchBtn?.addEventListener('click', async () => {
        displayMovieBySearch(movieDisplay, state);
    });
};

// 구 더 보기 버튼 / 현 무한 스크롤
export const bindMoreMovieEvents = (state: State) => {
    const firstTarget = document.querySelector('.thumbnail-list > li:last-child');
    const movieDisplay = getUListElement('.thumbnail-list');
    const observer = new IntersectionObserver(async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && state.totalPageNum > state.pageNum) {
            await movieViewFlow(state, movieDisplay);
            const target = document.querySelector('.thumbnail-list > li:last-child');
            observer.observe(target as HTMLElement);
            observer.unobserve(entry.target);
        }
    });
    observer.observe(firstTarget as HTMLElement);

    // const displayMoreBtn = document.querySelector('.display-more-btn')
    // displayMoreBtn?.addEventListener('click', async () => {
    //     state.pageNum++

    //     addMovieSkeletonUIList(movieDisplay)

    //     let movieList
    //     movieList = await callMovieList(state.pageNum, state.searchBarText)

    //     // 영화 20개
    //     removeMovieSkeletonUIList(movieDisplay)
    //     addMovieList(movieDisplay, movieList)
    // })
};

export const movieViewFlow = async (state: State, movieDisplay: HTMLUListElement) => {
    state.pageNum++;

    addMovieSkeletonUIList(movieDisplay);

    let movieList;
    const { results, total_pages } = await callMovieList(state.pageNum, state.searchBarText);
    movieList = results;
    state.totalPageNum = total_pages;
    removeMovieSkeletonUIList(movieDisplay);
    addMovieList(movieDisplay, movieList);
};
