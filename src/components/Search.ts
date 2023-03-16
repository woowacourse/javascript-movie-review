import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';

export function Search() {
  Event.addEvent('submit', '.search-box', (event) => {
    event.preventDefault();
    const formEl = $('.search-box') as HTMLFormElement;
    const formData = getFormFields(formEl);
  });

  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
