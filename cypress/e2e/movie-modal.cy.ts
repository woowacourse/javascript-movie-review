describe('영화 상세 모달 테스트', () => {
  beforeEach(() => {
    cy.interceptPopularMovieAPI();
    cy.interceptMovieDetailAPI();
    cy.visit('/');
    cy.get('.movie-detail-button').eq(5).click();
  });

  it('영화를 클릭하면 모달이 뜬다.', () => {
    cy.get('dialog').should('be.visible');
  });

  // it('별을 클릭하면 점수를 매길 수 있다.', () => {});

  it('닫기 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('.close-button').click();
    cy.get('dialog').should('not.visible');
  });
});
