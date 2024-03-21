describe("네트워크 에러 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-search.json" }
    ).as("getSearchMovies");

    cy.visit("http://localhost:8080/");
  });

  it("첫 화면에서 네트워크 에러가 발생했을 경우 NetworkFallBack을 보여준다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { forceNetworkError: true }
    ).as("getPopularMoviesClientNetworkError");

    const h2 = cy.get("h2");
    h2.contains("오늘부터 인터넷은 내가 지배한다옹~").should("be.visible");
  });

  it("검색 시 첫 화면에서 네트워크 에러가 발생했을 경우 NetworkFallBack을 보여준다", () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { forceNetworkError: true }
    ).as("getSearchMoviesClientNetworkError");

    const searchTarget = "탕후루판다";
    const input = cy.get("#header__search-box");
    input.type(searchTarget + "\n");

    const h2 = cy.get("h2");
    h2.contains("오늘부터 인터넷은 내가 지배한다옹~").should("be.visible");
  });

  it("더보기 버튼을 눌렀을 때 네트워크 에러가 발생하는 경우 NetworkFallBack을 보여준다", () => {
    cy.contains("What Dreams May Come").should("be.visible");
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { forceNetworkError: true }
    ).as("getPopularMoviesClientNetworkError");

    cy.wait("@getPopularMovies").then(() => {});

    const button = cy.get(".item-view button");

    button.click().then(() => {
      cy.on("window:alert", (text) => {
        text.to.contains("네트워크가 잘못되었어요.");
      });
    });
  });
});
