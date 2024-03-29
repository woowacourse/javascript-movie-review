describe('반응형 UI 테스트', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
    }).as('getPopularMovies');
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d/,
    }).as('getDetailMovie');
    cy.visit('/');
  });

  it('영화 목록 리스트는 viewport의 width가 920px, 740px 기준으로 한 열에 배치되는 영화 개수가 4 -> 3 -> 2 개로 줄어든다.', () => {
    cy.get('.item-list').should('have.css', 'grid-template-columns', '180px 180px 180px 180px');
    cy.viewport(920, 800);
    cy.get('.item-list').should('have.css', 'grid-template-columns', '180px 180px 180px');
    cy.viewport(740, 800);
    cy.get('.item-list').should('have.css', 'grid-template-columns', '140px 140px');
  });
});
