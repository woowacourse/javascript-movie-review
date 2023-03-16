describe("영화관 앱 테스트.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("더보기를 클릭하면 영화 목록이 20개씩 추가된다.", () => {
    cy.get("#more-button").click();
    cy.get(".item-list").children().should("have.length", "40");
    cy.get("#more-button").click();
    cy.get(".item-list").children().should("have.length", "60");
  });

  it("키워드를 검색하면 해당 키워드가 포함된 영화 목록을 보여준다.", () => {
    cy.get("input[name='search-bar']").type("고양이");
    cy.get("#search-bar").submit();
    cy.get(".item-list > li").each((li: HTMLElement) => {
      expect(li).to.contain.text("고양이");
    });
  });

  it("로고를 클릭하면 처음 화면으로 이동한다.", () => {
    cy.get("#logo").click();
    cy.get(".item-view > h2").should("contain.text", "지금 인기 있는 영화");
  });
});
