/// <reference types="cypress" />

describe("Fixture를 이용한 E2E 테스트", () => {
  beforeEach(() => {
    // 인기 영화 요청 (초기 로딩)
    cy.intercept(
      "GET",
      /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      "GET",
      /^https:\/\/api\.themoviedb\.org\/3\/search\/movie(\?.*)?$/,
      (req) => {
        const url = new URL(req.url);
        const query = url.searchParams.get("query");

        if (query === "짱구") {
          req.reply({ fixture: "movie-search.json" });
        } else if (query === "ㅇㅇㅇㅇㅇ") {
          req.reply({ fixture: "movie-no-result.json" });
        } else {
          req.reply({
            statusCode: 404,
            body: {
              status_message: "서버 오류입니다.",
              status_code: 34,
            },
          });
        }
      }
    ).as("getSearchMovies");

    cy.intercept(
      "GET",
      /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+(\?.*)?$/,
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("appendChild")) {
        return false;
      }
      return true;
    });

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 20개의 영화가 랜더링 되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // Fixture가 정상적으로 불러와졌는지 확인
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);
    });

    // 영화 목록이 정상적으로 20개 렌더링 되는지 확인
    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("영화 검색 기능이 정상적으로 작동해야 한다", () => {
    cy.get(".search-input").type("짱구");
    cy.get(".search-bar").submit();

    cy.wait("@getSearchMovies");

    cy.contains('"짱구" 검색 결과').should("be.visible");
    cy.get(".thumbnail-list > li").should("be.visible");
  });

  it("없는 영화 검색 시 검색 결과 없습니다 페이지가 랜더링 된다.", () => {
    cy.get(".search-input").click();
    cy.get(".search-input").type("ㅇㅇㅇㅇㅇ");
    cy.get(".search-input").type("{enter}");
    cy.wait("@getSearchMovies");
    cy.get(".info-text-wrap > p").should("contain", "검색 결과가 없습니다.");
  });

  it("서버에서 데이터를 못 받을시 에러 페이지가 랜더링 된다.", () => {
    cy.get(".search-input").click();
    cy.get(".search-input").type("에러입니다");
    cy.get(".search-input").type("{enter}");
    cy.wait("@getSearchMovies");
    cy.contains("오류가 발생했습니다");
  });

  it("로고 클릭 시 홈페이지로 돌아가야 한다", () => {
    cy.get(".search-input").type("짱구");
    cy.get(".search-bar").submit();
    cy.wait("@getSearchMovies");

    cy.get(".logo").click();
    cy.wait("@getPopularMovies");

    cy.contains("지금 인기 있는 영화").should("be.visible");
    cy.url().should("not.include", "query=");
  });

  it("영화 아이템 클릭 시 모달이 열려야 한다", () => {
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").first().click();

    cy.wait("@getMovieDetail");

    cy.get(".modal-background.active").should("be.visible");
    cy.get(".modal-description h2").should("be.visible");

    cy.get("#closeModal").click();

    cy.get(".modal-background").should("not.exist");
  });

  it("별점 기능이 정상적으로 작동해야 한다", () => {
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").first().click();
    cy.wait("@getMovieDetail");

    cy.get("#myStars img").eq(2).click();

    cy.get("#myStars img[src='./images/star_filled.png']").should(
      "have.length",
      3
    );

    cy.get(".star_count").should("contain", "(6/10)");

    cy.get("#comment").should("not.be.empty");
  });
  it("스크롤 시 추가 영화가 로드되어야 한다", () => {
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);
    cy.wait(500);

    cy.scrollTo("bottom");

    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").should("have.length", 40);
  });
});
