import { State } from '../main.ts';
import { HttpError, fetchDefaultMovieList, fetchSearchMovieList, fetchMovieDetail } from '../service/movieApi.ts';
import { getElement, getInputElement, getUListElement } from '../view/getElementView.ts';
import {
    addMovieList,
    addMovieSkeletonUIList,
    Movie,
    removeMovieSkeletonUIList,
    showBackgroundMovieInfo,
    updateMyStarRate,
} from '../view/movieListView.ts';
import { StarRatingStore } from '../storage/StarRatingStorage.ts';

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

let currentMovieId = 0;
export const bindModalOnOffEvent = (storage: StarRatingStore) => {
    const thumbnailBox = getElement('.thumbnail-list');
    const modalBackground = getElement('#modalBackground');

    // 모달 열기
    thumbnailBox.addEventListener('click', async (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const item = target.closest('li') as HTMLElement;
        if (!item?.dataset.id) return;

        const movie = await fetchMovieDetail(Number(item.dataset.id));
        filledModalInfo(storage, movie);

        modalBackground.classList.add('active');
        document.body.classList.add('modal-open');
    });

    // 모달 닫기 - X 버튼
    getElement('#closeModal').addEventListener('click', () => {
        modalBackground.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    // 모달 닫기 - 배경 클릭
    modalBackground.addEventListener('click', (event: MouseEvent) => {
        if (event.target === modalBackground) {
            modalBackground.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });
};

export const filledModalInfo = (storage: StarRatingStore, movie: Movie) => {
    currentMovieId = movie.id;
    const modalPoster = getElement('#modalPoster') as HTMLImageElement;
    showBackgroundMovieInfo(movie);
    modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    getElement('#modalTitle').textContent = movie.title;
    getElement('#modalCategory').textContent =
        `${movie.release_date.slice(0, 4)} · ${movie.genres.map((g) => g.name).join(', ')}`;
    getElement('#modalRate').textContent = String(movie.vote_average.toFixed(1));
    getElement('#modalDetail').textContent = movie.overview;

    const savedRate = storage.get(movie.id);
    updateMyStarRate(savedRate ?? '0');
};

export const bindClickStarEvent = (storage: StarRatingStore) => {
    // 별점 클릭 - 한 번만 등록
    const emptyStars = document.querySelectorAll<HTMLElement>('.star-icon');
    emptyStars.forEach((star: HTMLElement) => {
        star.addEventListener('click', () => {
            const starValue = star.dataset.value;
            storage.set(currentMovieId, starValue ?? '');
            updateMyStarRate(starValue ?? '');
        });
    });
};
