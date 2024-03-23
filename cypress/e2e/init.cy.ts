describe('service init view test', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/ },
      { fixture: 'movie-matched.json' },
    ).as('getMatchedMovies');

    cy.visit('/');
  });

  context('컴포넌트 정상 생성 test', () => {
    it('처음 실행됐을 때, 모든 component가 정상적으로 생성되어야 한다.', () => {
      cy.get('header').should('exist');
      cy.get('header').find('.search-box').should('exist');
      cy.get('main').should('exist');
      cy.get('main').find('.btn').should('exist');
    });
  });

  context('인기 영화 화면을 불러왔는지에 대한 test', () => {
    it('처음 실행됐을 때, 인기있는 영화 화면을 보여준다.', () => {
      cy.get('main').find('h2').should('have.text', '지금 인기있는 영화');
    });
  });
});
