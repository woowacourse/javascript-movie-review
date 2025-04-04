describe("movieList 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 20));
  });

  it("초기에 한 번 스크롤을 하단까지 내리면 영화 목록 API를 호출하여 40개가 목록에 나열되어야 한다.", () => {
    cy.scrollTo("bottom");
    cy.wait(500);

    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 40));
  });
});
