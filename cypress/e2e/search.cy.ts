export const LOAD_MORE_BTN = "button.primary.full-width";

describe("영화 검색", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*", { fixture: "popular.json" }).as(
      "getPopular",
    );
    cy.visit("/");
    cy.wait("@getPopular");
  });

  context("검색 결과가 있는 경우", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/search/movie*", {
        fixture: "search-avatar.json",
      }).as("searchMovies");
    });

    it("검색어를 입력하고 엔터를 누르면 검색 결과가 렌더링된다", () => {
      cy.get("input[type='text']").type("아바타{enter}");
      cy.wait("@searchMovies");

      cy.get(".thumbnail-list li").should("have.length", 20);
    });

    it("검색 후 타이틀이 검색어를 포함하도록 변경된다", () => {
      cy.get("input[type='text']").type("아바타{enter}");
      cy.wait("@searchMovies");

      cy.get(".main-title").should("contain.text", "아바타");
    });

    it("검색 후 URL이 /search?query=검색어 로 변경된다", () => {
      cy.get("input[type='text']").type("아바타{enter}");
      cy.wait("@searchMovies");

      cy.url().should("include", "/search");
      cy.url().should("include", "query=%EC%95%84%EB%B0%94%ED%83%80");
    });

    it("검색 결과에서 더 보기 버튼 클릭 시 다음 페이지를 불러온다", () => {
      cy.get("input[type='text']").type("아바타{enter}");
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*page=2*", {
        fixture: "search-avatar.json",
      }).as("searchPage2");

      cy.get(LOAD_MORE_BTN).click();
      cy.wait("@searchPage2");

      cy.get(".thumbnail-list li").should("have.length.greaterThan", 3);
    });
  });

  context("검색 결과가 없는 경우", () => {
    it("검색 결과 없음 메시지가 표시된다", () => {
      cy.intercept("GET", "**/search/movie*", {
        fixture: "search-empty.json",
      }).as("searchEmpty");

      cy.get("input[type='text']").type("존재하지않는영화xyz{enter}");
      cy.wait("@searchEmpty");

      cy.get(".no-search-result").should("be.visible");
      cy.get(".no-search-result").should(
        "contain.text",
        "검색 결과가 없습니다.",
      );
    });

    it("검색 결과가 없으면 영화 카드가 표시되지 않는다", () => {
      cy.intercept("GET", "**/search/movie*", {
        fixture: "search-empty.json",
      }).as("searchEmpty");

      cy.get("input[type='text']").type("존재하지않는영화xyz{enter}");
      cy.wait("@searchEmpty");

      cy.get(".thumbnail-list").should("not.exist");
    });
  });

  context("엣지 케이스", () => {
    it("공백만 입력하면 검색 요청이 발생하지 않는다", () => {
      cy.intercept("GET", "**/search/movie*").as("searchMovies");

      cy.get("input[type='text']").type("   {enter}");

      cy.get("@searchMovies.all").should("have.length", 0);
    });

    it("검색 후 다시 검색하면 이전 결과가 새 결과로 교체된다", () => {
      cy.intercept("GET", "**/search/movie*", {
        fixture: "search-avatar.json",
      }).as("firstSearch");

      cy.get("input[type='text']").type("아바타{enter}");
      cy.wait("@firstSearch");
      cy.get(".thumbnail-list li").should("have.length", 20);

      cy.intercept("GET", "**/search/movie*", {
        fixture: "search-empty.json",
      }).as("secondSearch");

      cy.get("input[type='text']").clear().type("없는영화{enter}");
      cy.wait("@secondSearch");

      cy.get(".thumbnail-list").should("not.exist");
      cy.get(".no-search-result").should("be.visible");
    });
  });
});
