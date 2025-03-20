import { createIntercept } from "../utils/createIntercept";

describe("더보기 버튼 렌더링 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: { fixture: "lastPageMovieData.json" },
    });

    createIntercept({
      id: "getSearchMovieList",
      url: "^https://api.themoviedb.org/3/search/movie*",
      delay: 1000,
      staticResponse: { fixture: "lastPageMovieData.json" },
    });

    cy.visit("http://localhost:5173/");
  });

  it("인기 영화 데이터의 총 개수가 20개 이하인 경우 더보기 버튼을 렌더링하지 않는다.", () => {
    expect(cy.get(".skeleton-list").should("exist"));

    // 인기 영화 초기 렌더링
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);
    });

    expect(cy.get(".more-button").should("not.exist"));
  });

  it("검색 결과 데이터의 총 개수가 20개 이하인 경우 더보기 버튼을 렌더링하지 않는다.", () => {
    cy.get(".search-input").type("짱구");
    cy.get(".search-form").submit();

    expect(cy.get(".skeleton-list").should("exist"));

    // 검색 데이터 요청
    cy.wait("@getSearchMovieList").then((interception) => {
      const searchMovieList = interception.response?.body.results;
      expect(searchMovieList.length).to.equal(20);
    });

    expect(cy.get(".more-button").should("not.exist"));
  });
});
