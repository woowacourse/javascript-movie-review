describe("전체 플로우 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("더 보기 버튼을 누른 후 검색을 진행하고 다시 홈 화면으로 돌아왔을 때, 영화 목록이 유지된다.", () => {
    cy.get(".see-more").click();
    cy.wait(500);

    cy.get(".search-bar input").type("짱구");
    cy.get(".search-bar").submit();

    cy.get("header .logo").click();

    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 40));
  });
});
