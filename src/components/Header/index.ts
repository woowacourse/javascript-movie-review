import { assemble, Event } from '../../core';
import { getFormFields, isFormElement, isStringFields } from '../../utils/common/formData';
import { getElement } from './../../utils/common/domHelper';
import { $ } from './../../utils/common/domHelper';

export interface HeaderProps {
  handleKeyword(keyword: string): void;
}

const Header = assemble<HeaderProps>(({ handleKeyword }) => {
  const $events: Event[] = [
    {
      event: 'submit',
      callback(e) {
        e.preventDefault();
        if (e.target && e.target === $('.search-form') && isFormElement(e.target)) {
          const fields = getFormFields(e.target);

          isStringFields(fields['keyword']) && handleKeyword(fields['keyword']);
        }
      },
    },
  ];

  const $template = getElement(`
    <header>
      <h1><a href="/"><img src="./logo.png" alt="MovieList 로고" /></a></h1>
      <div class="search-box">
        <form class="search-form">
          <input type="text" name="keyword" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </div>
    </header>
  `);

  return [$template, $events];
});

export { Header };
