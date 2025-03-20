import { createIntercept } from "../utils/createIntercept";

describe("영화 검색 기능 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      fixtureUrl: "popularMovieData.json",
      delay: 1000,
    });

    createIntercept({
      id: "getSearchMovieList",
      url: "^https://api.themoviedb.org/3/search/movie*",
      fixtureUrl: "searchMovieData.json",
      delay: 1000,
    });

    cy.visit("http://localhost:5173/");
  });

  it("검색 기능 테스트 및 더보기 버튼 테스트", () => {
    expect(cy.get(".skeleton-list").should("exist"));

    // 인기 영화 초기 렌더링
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);
    });

    cy.get(".search-input").type("짱구");
    cy.get(".search-form").submit();

    expect(cy.get(".skeleton-list").should("exist"));

    // 검색 데이터 요청
    cy.wait("@getSearchMovieList").then((interception) => {
      const searchMovieList = interception.response?.body.results;
      expect(searchMovieList.length).to.equal(20);

      expect(cy.get(".skeleton-list").should("not.exist"));
      expect(cy.get(".item").should("have.length", 20));
    });

    // 더보기 버튼 클릭
    cy.get(".more-button").click();

    expect(cy.get(".skeleton-list").should("exist"));

    // 데이터 추가 요청
    cy.wait("@getSearchMovieList").then((interception) => {
      const searchMovieList = interception.response?.body.results;
      expect(searchMovieList.length).to.equal(20);

      expect(cy.get(".skeleton-list").should("not.exist"));
      expect(cy.get(".item").should("have.length", 40));
    });
  });
});
