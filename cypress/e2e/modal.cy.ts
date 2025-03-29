/// <reference types="cypress" />

describe("영화 상세 정보 모달 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+\?language=ko-KR$/,
      },
      { fixture: "movie-details.json" }
    ).as("getMovieDetails");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("영화를 클릭하면 상세 정보 모달이 보여지고, 영화 정보가 표시된다.", () => {
    cy.get(".thumbnail-list > li").first().click();
    cy.wait("@getMovieDetails").then((interception) => {
      const movie = interception.response?.body;

      cy.get(".modal").should("be.visible");

      cy.get(".modal h2").should("contain", movie.title);

      const year = movie.release_date.slice(0, 4);
      cy.get(".modal-description").should("contain", year);

      movie.genres.forEach((genre) => {
        cy.get(".modal-description").should("contain", genre.name);
      });

      const avg = movie.vote_average.toFixed(1);
      cy.get(".modal-rate-container").should("contain", avg);

      if (movie.overview) {
        cy.get(".modal-description").should(
          "contain",
          movie.overview.slice(0, 10)
        );
      }

      cy.get(".my-rate .star").should("have.length", 5);
    });
  });

  it("별점을 매길 수 있고, 별점 정보는 로컬 스토리지에 저장된다.", () => {
    cy.get(".thumbnail-list > li").first().click();
    cy.wait("@getMovieDetails").then((interception) => {
      const movie = interception.response?.body;
      const movieId = movie.id;

      cy.get(".my-rate .star").eq(3).click();

      cy.window().then((win) => {
        const ratings = JSON.parse(
          win.localStorage.getItem("userRatings") || "{}"
        );

        expect(ratings).to.have.property(String(movieId));
        expect(ratings[movieId].score).to.equal(8);
      });
    });
  });
});
