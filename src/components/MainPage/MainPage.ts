import MovieList from '../MovieList/MovieList';
import { movieListMock } from './../../mock/movieList.mock';

class MainPage {
  constructor() {
    this.render();
  }

  render() {
    const pageBox = document.createElement('div');
    pageBox.classList.add('popular-movie');
    const title = document.createElement('h2');
    title.textContent = '지금 인기있는 영화';
    pageBox.append(title);

    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(pageBox);

    new MovieList(movieListMock);
  }
}

export default MainPage;
