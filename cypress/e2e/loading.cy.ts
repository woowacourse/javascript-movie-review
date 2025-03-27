describe("API 요청 로딩 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        req.on("response", (res) => {
          res.setDelay(2000);
        });
      }
    ).as("getPopularMoviesDelayed");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=Spiderman*/,
      },
      (req) => {
        req.on("response", (res) => {
          res.setDelay(2000);
        });
      }
    ).as("searchMoviesDelayed");

    cy.visit("http://localhost:5173");
  });

  it("인기 영화 API 호출 중 로딩 상태 UI가 표시되어야 한다", () => {
    cy.get("[data-testid='movie-list']").within(() => {
      cy.get(".skeleton-item").should("exist");
    });

    cy.wait("@getPopularMoviesDelayed");
    cy.get("[data-testid='movie-list'] > li").should("have.length", 20);
  });

  it("검색 영화 API 호출 중 로딩 상태 UI가 표시되어야 한다", () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.get("[data-testid='movie-list']").within(() => {
      cy.get(".skeleton-item").should("exist");
    });

    cy.wait("@searchMoviesDelayed");
    cy.get("[data-testid='movie-list'] > li").should("have.length", 20);
  });
});
