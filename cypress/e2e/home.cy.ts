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

describe("데이터 로딩 시 에러 화면을 띄우고, 다시 시도하기 버튼으로 복구", () => {
  beforeEach(() => {
    cy.getPopularNetworkError();
    cy.visit("/");
    cy.wait("@getPopularNetworkError");
  });

  it("데이터 로딩 시 에러 화면을 띄우고, 다시 시도하기 버튼으로 복구하는 테스트", () => {
    cy.get(".error-thumbnail-container").should("not.have.class", "hidden");
    cy.get(".thumbnail-retry-button").should("be.visible");

    cy.mockPopularMovies(1);

    cy.get(".thumbnail-retry-button").click();
    cy.wait("@getPopularMoviesPage1")
      .its("response.body.results")
      .then((results) => {
        cy.verifyMovieItems(results);
    });

    cy.get(".error-thumbnail-container").should("have.class", "hidden");
  });
});
