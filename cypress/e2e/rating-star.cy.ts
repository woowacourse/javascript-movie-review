import { MOVIE_IDS } from "../fixtures/constants";

describe("별점 기능 테스트", () => {
  beforeEach(() => {
    cy.setupMovieListTest({ fixture: "popularMovies.json", wait: true });
  });

  it("영화 상세 정보에서 별점을 부여한 후 페이지를 새로고침하면 부여한 별점이 유지된다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.get(".modal-rate-star .star").eq(3).click();
    cy.reload();
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);
    cy.verifyRatingDescription(8);
  });

  it("여러 영화에 각각 다른 별점을 부여하면 모든 영화의 별점이 개별적으로 저장된다.", () => {
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

  it("별점을 변경하면 기존 값이 새로운 값으로 업데이트된다.", () => {
    cy.clickMovieById(MOVIE_IDS.INSIDE_OUT_2);

    cy.selectRating(8);
    cy.verifyRatingDescription(8);

    cy.selectRating(10);
    cy.verifyRatingDescription(10);
  });
});
