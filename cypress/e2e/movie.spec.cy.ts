describe("영화관 앱 테스트.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("스크롤이 바닥에 터치할 때 마다 20개씩 추가된다.", () => {
    // cy.get('#loading-trigger').click();
    cy.get('#loading-trigger').scrollIntoView();
    cy.get(".item-list").children().should("have.length", "40");
    cy.wait(1000);
    cy.get('#loading-trigger').scrollIntoView();
    cy.get(".item-list").children().should("have.length", "60");
    cy.wait(1000);
    cy.get('#loading-trigger').scrollIntoView();
    cy.get(".item-list").children().should("have.length", "80");
  });

  it("키워드를 검색하면 해당 키워드가 포함된 영화 목록을 보여준다.", () => {
    cy.get("#search-input").type("고양이");
    cy.wait(1000);
    cy.get("#search-button").click();
    cy.wait(1000);
    cy.get(".item-list > movie-item > li").each((li: HTMLElement) => {
      expect(li).to.contain.text("고양이");
    });
  });

  it("로고를 클릭하면 처음 화면으로 이동한다.", () => {
    cy.get("#search-input").type("고양이");
    cy.wait(1000);
    cy.get("#search-button").click();
    cy.wait(1000);
    cy.get("#logo").click();
    cy.get(".sub-title > h2").should("contain.text", "지금 인기 있는 영화");
  });

  it("별점을 3점 준다.", () => {
    cy.get('ul.item-list movie-item:first-child').click();
    cy.get('.rating-star:nth-child(3)').click();
    cy.get('#rating-point').should("contain.text", "6");
  });
});
