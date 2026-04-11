describe("홈 화면 테스트", () => {
  beforeEach(() => {
    cy.mockPopularMovies(1);
    cy.visit("/");
  });

  it("API 호출 확인", () => {
    cy.wait("@getPopularMoviesPage1").its("response.body.results").should("be.an", "array");
  });

  it("배너 안의 요소를 확인", () => {
    cy.wait("@getPopularMoviesPage1")
      .its("response.body.results")
      .then((results) => {
        cy.get(".title").should("contain", results[0].title);
        cy.get(".rate-value").should("contain", results[0].vote_average);
        cy.get(".background-container")
          .invoke("css", "background-image")
          .should("include", results[0].poster_path);
      });
  });

  it("리스트 안의 요소를 확인", () => {
    cy.wait("@getPopularMoviesPage1")
      .its("response.body.results")
      .then((results) => {
        cy.verifyMovieItems(results);
      });
  });
});

describe("무한 스크롤 테스트", () => {
  beforeEach(() => {
    cy.mockPopularMovies(1);
    cy.mockPopularMovies(2);

    cy.visit("/");
  });

  it("스크롤 시 API 호출 확인", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(".thumbnail-list li:last-child").scrollIntoView();
    cy.wait("@getPopularMoviesPage2").its("response.body.results").should("be.an", "array");
  });

  it("리스트 안의 요소를 확인", () => {
    let page1Results: Movies[];

    cy.wait("@getPopularMoviesPage1")
      .its("response.body.results")
      .then((results1) => {
        page1Results = results1;
      });

    cy.get(".thumbnail-list li:last-child").scrollIntoView();

    cy.wait("@getPopularMoviesPage2")
      .its("response.body.results")
      .then((results2) => {
        const allResults = [...page1Results, ...results2];
        cy.verifyMovieItems(allResults);
      });
  });
});
