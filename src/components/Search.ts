import PageData from '../data/PageData';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';
import { showMovieList } from '../showMovieList';

export function Search() {
  Event.addEvent('submit', '#search-movie-box', async (event) => {
    console.log('Ddd');

    event.preventDefault();
    console.log('Ddd');
    const formEl = $('#search-movie-box') as HTMLFormElement;
    const formData = getFormFields(formEl);

    PageData.changePageStatus('search');
    PageData.resetPage();

    showMovieList('search', String(formData.keyword));
  });

  // Q. 말씀주신대로 label로 감쌌습니다!
  // 리더기 사용을 위해서 label을 붙이는게 좋다고 판단하여 넣었지만 label안에 text가 없어도 괜찮은 건지 궁금합니다.
  return `
        <form class="search-box" id="search-movie-box">
          <label>
            <input type="text" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button">검색</button>
          </label>
        </form>
     `;
}
