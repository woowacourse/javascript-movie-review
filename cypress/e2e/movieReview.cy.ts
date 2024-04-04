describe("실제 api를 호출하는 테스트", () => {
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      "?" +
      new URLSearchParams({
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "1",
      });

    cy.request("GET", popularMovieUrl).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });

  it("검색 결과가 존재하지 않을 때 '해당 키워드에 해당하는 영화가 없습니다.' 문구를 띄운다.", () => {
    // when
    cy.get('.search-box input[type="text"]').clear().type(" ");
    cy.get(".search-box .search-button").click();

    // then
    cy.get(".error-message").should(
      "have.text",
      "해당 키워드에 해당하는 영화가 없습니다."
    );
  });

  it("페이지 하단으로 스크롤을 옮기면 다음 영화 리스트 20개를 렌더링한다.", () => {
    // given
    const movieItemCount = 20;
    cy.get(".item-list li").should("have.length", movieItemCount);

    // when
    cy.window().scrollTo("bottom");

    // then
    cy.get(".item-list li").should("have.length", movieItemCount * 2);
  });
});

describe("인터셉터를 사용하는 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("더 불러올 영화가 있는 경우 페이지 하단에 더보기 버튼을 띄운다.", () => {
    // given
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/search*/,
      },
      { fixture: "movie-winter-searched.json" }
    ).as("getPopularMovies");

    // when
    cy.get('.search-box input[type="text"]').clear().type("겨울");
    cy.get(".search-box .search-button").click();

    // then
    cy.get(".more-movies-btn").should("exist");
    cy.get(".max-page-info").should("not.exist");
  });

  it("더 이상 불러올 영화가 없는 경우 더보기 버튼을 제거하고 '목록의 끝에 도달했습니다 🚀' 문구를 띄운다.", () => {
    // given
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/search*/,
      },
      { fixture: "movie-zootopia-searched.json" }
    ).as("getPopularMovies");

    // when
    cy.get('.search-box input[type="text"]').clear().type("주토피아");
    cy.get(".search-box .search-button").click();

    // then
    cy.get(".more-movies-btn").should("not.exist");
    cy.get(".max-page-info").should("have.text", "목록의 끝에 도달했습니다 🚀");
  });
});
