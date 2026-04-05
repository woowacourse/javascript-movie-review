import { State } from '../main.ts'
import { HttpError, fetchDefaultMovieList, fetchSearchMovieList } from '../service/movieApi.ts'
import { getElement, getInputElement, getUListElement } from '../view/getElementView.ts'
import {
    addMovieList,
    addMovieSkeletonUIList,
    Movie,
    removeMovieSkeletonUIList,
    showBackgroundMovieInfo,
} from '../view/movieListView.ts'

const callMovieList = async (pageNum: number, searchBarText: string): Promise<Movie[]> => {
    try {
        if (searchBarText === '') {
            return await fetchDefaultMovieList(pageNum)
        } else {
            return await fetchSearchMovieList(pageNum, searchBarText)
        }
    } catch (e) {
        if (e instanceof HttpError) alert('데이터를 불러오지 못했습니다.')
        else alert('네트워크 오류가 발생하였습니다.')
        return []
    }
}

const displayMovieBySearch = async (movieDisplay: HTMLUListElement, state: State) => {
    const searchBar = getInputElement('.search-bar')

    state.searchBarText = searchBar.value
    const background = getElement('.background-container')
    background.hidden = true

    const description = getElement('.page-title')

    let movieList

    if (state.searchBarText === '') {
        background.hidden = false
        state.pageNum = 1
        movieDisplay.replaceChildren()
        addMovieSkeletonUIList(movieDisplay)

        movieList = await callMovieList(state.pageNum, state.searchBarText)

        removeMovieSkeletonUIList(movieDisplay)

        description.textContent = '지금 인기 있는 영화'
    } else {
        movieDisplay.replaceChildren()
        addMovieSkeletonUIList(movieDisplay)

        movieList = await callMovieList(state.pageNum, state.searchBarText)

        removeMovieSkeletonUIList(movieDisplay)

        description.textContent = `'${state.searchBarText}' 검색 결과`

        // 검색 결과가 없을 때
        const searchError = getElement('.search-error-container')

        if (movieList.length === 0) {
            searchError.hidden = false
        } else {
            searchError.hidden = true
        }
    }

    // 영화 20개
    addMovieList(movieDisplay, movieList)
}

export const bindSearchEvents = (state: State) => {
    const movieDisplay = getUListElement('.thumbnail-list')

    // 엔터키 이벤트
    const searchBar = getInputElement('.search-bar')
    searchBar.addEventListener('keydown', async (event) => {
        if (event.isComposing) return

        if (event.key === 'Enter') {
            displayMovieBySearch(movieDisplay, state)
        }
    })

    // 검색 버튼 '클릭'
    const searchBtn = document.querySelector('.search-btn')
    searchBtn?.addEventListener('click', async () => {
        displayMovieBySearch(movieDisplay, state)
    })
}

// 더 보기 버튼
export const bindMoreMovieEvents = (state: State) => {
    const movieDisplay = getUListElement('.thumbnail-list')

    const displayMoreBtn = document.querySelector('.display-more-btn')
    displayMoreBtn?.addEventListener('click', async () => {
        state.pageNum++

        addMovieSkeletonUIList(movieDisplay)

        let movieList
        movieList = await callMovieList(state.pageNum, state.searchBarText)

        // 영화 20개
        removeMovieSkeletonUIList(movieDisplay)
        addMovieList(movieDisplay, movieList)
    })
}

// 포스터 클릭 이벤트
export const bindClickPosterEvent = (state: State) => {
    // 1. 모든 포스터 엘리먼트 가져오기
    const thumbnailBox = getElement('.thumbnail-list')

    thumbnailBox.addEventListener('click', async (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const item = target.closest('.item') as HTMLElement

        const titleElement = item.querySelector('strong')

        // // 아이템이 속한 영화를 찾기
        let movieList

        movieList = await callMovieList(state.pageNum, state.searchBarText)

        const backgroundMovie = movieList.filter((movie: Movie) => movie.title === titleElement?.textContent)[0]
        showBackgroundMovieInfo(backgroundMovie)
    })
}
