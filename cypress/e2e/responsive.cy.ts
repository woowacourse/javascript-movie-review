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

  it('영화 상세보기 모달은 viewport의 width가 750px, 400px 기준으로 크기가 변한다.', () => {
    cy.get('.item-card').first().click();
    cy.wait('@getPopularMovies').then(interception => {
      if (interception.response === undefined) return;
      cy.wait('@getDetailMovie').then(() => {
        cy.get('#thumbnail').should('be.visible');
        cy.viewport(750, 800);
        cy.get('#thumbnail').should('not.be.visible');
        cy.viewport(400, 800);
        cy.get('.detail-modal-container').should('have.css', 'inset', '200px 0px 0px');
      });
    });
  });

  it('검색창은 viewport의 width가 400px 기준으로 사라지고 다시 늘리면 검색창이 보여진다.', () => {
    cy.get('#search-input').should('be.visible');
    cy.viewport(400, 800);
    cy.get('#search-input').should('not.be.visible');
    cy.viewport(800, 800);
    cy.get('#search-input').should('be.visible');
  });
});
