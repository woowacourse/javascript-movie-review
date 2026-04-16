import { interceptPopularError, interceptPopularPage1 } from "./spec";

describe("처음 앱에 도달했을 때 메인 구성 요소가 렌더링 되는지 테스트", () => {
  beforeEach(() => {
    interceptPopularPage1();
    cy.visit("/");
    cy.wait("@getPopularPage1");
  });

  it("popular-thumbnail-list가 렌더링된다", () => {
    cy.get("#popular-thumbnail-list").should("be.visible");
  });

  it("banner가 렌더링된다", () => {
    cy.get("#background-container").should("be.visible");
  });

  it("logo가 렌더링된다", () => {
    cy.get("#logo").should("be.visible");
  });

  it("search input이 렌더링된다", () => {
    cy.get("#search-input").should("be.visible");
  });
});

describe("처음 앱에 도달했을 때 에러가 발생하는 경우 테스트", () => {
  beforeEach(() => {
    interceptPopularError();
    cy.visit("/");
    cy.wait("@getPopularError");
  });

  it("에러 컨테이너가 렌더링된다", () => {
    cy.get("#error-container").should("be.visible");
  });
});
