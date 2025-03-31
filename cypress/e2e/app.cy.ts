describe("전체 플로우 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("스크롤을 하단까지 내린 후 검색을 진행하고 다시 홈 화면으로 돌아왔을 때, 영화 목록이 유지된다.", () => {
    cy.get(".thumbnail-list > li").should("have.length", 20);

    cy.scrollTo("bottom");
    cy.wait(500);

    cy.get(".search-bar input").type("짱구");
    cy.get(".search-bar").submit();

    cy.get("header .logo").click();

    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 40));
  });
});
