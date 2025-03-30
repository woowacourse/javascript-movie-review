/// <reference types="cypress" />
import { setupMovieApiMocks } from "./utils";

describe("Fixture를 이용한 E2E 테스트", () => {
  beforeEach(() => {
    setupMovieApiMocks();

    cy.visit("http://localhost:5173");
    cy.viewport(1536, 960);
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

  it("영화 아이템을 클릭하면 모달이 뜨고 해당 영화의 상세 정보가 모달안에 나타난다.", () => {
    cy.get(".thumbnail-list > li:first-child").click();

    cy.get(".modal").should("exist").should("be.visible");

    cy.wait("@getMovieDetail").then((interception) => {
      const movie = interception.response?.body;

      cy.contains(movie.title);
      cy.contains(movie.overview);
      cy.contains(movie.genres.map((genre) => genre.name).join(", "));
      cy.contains(movie.release_date.slice(0, 4));
    });
  });

  it("가장 하단으로 스크롤을 내리면 무한스크롤이 동작한다.", () => {
    cy.get(".search-input").click();
    cy.get(".search-input").type("짱구");
    cy.get(".search-input").type("{enter}");

    cy.get(".thumbnail-list > li").should("have.length.at.least", 20);

    cy.scrollTo("bottom");

    cy.get(".thumbnail-list > li").should("have.length", 35);
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
    cy.get(".info-text-wrap > p").should("contain", "오류가 발생했습니다.");
  });
});
