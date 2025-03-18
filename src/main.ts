import { SearchBar } from './component/SearchBar.ts';

addEventListener('load', () => {
  const searchBar = new SearchBar();
  if (searchBar.element) {
    document.querySelector('body')?.appendChild(searchBar.element);
  }
});
