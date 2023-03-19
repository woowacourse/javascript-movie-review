import { BASE_URL } from '../../src/domain/Movies';

describe('영화 목록 불러오기 테스트', () => {
  it('실제 외부 API에 요청하여 받아오는 것을 테스트하다', () => {
    cy.visit('http://localhost:8080');
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

    cy.visit('http://localhost:8080');

    cy.wait('@getPopularMovies').then(interception => {
      const movieItems = interception.response.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it('더보기 버튼을 눌렀을때 영화 목록이 추가되는지 테스트하다', () => {
    cy.visit('http://localhost:8080');

    cy.get('#more-button').click();
    cy.get('movie-item').should('have.length', 40);
  });

  it('검색 결과 목록이 나오는지 확인하는 테스트하다', () => {
    cy.visit('http://localhost:8080');

    cy.get('input').type('범죄도시');
    cy.get('.search-button').click();
    cy.get('movie-item').should('have.length', 9);
  });
});
