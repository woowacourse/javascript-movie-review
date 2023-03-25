import PageData from '../data/PageData';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';
import { changePageHeader, resetMovieList, showMovieList } from '../showMovieList';

export function Search() {
  Event.addEvent('submit', '#search-movie-box', async (event) => {
    event.preventDefault();
    const formEl = $('#search-movie-box') as HTMLFormElement;
    const formData = getFormFields(formEl);

    PageData.changePageStatus('search');
    PageData.resetPage();
    changePageHeader('search', String(formData.keyword));
    resetMovieList();
    PageData.setRecentKeyword(String(formData.keyword));
    showMovieList();
    console.log('dd');
  });

  return `
        <form class="search-box" id="search-movie-box">
          <label>
            <input type="text" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button">검색</button>
          </label>
        </form>
     `;
}
