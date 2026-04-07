import {
    addMovieList,
    addMovieSkeletonUIList,
    removeMovieSkeletonUIList,
    showBackgroundMovieInfo,
} from './view/movieListView.ts'
import { callMovieList } from './events/bindMovieEvent.ts'
import { getUListElement } from './view/getElementView.ts'

import { bindClickPosterEvent, bindMoreMovieEvents, bindSearchEvents } from './events/bindMovieEvent.ts'

export type State = {
    pageNum: number
    searchBarText: string
}

addEventListener('load', async () => {
    const state: State = {
        pageNum: 1,
        searchBarText: '',
    }

    const movieDisplay = getUListElement('.thumbnail-list')

    addMovieSkeletonUIList(movieDisplay, 20)

    const movieList = await callMovieList(state.pageNum, state.searchBarText)

    removeMovieSkeletonUIList(movieDisplay)

    addMovieList(movieDisplay, movieList)
    showBackgroundMovieInfo(movieList[0])

    bindSearchEvents(state)
    bindMoreMovieEvents(state)

    bindClickPosterEvent()
})
