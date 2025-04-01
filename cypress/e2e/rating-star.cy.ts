import { MOVIE_IDS } from "../fixtures/constants";

describe("사용자가 영화에 대한 별점을 부여하여 평가를 기록하는 시나리오", () => {
  beforeEach(() => {
    cy.setupMovieListTest({ fixture: "popularMovies.json", wait: true });
  });

  it("영화 관람 후 영화 상세 정보에서 개인적인 평가를 별점으로 기록한다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.selectRating(8);

    cy.reload();

    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.verifyRatingDescription(8);
  });

  it("여러 영화에 각각 다른 별점을 부여하여 개별 별점을 기록한다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.selectRating(8);

    cy.closeModal();

    cy.clickMovieById(MOVIE_IDS.SNOW_WHITE);
    cy.selectRating(10);

    cy.reload();

    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.verifyRatingDescription(8);

    cy.closeModal();

    cy.clickMovieById(MOVIE_IDS.SNOW_WHITE);
    cy.verifyRatingDescription(10);
  });

  it("영화에 대한 평가를 재고하고 싶은 경우 별점을 수정한다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);

    cy.selectRating(8);
    cy.verifyRatingDescription(8);

    cy.selectRating(10);
    cy.verifyRatingDescription(10);
  });
});
