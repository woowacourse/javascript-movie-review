import { statusController } from '../data/PageData';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';
import { showMovieList } from './MovieList';

export function Search() {
  Event.addEvent('submit', '.search-box', async (event) => {
    event.preventDefault();
    const formEl = $('.search-box') as HTMLFormElement;
    const formData = getFormFields(formEl);

    statusController.changePageStatus('search');
    statusController.resetPage();

    showMovieList('search', String(formData.keyword));
  });

  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
