import { movieDetailFixture, moviesFixture } from "../../test/fixtures";
import { RATING_SCORES, RATING_TEXTS } from "../../src/constants/rating";

describe("영화 별점 기능 테스트", () => {
  const openMovieModal = () => {
    cy.get("#movie-list li").first().click();
    cy.wait("@getMovieDetail");
    cy.get("#modal-background").should("have.class", "active");
  };

  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?page=1&language=ko-KR", {
      statusCode: 200,
      body: {
        page: 1,
        results: [...moviesFixture],
        total_pages: 2,
        total_results: 40,
      },
    }).as("getPopularPage1");

    cy.intercept("GET", "**/movie/640146?language=ko-KR", {
      statusCode: 200,
      body: movieDetailFixture,
    }).as("getMovieDetail");

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
    cy.clearLocalStorage();
  });

  it("모달창에서 별점을 클릭하면 해당 별만큼 채워지고 점수와 평가 문구가 바뀐다", () => {
    openMovieModal();

    cy.get(".movie-rating .stars img").eq(3).click();

    cy.get(".movie-rating .stars img")
      .eq(0)
      .should("have.attr", "src")
      .and("include", "star_filled.png");

    cy.get(".movie-rating .stars img")
      .eq(3)
      .should("have.attr", "src")
      .and("include", "star_filled.png");

    cy.get(".movie-rating .stars img")
      .eq(4)
      .should("have.attr", "src")
      .and("include", "star_empty.png");

    cy.get(".rating-text").should("have.text", RATING_TEXTS[3]);
    cy.get("#rating-value").should("have.text", RATING_SCORES[3]);
  });

  it("별점을 매기고 다시 모달을 열면 이전 별점이 유지된다", () => {
    openMovieModal();

    cy.get(".movie-rating .stars img").eq(3).click();
    cy.get("#close-modal").click();

    openMovieModal();

    cy.get(".rating-text").should("have.text", RATING_TEXTS[3]);
    cy.get("#rating-value").should("have.text", RATING_SCORES[3]);

    cy.get(".movie-rating .stars img")
      .eq(3)
      .should("have.attr", "src")
      .and("include", "star_filled.png");

    cy.get(".movie-rating .stars img")
      .eq(4)
      .should("have.attr", "src")
      .and("include", "star_empty.png");
  });
});
