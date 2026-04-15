import {
    addMovieList,
    addMovieSkeletonUIList,
    removeMovieSkeletonUIList,
    showBackgroundMovieInfo,
} from './view/movieListView.ts';
import { callMovieList } from './events/bindMovieEvent.ts';
import { getUListElement } from './view/getElementView.ts';

import { starRatingStorage } from './storage/StarRatingStorage.ts';

import { bindClickStarEvent, bindMoreMovieEvents, bindSearchEvents } from './events/bindMovieEvent.ts';

export type State = {
    pageNum: number;
    totalPageNum: number;
    searchBarText: string;
};

addEventListener('load', async () => {
    const state: State = {
        pageNum: 1,
        totalPageNum: 0,
        searchBarText: '',
    };

    const movieDisplay = getUListElement('.thumbnail-list');

    addMovieSkeletonUIList(movieDisplay, 20);

    const { results, total_pages } = await callMovieList(state.pageNum, state.searchBarText);

    const movieList = results;
    state.totalPageNum = total_pages;
    removeMovieSkeletonUIList(movieDisplay);

    addMovieList(movieDisplay, movieList);
    showBackgroundMovieInfo(movieList[0]);

    bindSearchEvents(state);
    bindMoreMovieEvents(state);

    bindClickStarEvent(starRatingStorage);
});
