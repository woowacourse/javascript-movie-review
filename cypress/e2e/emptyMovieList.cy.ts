import { createIntercept } from "../utils/createIntercept";

describe("영화 데이터가 없는 경우 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: { fixture: "emptyMovieData.json" },
    });

    createIntercept({
      id: "getSearchMovieList",
      url: "^https://api.themoviedb.org/3/search/movie*",
      delay: 1000,
      staticResponse: { fixture: "emptyMovieData.json" },
    });

    cy.visit("http://localhost:5173/");
  });

  it("인기 영화가 없는 경우 EmptyList 컴포넌트를 렌더링 한다.", () => {
    expect(cy.get(".skeleton-list").should("exist"));

    // 인기 영화 초기 렌더링
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(0);
    });

    expect(cy.get(".empty-box").should("exist"));
  });

  it("검색 결과가 없는 경우 EmptyList 컴포넌트를 렌더링 한다.", () => {
    cy.get(".search-input").type("훼뤼풔퉈");
    cy.get(".search-form").submit();

    expect(cy.get(".skeleton-list").should("exist"));

    // 검색 데이터 요청
    cy.wait("@getSearchMovieList").then((interception) => {
      const searchMovieList = interception.response?.body.results;
      expect(searchMovieList.length).to.equal(0);
    });

    expect(cy.get(".empty-box").should("exist"));
  });
});
