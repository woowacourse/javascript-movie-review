import MovieContainer from '../components/MovieContainer';
import { showMovieContainer } from '../components/templates/movieContainer';
import { showMovieItemTemplate } from '../components/templates/movieItem';
import { showMovieList } from '../components/templates/movieList';
import { Proxy } from '../types/proxy';
import { $ } from '../utils/dom';
import { movieApi } from './movieApi';

export const proxy: Proxy = {
  query: { value: '', isSearch: false },
  moreButton: { isClick: false, currentPage: 1, isSearch: false },
};

export const initProxy = (appProps: Proxy) => {
  proxy.query = new Proxy(appProps.query, {
    set: (target: any, props: string, value: FormDataEntryValue) => {
      if (props === 'value') {
        target.props = value;

        const instance = new MovieContainer(
          showMovieContainer({ className: 'item-view', id: 'item-view', query: value })
        );
        const container = $('#item-view');
        if (container instanceof HTMLElement) {
          movieApi.fetchMovieList({ query: value, currentPage: 1 }).then(data => {
            const results = data.results as any[];
            const cardTemplateList = results
              .map(item =>
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

  proxy.moreButton = new Proxy(appProps.moreButton, {
    set: (target: any, props: string, value: FormDataEntryValue) => {
      if (props === 'isClick' && value) {
        target.props = value;

        const instance = new MovieContainer(showMovieContainer({ className: 'item-view', id: 'item-view', query: '' }));
        const container = $('#item-view');
        if (container instanceof HTMLElement) {
          if (proxy.query.isSearch) {
            if (proxy.query.value) {
              movieApi.searchMovieList(proxy.query.value, proxy.moreButton.currentPage + 1).then(data => {
                const results = data.results as any[];
                const cardTemplateList = results
                  .map(item =>
                    showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
                  )
                  .join('');
                instance.renderChild(
                  container,
                  `<h2>${`"${proxy.query.value}" 검색 결과`}</h2>${showMovieList({
                    className: 'item-list',
                    cardTemplateList,
                  })}
									<button class="btn primary full-width" id="moreButton">더 보기</button>`
                );
                target.currentPage++;
              });
            }
          } else {
            movieApi.getMoreMovieList(proxy.moreButton.currentPage).then(data => {
              const results = data.results as any[];
              const cardTemplateList = results
                .map(item =>
                  showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
                )
                .join('');
              instance.renderChild(
                container,
                `<h2>${
                  proxy.query.value === '' ? '지금 인기 있는 영화' : `"${proxy.query.value}" 검색 결과`
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
};
