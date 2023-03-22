import { IMAGES } from '../assets/images';
import MovieContainer from '../components/MovieContainer';
import Button from '../components/shared/Button';
import CardList from '../components/shared/CardList';
import Form from '../components/shared/Form';
import Logo from '../components/shared/Logo';
import { showLogoTemplate } from '../components/templates/logo';
import { showMovieContainer } from '../components/templates/movieContainer';
import { showMovieItemTemplate } from '../components/templates/movieItem';
import { showMovieList } from '../components/templates/movieList';
import { showSearchBoxTemplate } from '../components/templates/searchBox';
import { showMoreButtonTemplate } from '../components/templates/showMoreButton';
import MovieListManager from '../domains/MovieListManager';
import Header from './header/Header';
import Main from './main/Main';

export const pageRender = {
  renderHeader() {
    const header = new Header({
      logo: new Logo(showLogoTemplate({ id: 'logo', src: IMAGES.LOGO, alt: 'MovieList 로고' })),
      searchBox: new Form(
        showSearchBoxTemplate({
          className: 'search-box',
          id: 'search-box',
          inputId: 'search-input',
          placeholder: '검색',
        })
      ),
    });
    header.render();
  },

  async renderMainContents() {
    const movieListManager = MovieListManager.getInstance();
    await movieListManager.fetchMovieList();
    const cardTemplateList = movieListManager
      .getMovieList()
      .map(item => showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average }))
      .join('');

    const main = new Main({
      movieContainer: new MovieContainer(showMovieContainer({ className: 'item-view', id: 'item-view', query: '' })),
      movieList: new CardList(showMovieList({ className: 'item-list', cardTemplateList })),
      moreButton: new Button(showMoreButtonTemplate()),
    });
    main.render();
  },
};
