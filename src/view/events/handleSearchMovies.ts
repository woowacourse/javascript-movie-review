import getSearchMovies from '../../api/getSearchMovies';
import { $ } from '../../util/selector';
import { errorUi } from '../errorUi';
import { removeBanner } from '../render/renderBanner';
import { renderMovieList } from '../render/renderMovieList';
import { hideSkeletons, showMovieListSkeletons } from '../render/skeleton/showMovieListSkeletons';

export const handleSearchMovies = async (e: Event) => {
  e.preventDefault();
  try {
    removeBanner();
    const movieList = $('.thumbnail-list');
    movieList?.replaceChildren();

    showMovieListSkeletons();

    const form = $('#searchForm') as HTMLFormElement;
    if (form) {
      const keyword = form.keyword.value;
      const params = {
        page: '1',
        language: 'ko-KR',
        include_adult: 'false',
        query: keyword
      };

      const movieTitle = $('#movieKindTitle');
      const movieTitleText = keyword ? `"${keyword}" 검색 결과` : '지금 인기 있는 영화';
      if (movieTitle) {
        movieTitle.textContent = movieTitleText;
      }

      const response = await getSearchMovies(params);
      renderMovieList(response, keyword);
    }
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};
