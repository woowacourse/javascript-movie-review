import {
  interceptPopularPage1,
  interceptMovieDetail,
  interceptMovieDetailWithDelay,
} from "./spec";

describe("모달", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("썸네일 클릭 시 모달이 열린다", () => {
    interceptMovieDetail();
    cy.get("li[id^='movie-']").first().click();
    cy.get("#modalBackground").should("not.have.class", "hidden");
  });

  it("모달이 열리면 API 응답 전 스켈레톤이 표시된다", () => {
    interceptMovieDetailWithDelay(500);
    cy.get("li[id^='movie-']").first().click();
    cy.get("#modal-title").should("have.class", "modal-skeleton");
    cy.get("#modal-category").should("have.class", "modal-skeleton");
    cy.get("#modal-rate").should("have.class", "modal-skeleton");
    cy.get("#modal-detail").should("have.class", "modal-skeleton");
  });

  it("API 응답 후 영화 정보가 렌더링된다", () => {
    interceptMovieDetail();
    cy.get("li[id^='movie-']").first().click();
    cy.wait("@getMovieDetail");
    cy.get("#modal-title").should("contain.text", "영화1");
    cy.get("#modal-category")
      .should("contain.text", "2024")
      .and("contain.text", "액션");
    cy.get("#modal-rate").should("contain.text", "8.0");
    cy.get("#modal-detail").should("contain.text", "줄거리1");
  });

  it("API 응답 후 스켈레톤이 제거된다", () => {
    interceptMovieDetail();
    cy.get("li[id^='movie-']").first().click();
    cy.wait("@getMovieDetail");
    cy.get("#modal-title").should("not.have.class", "modal-skeleton");
    cy.get("#modal-category").should("not.have.class", "modal-skeleton");
    cy.get("#modal-rate").should("not.have.class", "modal-skeleton");
    cy.get("#modal-detail").should("not.have.class", "modal-skeleton");
  });

  describe("모달 닫기", () => {
    beforeEach(() => {
      interceptMovieDetail();
      cy.get("li[id^='movie-']").first().click();
      cy.wait("@getMovieDetail");
    });

    it("X 버튼 클릭 시 모달이 닫힌다", () => {
      cy.get("#closeModal").click();
      cy.get("#modalBackground").should("have.class", "hidden");
    });

    it("배경 클릭 시 모달이 닫힌다", () => {
      cy.get("#modalBackground").click({ force: true });
      cy.get("#modalBackground").should("have.class", "hidden");
    });

    it("ESC 키 입력 시 모달이 닫힌다", () => {
      cy.get("body").type("{esc}");
      cy.get("#modalBackground").should("have.class", "hidden");
    });
  });

  describe("별점", () => {
    beforeEach(() => {
      interceptMovieDetail();
      cy.get("li[id^='movie-']").first().click();
      cy.wait("@getMovieDetail");
    });

    it("별을 클릭하면 해당 별까지 채워진다", () => {
      cy.get("#modal-my-rate-star-3").click();
      cy.get("#modal-my-rate-star-1")
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get("#modal-my-rate-star-2")
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get("#modal-my-rate-star-3")
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get("#modal-my-rate-star-4")
        .should("have.attr", "src")
        .and("include", "star_empty");
      cy.get("#modal-my-rate-star-5")
        .should("have.attr", "src")
        .and("include", "star_empty");
    });

    it("별을 클릭하면 별점 레이블이 변경된다", () => {
      cy.get("#modal-my-rate-star-3").click();
      cy.get("#modal-rate-review").should("contain.text", "보통이에요");
      cy.get("#modal-rate-points").should("contain.text", "6/10");
    });

    it("모달을 닫고 다시 열어도 별점이 유지된다", () => {
      cy.get("#modal-my-rate-star-4").click();
      cy.get("#closeModal").click();

      interceptMovieDetail();
      cy.get("li[id^='movie-']").first().click();
      cy.wait("@getMovieDetail");

      cy.get("#modal-my-rate-star-1")
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get("#modal-my-rate-star-4")
        .should("have.attr", "src")
        .and("include", "star_filled");
      cy.get("#modal-my-rate-star-5")
        .should("have.attr", "src")
        .and("include", "star_empty");
    });
  });
});
