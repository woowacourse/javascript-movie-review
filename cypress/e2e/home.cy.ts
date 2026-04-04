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
        cy.get(".thumbnail").each(($el, index) => {
          cy.wrap($el)
            .should("have.attr", "src")
            .and("include", results[index].poster_path);
        });

        cy.get(".item-rate").each(($el, index) => {
          cy.wrap($el).should("contain", results[index].vote_average);
        });

        cy.get(".item-title").each(($el, index) => {
          cy.wrap($el).should("contain", results[index].title);
        });
      });
  });

  it("더보기 버튼이 있는지 확인", () => {
    cy.get(".thumbnail-add-button").should("exist");
  });
});

describe("더보기 버튼 테스트", () => {
  beforeEach(() => {
    cy.mockPopularMovies(1);
    cy.mockPopularMovies(2);

    cy.visit("/");
  });

  it("버튼 클릭 시 API 호출 확인", () => {
    cy.get(".thumbnail-add-button").click();

    cy.wait("@getPopularMoviesPage2").its("response.body.results").should("be.an", "array");
  });

  it("리스트 안의 요소를 확인", () => {
    let page1Results: Movies[];

    cy.wait("@getPopularMoviesPage1")
      .its("response.body.results")
      .then((results1) => {
        page1Results = results1;
      });

    cy.get(".thumbnail-add-button").click();

    cy.wait("@getPopularMoviesPage2")
      .its("response.body.results")
      .then((results2) => {
        const allResults = [...page1Results, ...results2];

        cy.get(".thumbnail").should("have.length", allResults.length);

        cy.get(".thumbnail").each(($el, index) => {
          cy.wrap($el)
            .should("have.attr", "src")
            .and("include", allResults[index].poster_path);
        });

        cy.get(".item-title").each(($el, index) => {
          cy.wrap($el).should("contain", allResults[index].title);
        });

        cy.get(".item-rate").each(($el, index) => {
          cy.wrap($el).should(
            "contain",
            String(allResults[index].vote_average),
          );
        });
      });
  });
});
