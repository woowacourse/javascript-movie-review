/// <reference types="cypress" />

describe('Fixture를 이용한 초기화면 테스트', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.visit('http://localhost:5173/javascript-movie-review/');

    cy.wait('@getPopularMovies').then((interception) => {
      expect(interception.response!.body.results).to.have.length(20);
    });
  });

  it('초기화면에서 인기 영화 목록이 20개 렌더링 돼야 한다.', () => {
    cy.get('.item').should('have.length', 20);
  });

  it('[무한스크롤] 메인화면에서 하단까지 스크롤 할 경우 20개의 작품이 더 렌더링 돼야 한다.', () => {
    cy.scrollToLoadMovies();
  });

  it('[상세모달] 메인화면에서 Movie Item을 클릭할 경우 상세 모달이 열려야 한다', () => {
    cy.openDetailModal();
  });

  it('[상세모달] esc를 누를 경우 모달이 닫혀야 한다', () => {
    cy.closeDetailModalByESC();
  });

  it('[상세모달] X 아이콘을 누를 경우 모달이 닫혀야 한다', () => {
    cy.closeDetailModalByIcon();
  });

  it('[상세모달] 모달 배경을 누를 경우 모달이 닫혀야 한다', () => {
    cy.closeModalByBackdrop();
  });

  it('[별점 기록] 상세 모달창에서 별점을 기록할 경우, 해당 점수와 점수에 따른 멘트가 렌더링 돼야 한다', () => {
    cy.openDetailModal();
    cy.rateMovie();
  });
});
