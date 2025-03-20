describe("movieList 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 20));
  });

  it("더 보기 버튼을 한 번 누를 경우 영화 목록 API를 호출하여 40개가 목록에 나열되어야 한다.", () => {
    cy.get(".see-more").click();
    cy.wait(500);

    const popularMovieItems = cy.get(".thumbnail-list > li");
    expect(popularMovieItems.should("have.length", 40));
  });
});
