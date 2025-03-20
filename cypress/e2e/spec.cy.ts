describe("template spec", () => {
  it("passes", () => {
    cy.visit("localhost:5173");
  });
});

describe("영화 리뷰 페이지 테스트", () => {
  describe("인기 있는 영화", async () => {
    it("처음 페이지에 접속하면 20개의 영화 목록이 보인다.", () => {
      cy.visit("localhost:5173");
      cy.get(".item").should("have.length", 20);
    });

    it("더보기 버튼을 누르면 20개의 영화가 추가된다.", () => {
      cy.visit("localhost:5173");
      cy.get(".add-more-button").click();
      cy.get(".item").should("have.length", 40);
    });
  });
  describe("영화 검색", () => {
    it("검색 키워드를 입력하면 관련 영화가 최대 20개 보인다.", () => {
      cy.visit("localhost:5173");
      cy.get("#search-input").type("spider");
      cy.get(".search-button").click();
      cy.get(".item").should("have.length", 20);
    });

    it("검색 결과가 없으면 관련 UI를 보여준다.", () => {
      cy.visit("localhost:5173");
      cy.get("#search-input").type("크하하하");
      cy.get(".search-button").click();
      cy.get(".empty-search-result-container").should("exist");
    });
  });

  describe("스켈레톤 UI 테스트", () => {
    it("api 요청이 완료되기 전에는 스켈레톤 UI가 보인다.", () => {
      cy.visit("localhost:5173");
      cy.get(".skeleton-item").should("exist");
    });
  });
});
