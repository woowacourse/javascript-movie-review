describe('헤더 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('뷰포트가 660이상 일 때', () => {
    it('인풋이 열려있다.', () => {
      cy.get('#search-input').should('have.class', 'open');
      cy.get('#search-input').should('is.visible');
    });

    it('버튼이 검색 기능을 한다.', () => {
      cy.get('#search-button').click();
      cy.get('.toast-message').should('be.visible');
    });
  });

  context('뷰포트가 660이하 일 때', () => {
    beforeEach(() => {
      cy.viewport(660, 720);
    });

    context('검색 인풋이 닫혀있을 때', () => {
      it('인풋이 사라진다.', () => {
        cy.get('#search-input').should('not.be.visible');
      });

      it('서치 버튼을 누르면 인풋과 인풋 접는 버튼이 생긴다.', () => {
        cy.get('#search-input').should('not.be.visible');

        cy.get('#search-button').click();
        cy.get('#search-input').should('be.visible');
        cy.get('#logo').should('not.be.visible');
        cy.get('#input-fold-button').should('be.visible');
      });
    });

    context('검색 인풋이 열려있을 때', () => {
      it('인풋 접는 버튼을 누르면 로고가 나타나고, 인풋이 사라진다.', () => {
        cy.get('#search-input').should('not.be.visible');

        cy.get('#search-button').click();
        cy.get('#input-fold-button').click();
        cy.get('#search-input').should('not.be.visible');
        cy.get('#logo').should('be.visible');
      });
    });
  });
});
