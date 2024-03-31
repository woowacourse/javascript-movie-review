import { VOTE_MESSAGE } from '../../src/consts/message';

describe('검색 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
    const popularMovieItems = cy.get('.item-list > li');
    popularMovieItems.first().click();
  });

  it('처음에는 아무 별도 색칠되어 있지 않고, 점수가 없다는 설명이 뜬다.', () => {
    cy.get('#score-text').should('contain', VOTE_MESSAGE[0]);
    cy.get('.filled-star').should('have.length', 0);
    cy.get('.empty-star').should('have.length', 5);
  });

  it('영화 점수를 2점으로 주면 별 1개가 색칠되고, <최악이에요> 라는 문구가 뜬다.', () => {
    cy.get('[data-score="1"]').click();
    cy.get('#score-text').should('contain', VOTE_MESSAGE[1]);
    cy.get('.filled-star').should('have.length', 1);
    cy.get('.empty-star').should('have.length', 4);
  });

  it('영화 점수를 4점으로 주면 별 2개가 색칠되고, <별로에요> 라는 문구가 뜬다.', () => {
    cy.get('[data-score="2"]').click();
    cy.get('#score-text').should('contain', VOTE_MESSAGE[2]);
    cy.get('.filled-star').should('have.length', 2);
    cy.get('.empty-star').should('have.length', 3);
  });

  it('영화 점수를 6점으로 주면 별 3개가 색칠되고, <보통이에요> 라는 문구가 뜬다.', () => {
    cy.get('[data-score="3"]').click();
    cy.get('#score-text').should('contain', VOTE_MESSAGE[3]);
    cy.get('.filled-star').should('have.length', 3);
    cy.get('.empty-star').should('have.length', 2);
  });

  it('영화 점수를 8점으로 주면 별 4개가 색칠되고, <재미있어요> 라는 문구가 뜬다.', () => {
    cy.get('[data-score="4"]').click();
    cy.get('#score-text').should('contain', VOTE_MESSAGE[4]);
    cy.get('.filled-star').should('have.length', 4);
    cy.get('.empty-star').should('have.length', 1);
  });

  it('영화 점수를 10점으로 주면 별 5개가 색칠되고, <명작이에요> 라는 문구가 뜬다.', () => {
    cy.get('[data-score="5"]').click();
    cy.get('#score-text').should('contain', VOTE_MESSAGE[5]);
    cy.get('.filled-star').should('have.length', 5);
    cy.get('.empty-star').should('have.length', 0);
  });

  it('기존에 매긴 영화 점수가 있다면, 해당 영화 디테일 모달을 열었을 떄 기존 점수가 뜬다.', () => {
    cy.get('[data-score="5"]').click();
    cy.get('.modal-close-button').click();

    const popularMovieItems = cy.get('.item-list > li');
    popularMovieItems.first().click();

    cy.get('#score-text').should('contain', VOTE_MESSAGE[5]);
    cy.get('.filled-star').should('have.length', 5);
    cy.get('.empty-star').should('have.length', 0);
  });
});
