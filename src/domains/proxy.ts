import MovieContainer from '../components/MovieContainer';
import { generateContainerTitle } from '../components/templates/containerTitle';
import { generateMoreButtonTemplate } from '../components/templates/moreButton';
import { CustomProxy, MovieProxy } from '../types/proxy';

export const proxy: CustomProxy = {
  movie: { list: '', currentPage: 1, query: '' },
};

// const searchMovie = async (target: QueryProxy, value: string) => {
//   target.props = value;

// const instance = new MovieContainer(showMovieContainer({ className: 'item-view', id: 'item-view', query: value }));
// const container = $('#item-view');
// if (container instanceof HTMLElement) {
// const searchedMovieList = (await movieApi.searchMovieList(value, 1)).results;
// const movieItemTemplateList = searchedMovieList
//   .map(movie => generateMovieItemTemplate({ src: movie.poster_path, title: movie.title, score: movie.vote_average }))
//   .join('');
//   instance.renderChild(
//     container,
//     `
// 	<h2>
// 		"${value}" 검색 결과
// 	</h2>
// 	${showMovieList({ className: 'item-list', movieItemTemplateList })}
// 	<button class="btn primary full-width" id="moreButton">
// 		더 보기
// 	</button>
// `
//   );
// }
// };

// const isSearchMovie = (props: string) => props === 'value';

// const queryProxyHandler = {
//   set: (target: QueryProxy, props: string, value: string) => {
//     if (isSearchMovie(props)) {
//       searchMovie(target, value);
//     }

//     return true;
//   },
// };

// const moreButtonProxyHandler = {
//   set: (target: any, props: string, value: string) => {
//     if (props === 'isClick' && value) {
//       target.props = value;

//       const container = $('#item-view');
//       if (container instanceof HTMLElement) {
// if (proxy.query.isSearch) {
// if (proxy.query.value) {
// movieApi.searchMovieList(proxy.query.value, proxy.moreButton.currentPage + 1).then(data => {
//   const results = data.results as any[];
//   const movieItemTemplateList = results
//     .map(item =>
//       showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
//     )
//     .join('');
//   instance.renderChild(
//     container,
//     `<h2>${`"${proxy.query.value}" 검색 결과`}</h2>${showMovieList({
//       className: 'item-list',
//       movieItemTemplateList,
//     })}
// 		<button class="btn primary full-width" id="moreButton">더 보기</button>`
//   );
//   target.currentPage++;
// });
//   }
// } else {
// movieApi.getMoreMovieList(proxy.moreButton.currentPage).then(data => {
// const results = data.results as any[];
// const movieItemTemplateList = results
//   .map(item =>
//     showMovieItemTemplate({ src: item.poster_path, title: item.title, score: item.vote_average })
//   )
//   .join('');
// instance.renderChild(
//   container,
//   `<h2>${
//     proxy.query.value === '' ? '지금 인기 있는 영화' : `"${proxy.query.value}" 검색 결과`
//   }</h2>${showMovieList({
//     className: 'item-list',
//     movieItemTemplateList,
//   })}
// 		<button class="btn primary full-width" id="moreButton">더 보기</button>`
// );
// target.currentPage++;
// });
//   }
// }

// target.props = false;
// }
// return true;
// },
// };

const updateMovieList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;

  MovieContainer.renderContents({
    containerTitle: generateContainerTitle(),
    movieList: value,
    moreButton: generateMoreButtonTemplate(),
  });
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string | number) => {
    if (props === 'list' && typeof value === 'string') {
      updateMovieList(target, props, value);
    }

    if (props === 'currentPage' && typeof value === 'number') {
      target[props] = value;
    }

    return true;
  },
};

export const initProxy = (props: CustomProxy) => {
  proxy.movie = new Proxy(props.movie, movieProxyHandler);
};
