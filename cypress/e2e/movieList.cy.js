describe('영화 리스트 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  /*리스트 반응형 테스트*/
  context('뷰포트가 960px 이하일 때', () => {
    it(' 리스트가 3줄로 바뀐다.', () => {
      cy.viewport(960, 720);
    });
  });

  context('뷰포트가 600px 이하일 때', () => {
    it(' 리스트가 2줄로 바뀐다.', () => {
      cy.viewport(600, 720);
    });
  });

  context('무한 스크롤 기능 테스트', () => {
    it('20개의 영화를 다보고 스크롤을 더 내리면, 또 다른 20개의 영화가 나온다.', () => {
      cy.clock();
      cy.scrollTo('bottom', { duration: 1000 });
      cy.get('.item-box').should('have.length', 20);
      cy.tick(5000);
      cy.scrollTo('bottom', { duration: 1000 });
    });

    it('더 이상 보여줄 영화가 없으면, 영화가 더 나오지 않는다.', () => {
      const TITLE = '해리포터';
      const MOVIES_LENGH = 8;
      const searchInput = cy.get('#search-input');
      searchInput.type(TITLE);
      cy.get('#search-button').click();

      cy.clock();
      cy.scrollTo('bottom', { duration: 1000 });
      cy.tick(5000);

      cy.get('.item-box').should('have.length', MOVIES_LENGH);

      cy.scrollTo('bottom', { duration: 1000 });
      cy.tick(5000);
      cy.get('.item-box').should('have.length', MOVIES_LENGH);
    });

    it('height가 500px 아래이면 탑 버튼이 생긴다. 탑 버튼을 클릭시 위로 올라간다.', () => {
      cy.clock();
      cy.scrollTo(0, 1000, { duration: 1000 });
      cy.tick(5000);

      cy.get('#top-scroll-button').should('be.visible');
      cy.get('#top-scroll-button').click();

      cy.window().then(win => {
        cy.wrap(win).its('scrollY').should('eq', 0);
      });
    });
  });
});
