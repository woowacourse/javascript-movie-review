/// <reference types="cypress" />
import { setupMovieApiMocks } from "./utils";

describe("Fixture를 이용한 E2E 테스트", () => {
  beforeEach(() => {
    setupMovieApiMocks();

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

  it("더보기 버튼 클릭 시 20개의 영화가 추가된다.", () => {
    // 첫 번째 API 응답 기다리기
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);

    // 더보기 버튼 클릭
    cy.get(".more-button").should("exist").click();

    // 두 번째 API 응답 기다리기
    cy.wait("@getPopularMovies");

    // 영화 개수가 40개인지 확인
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });

  it("짱구 검색 후 더보기 버튼 클릭시 더보기 버튼이 사라져야한다.", () => {
    cy.get(".search-input").click();
    cy.get(".search-input").type("짱구");
    cy.get(".search-input").type("{enter}");
    cy.wait("@getSearchMovies");
    cy.get(".more-button").should("exist").click();
    cy.get(".more-button").should("not.exist");
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
