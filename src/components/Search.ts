import { getSearchMovie } from '../api/api';

import { publisher } from '../store/publisher';

import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';
import { renderSearchMovieList } from './MovieList';

export function Search(state: publisher) {
  const { isPopular } = state;

  Event.addEvent('submit', '.search-box', async (event) => {
    event.preventDefault();

    state.change({ page: 1 });

    if (isPopular) state.change({ isPopular: false });

    const formEl = $('.search-box') as HTMLFormElement;
    const formData = getFormFields(formEl);
    const searchedKeyword = String(formData.keyword);

    state.change({ keyword: searchedKeyword });

    const { results } = await getSearchMovie(searchedKeyword, state.page + 1);

    renderSearchMovieList(results, state);
  });

  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword" required/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
