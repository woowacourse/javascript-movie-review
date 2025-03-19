/// <reference types="cypress" />

describe("Fixture를 이용한 테스트", () => {
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
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=Spiderman*/,
      },
      {
        fixture: "movie-search.json",
      }
    ).as("searchMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=%20*/,
      },
      { fixture: "movie-search-nothing.json" }
    ).as("searchNoMovies");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });

  it("인기 영화 목록에서 더 보기 버튼을 클릭하면, 20개씩 추가로 목록에 나열되어야 한다", () => {
    cy.wait("@getPopularMovies").then(() => {
      cy.get("[data-testid='more-button']").click();

      cy.wait("@getPopularMovies").then((interception) => {
        const popularMovies = interception.response?.body.results;
        expect(popularMovies.length).to.equal(20);

        const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
        expect(popularMovieItems.should("have.length", 40));
      });
    });
  });

  it("검색어를 입력한 후 폼을 제출하면, 해당 검색어를 포함하는 영화 목록이 나열되어야 한다", () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMovies").then((interception) => {
      const searchMovies = interception.response?.body.results;
      const filteredMovies = searchMovies.filter((movie: any) =>
        movie.original_title.includes("Spider-Man")
      );

      const searchMoviesItems = cy.get("[data-testid='movie-list'] > li");
      expect(searchMoviesItems.should("have.length", filteredMovies.length));
    });
  });

  it("검색어를 입력한 후 폼을 제출하고, 더 보기 버튼을 클릭하면, 해당 검색어를 포함하는 영화 목록에 20개씩 추가로 나열되어야 한다", () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMovies").then(() => {
      cy.get("[data-testid='more-button']").click();

      cy.wait("@searchMovies").then((interception) => {
        const searchMovies = interception.response?.body.results;
        const filteredMovies = searchMovies.filter((movie: any) =>
          movie.original_title.includes("Spider-Man")
        );

        const searchMoviesItems = cy.get("[data-testid='movie-list'] > li");
        expect(
          searchMoviesItems.should("have.length", filteredMovies.length + 20)
        );
      });
    });
  });

  it("검색어를 입력한 후 폼을 제출하였으나, 검색 결과가 없는 경우 '검색 결과가 없습니다.' 메시지가 나타나야 한다", () => {
    cy.get("[data-testid='search-input']").type(" ");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchNoMovies").then(() => {
      cy.get("[data-testid='no-result-message']").should("exist");
    });
  });
});
