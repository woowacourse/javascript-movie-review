describe("초기 진입", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("인기 영화 목록이 표시된다", () => {
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
  });
});

describe("더보기", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("더보기 클릭 시 영화 카드가 추가된다", () => {
    cy.get(".thumbnail-list li")
      .its("length")
      .then((before) => {
        cy.get(".btn-more", { timeout: 8000 }).click();
        cy.get(".thumbnail-list li").should("have.length.greaterThan", before);
      });
  });
});

describe("검색", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("검색어 입력 시 검색 결과가 표시된다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("존재하지 않는 검색어 입력 시 검색 결과 없음이 표시된다", () => {
    cy.intercept("GET", "**/search/movie**", {
      body: { results: [], total_pages: 0 },
    }).as("emptySearch");
    cy.get(".search-input").type("없는영화제목");
    cy.get(".search-form").submit();
    cy.wait("@emptySearch");
    cy.get(".result-none-text").should("have.text", "검색 결과가 없습니다.");
  });
});

describe("홈으로 이동", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");
  });

  it("로고 클릭 시 인기 영화 목록으로 돌아온다", () => {
    cy.get(".logo").click();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("빈 검색어 제출 시 인기 영화 목록으로 돌아온다", () => {
    cy.get(".search-input").clear();
    cy.get(".search-form").submit();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });
});
