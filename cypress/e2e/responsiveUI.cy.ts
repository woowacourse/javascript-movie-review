describe('반응형 UI 테스트', () => {
  beforeEach(() => {
    cy.visit('localhost:8081');
    cy.viewport(1280, 960);
  });

  it('가로 해상도가 410px보다 작아지면 검색 입력창이 사라진다.', () => {
    cy.viewport(400, 960);
    cy.get('.search-input').should('not.be.visible');
  });

  it('가로 해상도가 410px보다 작아졌을 때 검색 버튼을 누르면 입력창이 다시 보인다.', () => {
    cy.viewport(400, 960);
    cy.get('.search-button').click();
    cy.get('.search-input').should('be.visible');
  });

  it('가로 해상도가 410px보다 작아졌다가 410px 이상으로 커졌을 때 입력창이 다시 보인다.', () => {
    cy.viewport(400, 960);
    cy.wait(1000);
    cy.viewport(1280, 960);

    cy.get('.search-input').should('be.visible');
  });
});
