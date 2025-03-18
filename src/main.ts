import { Button } from './component/button/Button.ts';
import MovieGrid from './component/movie-grid/MovieGrid.ts';
import { SearchBar } from './component/search-bar/SearchBar.ts';

addEventListener('load', () => {
  const body = document.querySelector('body');
  const searchBar = new SearchBar();
  const testData: MovieData = {
    title: '테스트 데이터',
    score: 4.5,
    imgUrl: './search-icon.png',
  };

  const movieGrid = new MovieGrid({ movieItems: [testData, testData], gridTitle: '그리드 테스트 제목' });

  const button = new Button({ cssType: 'detail', innerText: '테스트 버튼' });
  const loadButton = new Button({ cssType: 'load-more', innerText: '테스트 버튼2' });

  if (searchBar.element && movieGrid.element && button.element) {
    body?.appendChild(searchBar.element);
    body?.appendChild(movieGrid.element);
    body?.appendChild(button.element);
    body?.appendChild(loadButton.element);
  }
});
