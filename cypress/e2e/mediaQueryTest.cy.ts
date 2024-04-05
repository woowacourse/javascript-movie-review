describe('반응형 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('화면의 너비를 390px로 조정하면 2열의 인기 영화 목록을 볼 수 있다.', () => {
    cy.viewport(390, 800);

    cy.get('#item-list').should('have.css', 'display', 'grid');
    cy.get('#item-list').invoke('css', 'grid-template-columns').should('eq', '122.76px 122.76px');
  });

  it('화면의 너비를 834px로 조정하면 3열의 인기 영화 목록을 볼 수 있다.', () => {
    cy.viewport(834, 1024);

    cy.get('#item-list').should('have.css', 'display', 'grid');
    cy.get('#item-list')
      .invoke('css', 'grid-template-columns')
      .should('eq', '172.167px 172.167px 172.167px');
  });

  it('화면의 너비를 1280px로 조정하면 4열의 인기 영화 목록을 볼 수 있다.', () => {
    cy.viewport(1280, 1024);

    cy.get('#item-list').should('have.css', 'display', 'grid');
    cy.get('#item-list')
      .invoke('css', 'grid-template-columns')
      .should('eq', '200.396px 200.406px 200.396px 200.406px');
  });
});
