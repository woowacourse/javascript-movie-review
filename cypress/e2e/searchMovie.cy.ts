describe("영화 검색 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popular-movie-list.json",
        delay: 2000,
      }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?*",
      },
      {
        fixture: "search-movie-list.json",
        delay: 2000,
      }
    ).as("getMovieListByQuery");

    cy.visit("http://localhost:8080");
    cy.wait("@getPopularMovies");
  });

  context(`"해리" 검색 결과 섹션 테스트`, () => {
    it("검색 결과 섹션은 h2(title), ul(movie list), button(more button)으로 구성된다.", () => {
      cy.get("header > form.search-box > input[name='query']").type("해리");
      cy.get("header > form.search-box").submit();
      cy.wait("@getMovieListByQuery");

      cy.get("main > section.item-view > h2").should("be.visible");
      cy.get("main > section.item-view > ul").should("be.visible");
      cy.get("main > section.item-view > button").should("be.visible");
    });

    it(`검색 결과 섹션의 h2의 텍스트는 ["{query}" 검색 결과]이다.`, () => {
      cy.get("header > form.search-box > input[name='query']").type("해리");
      cy.get("header > form.search-box").submit();

      cy.get("main > section.item-view > h2").contains(`"해리" 검색 결과`);
    });

    it("검색 form을 submit하면, button은 비활성화되고, 20개의 skeleton UI 아이템이 생성된다.", () => {
      cy.get("header > form.search-box > input[name='query']").type("해리");
      cy.get("header > form.search-box").submit();

      cy.get("section.item-view > button").should("have.class", "disabled");
      cy.get(
        "section.item-view > ul > li > a > div.item-card > p.item-title.skeleton"
      ).should("have.length", 20);
    });

    it("검색 form을 submit해서 검색 결과를 불러오면, button은 활성화되고, skeleton UI 아이템이 영화 아이템으로 변한다.", () => {
      cy.get("header > form.search-box > input[name='query']").type("해리");
      cy.get("header > form.search-box").submit();
      cy.wait("@getMovieListByQuery");

      cy.get("section.item-view > button").should("not.have.class", "disabled");
      cy.get("section.item-view > ul > li").should("have.length", 20);
      cy.get(
        "section.item-view > ul > li > a > div.item-card > p.item-title.skeleton"
      ).should("have.length", 0);
    });
  });
});
