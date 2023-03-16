describe("template spec", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("처음 사이트를 방문하면 헤더, 영화 리스트 컨테이너, 더보기 버튼을 렌더링 해야한다.", () => {
    cy.get("header").should("exist");

    cy.get(".item-view").should("exist");

    cy.get(".more").should("exist");
  });

  it("처음 사이트를 방문하면 인기순 영화 데이터 20개가 존재해야 한다.", () => {
    cy.get(".search-title").should("contain", "지금 인기있는 영화");

    cy.get(".item-card:not(.skeleton)").should("have.length", 20);
  });

  it("영화 데이터를 받아오기 전까지 스켈레톤 UI를 렌더링 해야한다.", () => {
    cy.get(".skeleton").should("exist");
  });

  it("더보기 버튼을 누르면 영화 데이터 20개를 추가로 받아서 렌더링 해야 한다.", () => {
    cy.get(".more").click();

    cy.get(".item-card:not(.skeleton)").should("have.length", 40);
  });
});
