import { interceptMovieDetail, interceptPopularPage1 } from "./spec";

const openModal = () => {
  interceptMovieDetail();
  cy.get("#main-thumbnail-list li").first().click();
  cy.wait("@getMovieDetail");
};

describe("초기 내 별점 렌더링 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("별점을 등록하지 않은 상태에서는 빈 별 5개가 렌더링된다", () => {
    openModal();
    cy.get("#rate-button-container button").should("have.length", 5);
    cy.get("#rate-button-container img[src*='star_empty']").should(
      "have.length",
      5,
    );
  });

  it("별점을 등록하지 않은 상태에서는 '별점을 남겨주세요' 문구가 표시된다", () => {
    openModal();
    cy.get("#my-rate .comment").should("contain.text", "별점을 남겨주세요");
  });

  it("별점을 등록하지 않은 상태에서 점수는 (0/10)이다", () => {
    openModal();
    cy.get("#my-rate .score").should("contain.text", "(0/10)");
  });
});

describe("별점 등록 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("세 번째 별을 클릭하면 채워진 별 3개와 빈 별 2개가 렌더링된다", () => {
    openModal();
    cy.get("#rate-button-container button").eq(2).click();

    cy.get("#rate-button-container img[src*='star_filled']").should(
      "have.length",
      3,
    );
    cy.get("#rate-button-container img[src*='star_empty']").should(
      "have.length",
      2,
    );
  });

  it("세 번째 별을 클릭하면 '보통이에요' 문구가 표시된다", () => {
    openModal();
    cy.get("#rate-button-container button").eq(2).click();

    cy.get("#my-rate .comment").should("contain.text", "보통이에요");
  });

  it("세 번째 별을 클릭하면 점수가 (6/10)으로 표시된다", () => {
    openModal();
    cy.get("#rate-button-container button").eq(2).click();

    cy.get("#my-rate .score").should("contain.text", "(6/10)");
  });
});

describe("별점 수정 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("별점을 등록한 후 다른 별을 클릭하면 별점이 수정된다", () => {
    openModal();
    cy.get("#rate-button-container button").eq(2).click();
    cy.get("#my-rate .comment").should("contain.text", "보통이에요");

    cy.get("#rate-button-container button").eq(4).click();
    cy.get("#rate-button-container img[src*='star_filled']").should(
      "have.length",
      5,
    );
    cy.get("#my-rate .comment").should("contain.text", "명작이에요");
    cy.get("#my-rate .score").should("contain.text", "(10/10)");
  });
});

describe("새로고침 후 별점 불러오기 테스트", () => {
  beforeEach(() => {
    localStorage.clear();
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("별점을 등록한 후 새로고침하면 등록한 별점이 유지된다", () => {
    openModal();
    cy.get("#rate-button-container button").eq(3).click();
    cy.get("#closeModal").click({ force: true });

    cy.reload();
    cy.wait("@getPopularPage1");

    openModal();
    cy.get("#rate-button-container img[src*='star_filled']").should(
      "have.length",
      4,
    );
    cy.get("#my-rate .comment").should("contain.text", "재미있어요");
    cy.get("#my-rate .score").should("contain.text", "(8/10)");
  });
});
