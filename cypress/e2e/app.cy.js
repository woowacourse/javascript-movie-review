import { BASE_URL } from '../../src/utils/common';

describe('영화 목록 불러오기 테스트', () => {
  it('실제 외부 API에 요청하여 받아오는 것을 테스트하다', () => {
    cy.visit('http://localhost:8082');
    cy.request('GET', `${BASE_URL}movie/popular?api_key=${Cypress.env('API_KEY')}&language=ko&page=1`).as(
      'moviePopular'
    );

    cy.get('@moviePopular').its('status').should('eq', 200);
    cy.get('@moviePopular').its('body.results').should('have.length', 20);
  });

  it('Fixture 이용하여 테스트하다', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${BASE_URL}movie/popular?api_key=${Cypress.env('API_KEY')}&language=ko&page=1`,
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:8082');

    cy.wait('@getPopularMovies').then(interception => {
      const movieItems = interception.response.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it('영화 클릭 시 모달창이 뜨는지와 첫번째 별을 클릭했을 때 점수가 변하는지 확인한다', () => {
    cy.visit('http://localhost:8082');

    cy.get('#804150').click();
    cy.get('.modal-header > h2').should('have.text', '코카인 베어');

    cy.get('#2').click();
    cy.get('.score-feeling-text').should('have.text', '최악이에요');
  });

  it('스크롤이 바닥에 닿을 시 다음 페이지를 불러오는지 확인한다', () => {
    cy.visit('http://localhost:8082');

    cy.scrollTo('bottom');
    cy.get('movie-item').should('have.length', 40);
  });

  it('검색 결과 목록이 나오는지 확인하는 테스트하다', () => {
    cy.visit('http://localhost:8082');

    cy.get('input').type('범죄도시');
    cy.get('.search-button').click();
    cy.get('movie-item').should('have.length', 9);
  });
});
