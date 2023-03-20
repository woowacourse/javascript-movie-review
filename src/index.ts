import '../css/reset.css';
import '../css/common.css';
import { IMAGES } from './assets/images';
import MovieListManager from './domains/MovieListManager';
import Header from './pages/header/Header';
import Main from './pages/main/Main';
import Logo from './components/shared/Logo';
import { showSearchBoxTemplate } from './components/templates/searchBox';
import { showLogoTemplate } from './components/templates/logo';
import MovieContainer from './components/MovieContainer';
import { showMovieContainer } from './components/templates/movieContainer';
import { showMovieList } from './components/templates/movieList';
import CardList from './components/shared/CardList';
import { showMovieItemTemplate } from './components/templates/movieItem';
import Button from './components/shared/Button';
import { showMoreButtonTemplate } from './components/templates/showMoreButton';
import Form from './components/shared/Form';
import { $ } from './utils/dom';
import { movieApi } from './domains/movieApi';
import { Proxy } from './types/proxy';

const App = {
  state: {
    query: { value: '', isSearch: false },
    moreButton: { isClick: false, currentPage: 1 },
  },
  proxy: {
    query: { value: '', isSearch: false },
    moreButton: { isClick: false, currentPage: 1 },
  },

  init() {
    this.initProxy();
    this.renderHeader();
    this.renderMainContents();
  },

  initProxy() {
    this.proxy.query = new Proxy(this.state.query, {
      set: (target: any, props: string, value: FormDataEntryValue) => {
        if (props === 'value') {
          target.props = value;

          const instance = new MovieContainer(
            showMovieContainer({ className: 'item-view', id: 'item-view', query: value })
          );
          const container = $('#item-view');
          if (container instanceof HTMLElement) {
            movieApi.fetchMovieList({ query: value, currentPage: 1 }).then(data => {
              const results = data.results;
              const cardTemplateList = results
                .map((item: { poster_path: string; title: string; vote_average: number }) =>
                  showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
                )
                .join('');
              instance.renderChild(
                container,
                `
								<h2>"${value}" 검색 결과</h2>${showMovieList({ className: 'item-list', cardTemplateList })}
								<button class="btn primary full-width" id="moreButton">더 보기</button>
								`
              );
            });
          }
        }
        return true;
      },
    });

    this.proxy.moreButton = new Proxy(this.state.moreButton, {
      set: (target: any, props: string, value: FormDataEntryValue) => {
        if (props === 'isClick' && value) {
          target.props = value;

          const instance = new MovieContainer(
            showMovieContainer({ className: 'item-view', id: 'item-view', query: '' })
          );
          const container = $('#item-view');
          if (container instanceof HTMLElement) {
            if (this.proxy.query.isSearch) {
              movieApi.searchMovieList(this.proxy.query.value, this.proxy.moreButton.currentPage + 1).then(data => {
                const results = data.results;
                const cardTemplateList = results
                  .map((item: { poster_path: string; title: string; vote_average: number }) =>
                    showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
                  )
                  .join('');
                instance.renderChild(
                  container,
                  `<h2>${`"${this.proxy.query.value}" 검색 결과`}</h2>${showMovieList({
                    className: 'item-list',
                    cardTemplateList,
                  })}
										<button class="btn primary full-width" id="moreButton">더 보기</button>`
                );
                target.currentPage++;
              });
            } else {
              movieApi.getMoreMovieList(this.proxy.moreButton.currentPage).then(data => {
                const results = data.results;
                const cardTemplateList = results
                  .map((item: { poster_path: string; title: string; vote_average: number }) =>
                    showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
                  )
                  .join('');
                instance.renderChild(
                  container,
                  `<h2>${
                    this.proxy.query.value === '' ? '지금 인기 있는 영화' : `"${this.proxy.query.value}" 검색 결과`
                  }</h2>${showMovieList({
                    className: 'item-list',
                    cardTemplateList,
                  })}
										<button class="btn primary full-width" id="moreButton">더 보기</button>`
                );
                target.currentPage++;
              });
            }
          }

          target.props = false;
        }
        return true;
      },
    });
  },

  renderHeader: function () {
    const header = new Header(
      {
        logo: new Logo(showLogoTemplate({ id: 'logo', src: IMAGES.LOGO, alt: 'MovieList 로고' })),
        searchBox: new Form(
          showSearchBoxTemplate({
            className: 'search-box',
            id: 'search-box',
            inputId: 'search-input',
            placeholder: '검색',
          })
        ),
      },
      this.proxy as Proxy
    );
    header.render();
  },

  renderMainContents: async function () {
    const movieListManager = MovieListManager.getInstance();
    await movieListManager.fetchMovieList();
    const cardTemplateList = movieListManager
      .getMovieList()
      .map(item => showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average }))
      .join('');

    const main = new Main(
      {
        movieContainer: new MovieContainer(showMovieContainer({ className: 'item-view', id: 'item-view', query: '' })),
        movieList: new CardList(showMovieList({ className: 'item-list', cardTemplateList })),
        moreButton: new Button(showMoreButtonTemplate()),
      },
      this.proxy as Proxy
    );
    main.render();
  },
};

const app = App;
app.init();
