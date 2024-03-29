import { MOVIE_API_URL } from '../../src/constants/url';

describe('영화 상세보기 테스트', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie*/,
    }).as('getDetailMovie');
    cy.visit('/');
  });

  it('영화 상세보기 API를 호출하면 해당 영화의 poster_path를 반환해야한다.', () => {
    const movieId = 1011985;
    const params = `/${movieId}?language=ko-KR`;
    const movieDetailUrl = MOVIE_API_URL + params;

    cy.request({
      url: movieDetailUrl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
        accept: 'application/json',
      },
    }).as('detailMovies');

    cy.get('@detailMovies').its('status').should('eq', 200);
    cy.get('@detailMovies').its('body').should('have.a.property', 'poster_path');
  });

  it('쿵푸팬더 4를 클릭하면 쿵푸팬더 4 영화의 상세 정보를 조회할 수 있다.', () => {
    cy.get('.item-card').first().click();
    cy.wait('@getDetailMovie').then(interception => {
      if (interception.response === undefined) return;
      const movieDetailTitle = cy.get('.item-card').first().get('#modal-title');
      expect(movieDetailTitle.should('have.text', '쿵푸팬더 4'));
    });
  });

  it('상세보기 모달에서 해당 영화의 별점을 매길 수 있는데 첫번째 별을 클릭하면 2점을 매기고 최악이예요 텍스트를 출력한다.', () => {
    cy.get('.item-card').first().click();
    cy.wait('@getDetailMovie').then(interception => {
      if (interception.response === undefined) return;
      cy.get('#star-container > img').first().click();
      const score = cy.get('#score-number');
      expect(score.should('have.text', '2'));
      const text = cy.get('#score-text');
      expect(text.should('have.text', '최악이예요'));
    });
  });
});
