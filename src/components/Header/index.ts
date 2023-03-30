import { assemble, Event, useState } from '../../core';
import { getFormFields, isFormElement } from '../../utils/common/formData';
import { isMobile } from '../../utils/common/responsive';
import { getClosest, getElement, isHTMLElement, isHTMLInputElement } from './../../utils/common/domHelper';
import { $ } from './../../utils/common/domHelper';

export interface HeaderProps {
  handleKeyword(keyword: string): void;
}

const Header = assemble<HeaderProps>(({ handleKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const $events: Event[] = [
    {
      event: 'submit',
      callback(e) {
        e.preventDefault();

        const searchInput = $('.search-input');

        if (!isHTMLInputElement(searchInput) || !isFormElement(e.target)) return;
        if (e.target === $('.search-form')) {
          const fields = getFormFields(e.target, ['keyword']);
          const keyword = fields['keyword'];

          setKeyword(keyword);
          handleKeyword(keyword);

          searchInput.classList.add('hidden');
        }
      },
    },
    {
      event: 'click',
      callback(e) {
        const searchInput = $('.search-input');

        if (!getClosest(e.target, '.search-box')) return;
        if (!isHTMLInputElement(searchInput)) return;

        searchInput.classList.remove('hidden');
        searchInput.focus();
      },
    },
  ];

  const $template = getElement(`
    <header>
      <h1><a href="./"><img src="./logo.png" alt="MovieList 로고" /></a></h1>
      <div class="search-box">
        <form class="search-form">
          <input class='search-input hidden' type="text" name="keyword" placeholder="검색" value="${keyword}" />
          <button type=${isMobile ? 'button' : 'submit'} class="search-button">검색</button>
        </form>
      </div>
    </header>
  `);

  return [$template, $events];
});

export { Header };
