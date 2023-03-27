import PageData from '../data/PageData';
import { getFormFields } from '../utils/formData';
import { $, Event } from '../utils/index';
import { resetMovieList, showMovieList } from '../showMovieList';
import { toggle } from '../utils/toggle';
import MovieData from '../data/MovieData';

export function Search() {
  Event.addEvent('submit', '#search-movie-box', async (event) => {
    event.preventDefault();

    if (matchMedia('screen and (max-width: 480px)').matches) {
      if (!checkExistInput()) return;
    }

    const formEl = $('#search-movie-box') as HTMLFormElement;
    const formData = getFormFields(formEl);
    formEl.reset();

    PageData.changePageStatus('search');
    PageData.resetPage();
    PageData.setRecentKeyword(String(formData.keyword));

    resetMovieList();
    MovieData.resetMovieData();

    showMovieList();

    if (matchMedia('screen and (max-width: 480px)').matches) {
      checkExistLogo();
    }
  });

  return `
        <form class="search-box" id="search-movie-box">
          <label>
            <input type="text" class="search-input hidden" placeholder="검색" name="keyword"/>
            <button type="submit" class="search-button ">검색</button>
          </label>
        </form>
     `;
}

function checkExistInput() {
  const inputElem = $('.search-input') as HTMLInputElement;
  const logoImg = $('.logo-img') as HTMLImageElement;

  if (inputElem.classList.contains('hidden')) {
    toggle(inputElem, 'hidden');
    toggle(logoImg, 'hidden');
    return false;
  }
  return true;
}

function checkExistLogo() {
  const logoImg = $('.logo-img') as HTMLImageElement;
  const inputElem = $('.search-input') as HTMLInputElement;

  if (logoImg.classList.contains('hidden')) {
    toggle(logoImg, 'hidden');
    toggle(inputElem, 'hidden');
  }
}
