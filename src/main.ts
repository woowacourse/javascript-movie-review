import { Button } from './component/button/Button.ts';
import { MovieItem } from './component/movie-item/MovieItem.ts';
import { SearchBar } from './component/search-bar/SearchBar.ts';

addEventListener('load', () => {
  const body = document.querySelector('body');
  const searchBar = new SearchBar();
  const testData: MovieData = {
    title: '테스트 데이터',
    score: 4.5,
    imgUrl: './search-icon.png',
  };
  const movieItem = new MovieItem({ data: testData });

  const button = new Button({ cssType: 'detail', innerText: '테스트 버튼' });
  const loadButton = new Button({ cssType: 'load-more', innerText: '테스트 버튼2' });

  if (searchBar.element && movieItem.element && button.element) {
    body?.appendChild(searchBar.element);
    body?.appendChild(movieItem.element);
    body?.appendChild(button.element);
    body?.appendChild(loadButton.element);
  }
});
