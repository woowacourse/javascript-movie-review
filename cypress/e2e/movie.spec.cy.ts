import { API, PATH } from "../../src/constants";
const { URL: API_URL } = API;
const { POPULAR_MOVIE } = PATH;

describe("영화관 앱 테스트.", () => {
  const buildMovieUrl = (endpoint: string) => {
    const url = new URL(endpoint, API_URL);

    return new RegExp(`^${url}`);
  };

  const interceptor = (url: () => RegExp, fixture: string) => {
    return [
      {
        method: "GET",
        url: url(),
      },
      {
        fixture: fixture,
      },
    ];
  };

  beforeEach(() => {
    const [movieUrl, popularMovies] = interceptor(
      () => buildMovieUrl(POPULAR_MOVIE),
      "popular-movies.json"
    );

    cy.intercept(movieUrl, popularMovies).as("getPopularMovies");

    const [page2, popularMoviesIn2Page] = interceptor(
      () => /&page=2/,
      "popular-movie-page2.json"
    );

    cy.intercept(page2, popularMoviesIn2Page).as("getPopularMoviePage2");

    const [MovieSearchUrl, searchedMovies] = interceptor(
      () => buildMovieUrl("search/movie"),
      "searched-movies.json"
    );

    cy.intercept(MovieSearchUrl, searchedMovies).as("getSearchedMovies");

    cy.visit("http://localhost:8080/");
  });

  it("API 요청시 성공적으로 응답한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const state = interception.response?.statusCode;
      const movieItems = interception.response?.body.results;

      expect(state).to.equal(200);
      expect(movieItems.length).to.equal(20);
    });
  });

  it("키워드를 검색하면 해당 키워드가 포함된 영화 목록을 보여준다.", () => {
    cy.get("input[name='search-bar']").type("강아지");
    cy.get("#search-bar").submit();

    cy.wait("@getSearchedMovies");

    cy.get(".item-list > li").each((li: HTMLElement) => {
      expect(li).to.contain.text("강아지");
    });

    cy.fixture("searched-movies.json").then((movieInfo) => {
      movieInfo.results.forEach((movie) => {
        cy.get(".item-list > li").should("contain.text", movie.title);
      });
    });
  });

  it("로고를 클릭하면 처음 화면으로 이동한다.", () => {
    cy.get("#logo").click();

    cy.wait("@getPopularMovies");

    cy.get(".item-view > h2").should("contain.text", "지금 인기 있는 영화");
  });
});
