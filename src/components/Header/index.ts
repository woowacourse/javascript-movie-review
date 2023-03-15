import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';

const Header = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(`
    <header>
      <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    </header>
  `);

  return [$template, $events];
});

export { Header };
