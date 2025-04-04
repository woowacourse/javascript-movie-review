/// <reference types="cypress" />

describe("무한 스크롤 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("무한 스크롤이 최대 페이지 도달 시 더 이상 로드되지 않는지 확인", () => {
    const searchWord = "짱구";

    cy.get(".search-input").type(searchWord);
    cy.get(".search-button").click();

    cy.intercept("GET", "**/search/movie?query=짱구**").as("searchMovies");

    const scrollToBottom = () => {
      cy.scrollTo("bottom");
    };

    const MAXIMUM_PAGE = 2;
    for (let i = 1; i < MAXIMUM_PAGE; i++) {
      scrollToBottom();
    }

    cy.scrollTo("bottom");
    cy.wait(2000);

    cy.get(".thumbnail")
      .its("length")
      .then((initialCount) => {
        cy.scrollTo("bottom");
        cy.wait(2000);
        cy.get(".thumbnail").its("length").should("eq", initialCount);
      });
  });

  it("빈 검색어를 입력했을 떄 ", () => {
    cy.get(".search-button").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("검색어를 입력해주세요.");
    });
  });
});
