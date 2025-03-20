import { createIntercept } from "../utils/createIntercept";

describe("영화 검색 기능 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: { fixture: "popularMovieData.json" },
    });

    createIntercept({
      id: "getSearchMovieList",
      url: "^https://api.themoviedb.org/3/search/movie*",
      delay: 1000,
      staticResponse: { fixture: "searchMovieData.json" },
    });

    cy.visit("http://localhost:5173/");
  });

  it("검색 기능 테스트 및 더보기 버튼 테스트", () => {
    const searchValue = "짱구";
    expect(cy.get(".skeleton-list").should("exist"));

    // 인기 영화 초기 렌더링
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);
    });

    cy.get(".search-input").type(searchValue);
    cy.get(".search-form").submit();

    expect(cy.get(".skeleton-list").should("exist"));

    // 검색 데이터 요청
    cy.wait("@getSearchMovieList").then((interception) => {
      const searchMovieList = interception.response?.body.results;
      expect(searchMovieList.length).to.equal(20);

      expect(cy.get(".skeleton-list").should("not.exist"));
      expect(cy.get(".item").should("have.length", 20));
      cy.get(".item").each(($item) => {
        expect($item.find(".movie-title").text()).to.include(searchValue);
      });
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
