describe("영화 목록 보여주는 주요한 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-search.json" }
    ).as("getSearchMovies");

    cy.visit("http://localhost:8080/");
  });

  it("메인 화면에서 인기있는 영화가 20개씩 목록에 나열되어야 한다", () => {
    const popularMovieItems = cy.get(".item-list > li");
    expect(popularMovieItems.should("have.length", 20));
  });

  context(
    "검색창에 영화 이름을 검색하면 관련 영화 이름과 관련 영화 목록이 나열되어야 한다.",
    () => {
      it("존재하는 영화 이름을 검색하면 해당 영화 목록을 확인할 수 있다", () => {
        const searchTarget = "탕후루판다";
        const input = cy.get("#header__search-box");
        input.type(searchTarget + "\n");

        cy.get("h2").should("have.text", `"${searchTarget}" 검색 결과`);
        const popularMovieItems = cy.get(".item-list > li");
        expect(popularMovieItems.should("have.length.above", 1));
      });

      it("존재하는 영화 이름을 검색한 후 어떤 영화를 검색했는지 텍스트로 확인할 수 있다.", () => {
        const searchTarget = "탕후루판다";
        const input = cy.get("#header__search-box");
        input.type(searchTarget + "\n");

        cy.get("h2").should("have.text", `"${searchTarget}" 검색 결과`);
      });
    }
  );
});
