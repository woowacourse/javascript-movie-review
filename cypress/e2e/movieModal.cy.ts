/// <reference types="cypress" />

import { RATING_COMMENTS } from '../constants';

describe('영화 목록 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*/
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:5173');
  });

  it('모달창이 잘 작동하는지 확인을 한다.', () => {
    cy.wait('@getPopularMovies');

    cy.get('.thumbnail-list > li').first().click();
    cy.get('.modal').should('exist');
  });

  describe('모달창 닫기 기능이 잘 작동하는지 확인을 한다.', () => {
    beforeEach(() => {
      cy.wait('@getPopularMovies');

      cy.get('.thumbnail-list > li').first().click();
      cy.get('.modal').should('exist');
    });

    it('모달창 닫기 버튼을 클릭했을 경우 모달창이 닫힌다.', () => {
      cy.get('#closeModal').should('exist').click();

      cy.get('.modal').should('not.exist');
    });

    it('모달창 ESC을 눌렀을 경우 모달창이 닫힌다.', () => {
      cy.get('body').type('{esc}');

      cy.get('.modal').should('not.exist');
    });

    it('모달창 배경을 클릭했을 경우 모달창이 닫힌다.', () => {
      cy.get('body').click(0, 0);

      cy.get('.modal').should('not.exist');
    });
  });

  describe('모달창에 있는 별점이 작동하는지 확인한다.', () => {
    beforeEach(() => {
      cy.wait('@getPopularMovies');

      cy.get('.thumbnail-list > li').first().click();
    });

    it('모달창에 있는 첫번째 별을 클릭한 경우 그에 맞는 코멘트와 점수가 출력된다.', () => {
      cy.get('.rate-box > label').should('exist').eq(0).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[2]);
      cy.get('#rateScore').contains('(2/10)');
    });

    it('모달창에 있는 두번쨰 별을 클릭한 경우 그에 맞는 코멘트와 점수가 출력된다.', () => {
      cy.get('.rate-box > label').should('exist').eq(1).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[4]);
      cy.get('#rateScore').contains('(4/10)');
    });

    it('모달창에 있는 세번째 별을 클릭한 경우 그에 맞는 코멘트와 점수가 출력된다.', () => {
      cy.get('.rate-box > label').should('exist').eq(2).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[6]);
      cy.get('#rateScore').contains('(6/10)');
    });

    it('모달창에 있는 네번째 별을 클릭한 경우 그에 맞는 코멘트와 점수가 출력된다.', () => {
      cy.get('.rate-box > label').should('exist').eq(3).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[8]);
      cy.get('#rateScore').contains('(8/10)');
    });

    it('모달창에 있는 다섯번째 별을 클릭한 경우 그에 맞는 코멘트와 점수가 출력된다.', () => {
      cy.get('.rate-box > label').should('exist').eq(4).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[10]);
      cy.get('#rateScore').contains('(10/10)');
    });

    it('모달창이 닫힌 후 다시 열어도 기존에 별점이 유지해야한다.', () => {
      cy.get('.rate-box > label').should('exist').eq(4).click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[10]);
      cy.get('#rateScore').contains('(10/10)');

      cy.get('body').click(0, 0);
      cy.get('.modal').should('not.exist');
      cy.get('.thumbnail-list > li').first().click();

      cy.get('#rateScoreText').contains(RATING_COMMENTS[10]);
      cy.get('#rateScore').contains('(10/10)');
    });
  });
});
