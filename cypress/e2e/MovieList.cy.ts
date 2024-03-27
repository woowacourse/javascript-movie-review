describe("영화 목록 렌더링 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");

    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popularMovies.json",
      }
    );
  });

  it("첫 화면에서 인기 있는 20개의 영화 항목들을 보여준다.", () => {
    cy.get("#movie-list-title").contains("인기 있는 영화").should("exist");
    cy.get("li").should("have.length", 20);
  });

  it("더보기 버튼을 눌렀을 때 다음 20개의 영화 항목들을 보여준다.", () => {
    cy.get("li").should("have.length", 20);
    cy.get("#watch-more-button").contains("더 보기").click();
    cy.get("li").should("have.length", 40);
  });
});
