import { setRecentKeyword } from '../hooks/useKeyword';
import { useSearchedMovie } from '../hooks/useMovie';
import { getPage, getPageStatus, POPULAR, resetPage, togglePageStatus } from '../hooks/usePage';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';

export function Search() {
  Event.addEvent('submit', '.search-box', async (event) => {
    event.preventDefault();

    resetPage();

    if (getPageStatus() === POPULAR) togglePageStatus();

    const formEl = $('.search-box') as HTMLFormElement;
    const formData = getFormFields(formEl);
    const searchedKeyword = String(formData.keyword);

    setRecentKeyword(searchedKeyword);

    const {
      handlers: { handlePageHeader, handleSearchResult },
    } = await useSearchedMovie(searchedKeyword, getPage());

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
