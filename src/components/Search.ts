import { togglePageStatus, useSearchedMovie, resetPage } from '../data/useMovie';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';

export function Search() {
  Event.addEvent('submit', '.search-box', async (event) => {
    event.preventDefault();
    togglePageStatus();
    resetPage();

    const formEl = $('.search-box') as HTMLFormElement;
    const formData = getFormFields(formEl);
    const {
      handlers: { handlePageHeader, handleSearchResult },
    } = await useSearchedMovie(String(formData.keyword));

    handlePageHeader();
    handleSearchResult();
  });

  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
