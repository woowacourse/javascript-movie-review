describe("초기 진입", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("인기 영화 목록이 표시된다", () => {
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
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

describe("에러", () => {
  it("API 실패 시 에러 메시지가 표시된다", () => {
    cy.intercept("GET", "**/movie/popular**", { statusCode: 401 }).as("failedRequest");
    cy.visit("localhost:5173");
    cy.wait("@failedRequest");
    cy.get(".result-none-text").should("be.visible");
  });
});

describe("모달", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("카드 클릭 시 스피너가 표시되다가 상세 정보로 전환된다", () => {
    cy.get(".thumbnail-list li").first().click();
    cy.get(".spinner").should("be.visible");
    cy.get(".modal-description").should("be.visible");
  });
});

describe("별점", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    cy.get(".thumbnail-list li").first().click();
    cy.get(".modal-description").should("be.visible");
  });

  it("별점을 매기기 전에는 평가하기 텍스트가 표시된다", () => {
    cy.get(".rating-label").should("contain.text", "평가하기");
  });

  it("별을 클릭하면 별점 텍스트가 반영된다", () => {
    cy.get(".star-list label").last().click();
    cy.get(".rating-label").should("contain.text", "최악이에요");
  });

  it("새로고침 후에도 별점이 유지된다", () => {
    cy.get(".star-list label").last().click();
    cy.get(".rating-label").should("contain.text", "최악이에요");

    cy.get(".close-modal").click();
    cy.reload();
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
    cy.get(".thumbnail-list li").first().click();
    cy.get(".modal-description").should("be.visible");
    cy.get(".rating-label").should("contain.text", "최악이에요");
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
