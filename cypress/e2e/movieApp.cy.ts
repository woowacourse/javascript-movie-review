describe('페이지 초기 방문 상태에서의 flow 테스트', () => {
  beforeEach(() => {
    cy.getPopularMovieData();
    cy.getSearchedMovieData();
    cy.visitByDesktop();
  });

  it('메인 로고 클릭 시, 데이터 로딩상태에 따라 스켈레톤 UI를 볼 수 있고, 인기순 영화 목록 20개를 볼 수 있다.', () => {
    cy.clickMainLogo();

    cy.checkSkeletonListShow();
    cy.getMovieCards().should('have.length', 20);
    cy.checkSkeletonListHide();
  });

  it('더보기 버튼 클릭 시, 데이터 로딩상태에 따라 스켈레톤 UI를 볼 수 있고, 기존 영화 목록과 함께 추가된 인기순 영화 20개를 볼 수 있다.', () => {
    cy.clickMoreButton();

    cy.checkSkeletonListShow();
    cy.getMovieCards().should('have.length', 40);
    cy.checkSkeletonListHide();
  });

  it("검색창에 '해리 포터'를 입력하고 enter입력 or 검색버튼을 클릭하면, 데이터 로딩상태에 따라 스켈레톤 UI를 볼 수 있고, 제목에 '해리 포터'가 포함된 영화 목록을 볼 수 있다.", () => {
    cy.get('.search-box').find('input').type('해리 포터');
    cy.get('.search-box').submit();

    cy.checkSkeletonListShow();
    cy.getTitleOfMovieCards().should('contain', '해리 포터');
    cy.checkSkeletonListHide();
  });
});
