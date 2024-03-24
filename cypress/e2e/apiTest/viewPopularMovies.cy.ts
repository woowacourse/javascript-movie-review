describe("[API 테스트]사용자가 인기있는 영화 목록을 조회할 수 있다.", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("사용자가 MovieList서비스에 방문하면 '지금 인기있는 영화' 1 페이지 목록(20개)가 보인다.", () => {
    const popularMovieUrl =
      "https://api.themoviedb.org/3/movie/popular?" +
      new URLSearchParams({
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "1",
      });

    cy.request("GET", popularMovieUrl).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);

    cy.get("ul.item-list").children().should("have.length", 20);
  });

  it("사용자가 '더 보기 버튼'을 누르면 다음 페이지 목록(20개)가 추가로 더 보인다.", () => {
    cy.get(".item-view>button").click();

    const popularMovieUrl =
      "https://api.themoviedb.org/3/movie/popular?" +
      new URLSearchParams({
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "2",
      });

    cy.request("GET", popularMovieUrl).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);

    cy.get("ul.item-list").children().should("have.length", 40);
  });
});
