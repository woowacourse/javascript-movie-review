import "./popularMovies.spec";
import "./movieDetailModal.spec";

describe("영화 리뷰 애플리케이션 초기 렌더링 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:8080");

    cy.wait("@getPopularMovies");
  });

  it("처음 사이트를 방문하면 헤더, 영화 리스트 컨테이너, 더보기 버튼을 렌더링 해야한다.", () => {
    cy.get("header").should("exist");

    cy.get(".item-view").should("exist");
  });

  it("처음 사이트를 방문하면 인기순 영화 데이터 20개가 존재해야 한다.", () => {
    cy.get(".search-title").should("contain", "지금 인기있는 영화");

    cy.get(".item-card:not(.skeleton)").should("have.length", 20);
  });

  it("영화 데이터를 받아오기 전까지 스켈레톤 UI를 렌더링 해야한다.", () => {
    cy.get(".skeleton").should("exist");
  });
});
