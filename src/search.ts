import { renderFetchSearchMovieItem } from './render.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (app) {
    init();
  }
});

const init = () => {
  let currentPage: number = 1;
  
  const query = new URLSearchParams(window.location.search).get('q');
  const displayElement = document.getElementById('resultTitle');
  const $thumbnailList = document.querySelector('.thumbnail-list');

  if (displayElement) {
    if (query) {
      displayElement.innerText = `"${query}"에 대한 검색 결과입니다.`;
      // 여기서 fetch(`api/search?q=${searchTerm}`) 등을 호출하여 데이터를 가져올 수 있습니다.
    } else {
      displayElement.innerText = '검색어가 없습니다.';
    }
  }

  if (query) {
    try {
      currentPage = 1;
      // input form이 submit 되면 그때 renderFetchSearchMovieItem을 실행한다.
      if ($thumbnailList) {
        const totalPage = renderFetchSearchMovieItem($thumbnailList, query, currentPage);
      }

      const $button = document.querySelector('#more-page-button');
      $button?.addEventListener('click', () => {
        currentPage++;
        if ($thumbnailList) {
          $button?.classList.add('hidden');
          renderFetchSearchMovieItem($thumbnailList, query, currentPage);
        }
      });
    } catch (error) {
      // console.error("데이터 로드 실패:", error);
      alert('검색에 실패했습니다!');
    }
  }
};
