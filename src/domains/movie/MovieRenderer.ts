import { getMovies, searchMovies } from "../../api/services/movie";
import { MoviesResponse } from "../../api/types/movie/response";
import { handleApiResponse } from "../../api/utils/handlers";
import Main from "../../components/layout/Main";
import { store } from "../../stores";
import InfiniteScroll from "../InfiniteScroll";
import {
  isLastPage,
  updateHeaderWithFirstMovie,
  updateMovieStore,
} from "../movieHelpers";

export default class MovieRenderer {
  private static instance: MovieRenderer;
  private infiniteScroll = InfiniteScroll.getInstance();
  private main = Main.getInstance();
  // 싱글톤인데 private 변수로 해줄 필요가 있을까?
  // 이럴거면 main도 추가해야 하는데?
  // 그리고 이걸 클래스를 굳이 묶어줄 필요가 있을까?
  // 그냥 클래스로 하나 묶어준 느낌밖에 없어서, 오히려 외부에서 접근할 때 불편함.
  // 그냥 함수만 접근하면 편한데..
  // 그냥 내부 함수들을 나열하는게 낫지 않을까?

  // 렌더링 하는 부분과 무한스크롤 부분을 서로 분리했는데,
  // 무한스크롤 클래스와 서로 사이클이 생김.

  // getGenreList 는 어디에 두어야 할까?
  // 여기에 두기에는, MovieRenderer 라서 그 역할이 맞지 않는 것 같다.

  // movieHelper 함수들을 분리했는데, 너무 여기 services 내부에 있는 파일이 서로 결합도가 높습니다.
  // 그렇다고 이전처럼 그냥 하나의 파일에 모두 넣기에는 좀 그렇다. 이 부분에 있어서 어떻게 해결해야 할지 고민이다.
  // 그냥 일단 store를 하나의 클래스 인스턴스 변수들로 정의해두고, 모든 로직을 한 번에 관리해주는 게 나을까요?
  // 제가 고민인 점은 너무 로직이 서로 얽혀있다는 점입니다.

  static getInstance(): MovieRenderer {
    if (!MovieRenderer.instance) MovieRenderer.instance = new MovieRenderer();
    return MovieRenderer.instance;
  }

  async renderMovies() {
    if (store.searchKeyword === "") await this.renderTotalList();
    else await this.renderSearchList();

    this.main.render();

    if (store.page === 1) this.infiniteScroll.initialize();
  }

  renderTotalList = async () => {
    const moviesResponse = await getMovies({ page: store.page });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        updateMovieStore(data);

        if (isLastPage()) this.infiniteScroll.setHasReachedEnd(true);

        updateHeaderWithFirstMovie();

        this.main.setState({
          movies: store.movies,
          isLoading: false,
        });
      },
      onError: (error) => {
        this.main.setState({
          isLoading: false,
          error: error,
        });
        this.infiniteScroll.setIsLoading(false);
      },
    });
  };

  renderSearchList = async () => {
    updateHeaderWithFirstMovie();

    const moviesResponse = await searchMovies({
      page: store.page,
      title: store.searchKeyword,
    });

    handleApiResponse<MoviesResponse>(moviesResponse, {
      onSuccess: (data) => {
        updateMovieStore(data);

        if (isLastPage()) this.infiniteScroll.setHasReachedEnd(true);

        this.main.setState({
          movies: store.movies,
          isLoading: false,
          error: store.movies.length === 0 ? "검색 결과가 없습니다." : null,
        });
      },
      onError: (error) => {
        this.main.setState({
          isLoading: false,
          error: error,
        });
        this.infiniteScroll.setIsLoading(false);
      },
    });
  };
}
