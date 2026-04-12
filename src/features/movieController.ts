import { Header } from "./View/Header";
import MovieList from "./View/MovieList";
import MovieDetailModal from "./View/MovieDetailModal.ts";
import { getMoreMovies, getPopularMovies, getSearchMovies, getMovieDetail} from "./movieModel";

const movieList = new MovieList();
const movieDetailModal = new MovieDetailModal();

export async function initialRender(page: number): Promise<void> {
  try {
    Header.clearSearchInput();
    movieList.renderMainTitle("지금 인기 있는 영화");

    movieList.renderSkeleton();
    const data = await getPopularMovies(page);
    Header.clearHeader();
    Header.render(data.results[0]);
    movieList.clearList();
    movieList.renderMovieList(data);
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function renderSearchResults(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    movieList.renderSkeleton();
    movieList.renderMainTitle(`"${searchQuery}" 검색 결과`);

    const data = await getSearchMovies(page, searchQuery);
    Header.clearHeader();
    Header.renderSearch();

    if (data.results.length === 0) {
      movieList.showEmpty();
    } else {
      movieList.clearList();
      movieList.renderMovieList(data);
    }

    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

export async function renderMoreMovies(
  page: number,
  searchQuery: string,
): Promise<void> {
  try {
    const data = await getMoreMovies(page, searchQuery);
    movieList.renderMovieList(data);
    movieList.updateMoreButton(data.total_pages, page);
  } catch (error) {
    if (error instanceof Error) movieList.renderError(error.message);
  }
}

// 영화 상세 정보 API를 요청하여 영화 상세 정보 모달을 렌더링하는 함수
export async function renderMovieDetailModal(id: number){
  try{
    movieDetailModal.reset();
    // 영화 상세 정보 API 요청
    const data = await getMovieDetail(id);
    // 영화 상세 정보 모달 렌더링 함수 호출
    movieDetailModal.render(data);
    movieDetailModal.open();
  }catch(error){
    if (error instanceof Error) movieList.renderError(error.message);
  }
}