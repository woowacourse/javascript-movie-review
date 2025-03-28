import { createIntercept } from "../utils/createIntercept";

describe("영화 리스트(초기 화면) 테스트", () => {
  beforeEach(() => {
    createIntercept({
      id: "getPopularMovieList",
      url: "^https://api.themoviedb.org/3/movie/popular*",
      delay: 1000,
      staticResponse: { fixture: "popularMovieListData.json" },
    });

    cy.visit("http://localhost:5173/");
  });

  it("인기있는 영화 목록 렌더링 및 더보기 버튼 테스트", () => {
    expect(cy.get(".skeleton-list").should("exist"));

    // 데이터 요청
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);

      expect(cy.get(".skeleton-list").should("not.exist"));
      expect(cy.get(".item").should("have.length", 20));
    });

    // 더보기 버튼 클릭
    cy.get(".more-button").click();

    expect(cy.get(".skeleton-list").should("exist"));

    // 데이터 요청
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);

      expect(cy.get(".skeleton-list").should("not.exist"));
      expect(cy.get(".item").should("have.length", 40));
    });
  });
});
