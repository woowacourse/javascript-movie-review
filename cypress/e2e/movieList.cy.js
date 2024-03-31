describe('영화 리스트 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  /*반응형 - 수동 테스트*/
  it('960px 이하가 되면 리스트가 3줄로 바뀐다.', () => {
    cy.viewport(960, 720);
  });
  it('660px 이하가 되면 리스트가 2줄로 바뀐다.', () => {
    cy.viewport(600, 720);
  });

  /*무한 스크롤 테스트*/
  it('20개의 영화를 다보고 스크롤을 더 내리면, 또 다른 20개의 영화가 나온다.', () => {
    cy.clock();
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('.item-box').should('have.length', 20);
    cy.tick(5000);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.get('.item-box').should('have.length', 40);
  });

  /*탑버튼 테스트*/
  it('height가 200px 아래이면 탑 버튼이 생긴다. 탑 버튼을 클릭시 위로 올라간다.', () => {
    cy.clock();
    cy.scrollTo(0, 1000, { duration: 1000 });
    cy.tick(5000);

    cy.get('#top-button').should('be.visible');
    cy.get('#top-button').click();

    cy.window().then(win => {
      cy.wrap(win).its('scrollY').should('eq', 0);
    });
  });
});
