/// <reference types="cypress" />

describe('상세 조회 e2e 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/', {
      fixture: 'detail-movie.json',
    }).as('getDetailMovie');
  });

  it('영화 목록 중 한 가지 영화를 클릭하면, 모달이 열리며 해당 영화에 대한 상세정보를 보여준다.', () => {
    cy.get('.movie-item[data-index="0"]').click();
    cy.get('.modal').should('exist');

    cy.get('.modal-image').should('exist');
    cy.get('.modal-close-btn').click();
    cy.get('.modal').should('not.exist');
  });

  it('상세 조회한 영화 목록에 별점을 매길 수 있다. 모달을 닫고 새로 열어도 별점은 유지된다.', () => {
    cy.get('.movie-item[data-index="0"]').click();
    cy.get('.modal').should('exist');

    cy.get('.modal-rate .flex-row button').should('have.length', 5);

    cy.get('.modal-rate .flex-row button').eq(2).click();

    cy.get('.modal-rate p').first().should('have.text', '보통이에요.');
    cy.get('.modal-rate p').last().should('have.text', '(6/10)');

    cy.get('.modal-rate .flex-row button').eq(4).click();
    cy.get('.modal-rate p').first().should('have.text', '명작이에요.');
    cy.get('.modal-rate p').last().should('have.text', '(10/10)');

    cy.get('.modal-close-btn').click();
    cy.get('.modal').should('not.exist');

    cy.get('.movie-item[data-index="0"]').click();

    cy.get('.modal-rate p').first().should('have.text', '명작이에요.');
    cy.get('.modal-rate p').last().should('have.text', '(10/10)');
  });
});
