import { RATING_SCORES, RATING_TEXTS } from "../../src/constants/rating";
import { movieDetailFixture, moviesFixture } from "../../test/fixtures";
import {
  mockPopularPage,
  mockMovieDetail,
  openMovieModal,
} from "../support/movie";

describe("영화 별점 기능 테스트", () => {
  beforeEach(() => {
    mockPopularPage({
      page: 1,
      results: moviesFixture,
      totalPages: 2,
      totalResults: 40,
    });

    mockMovieDetail(moviesFixture[0].id, movieDetailFixture);

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
