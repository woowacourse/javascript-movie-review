describe("searchMovieList 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("유효한 검색어를 입력했을 때 영화 목록에 결과가 나열되어야 한다.", () => {
    cy.get(".search-bar input").type("짱구");
    cy.get(".search-bar").submit();

    const searchMovieItems = cy.get(".thumbnail-list > li");
    expect(searchMovieItems.should("exist"));
  });

  it("유효하지 않은 검색어를 입력했을 때 영화 목록이 비어있어야 한다.", () => {
    cy.get(".search-bar input").type("해리풔퉈");
    cy.get(".search-bar").submit();

    const searchMovieItems = cy.get(".thumbnail-list > li");
    expect(searchMovieItems.should("not.exist"));
  });
});
