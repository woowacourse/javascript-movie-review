describe('Flow: 영화 리뷰 앱을 처음 실행시킨 경우', () => {
  const POPULAR_MOVIES_REQUEST = {
    method: 'GET',
    url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
  };
  const MATCHED_MOVIES_REQUEST = {
    method: 'GET',
    url: /^https:\/\/api\.themoviedb\.org\/3\/search \/movie*/,
  };

  beforeEach(() => {
    cy.intercept(POPULAR_MOVIES_REQUEST, { fixture: 'movie-popular.json' });
    cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-matched.json' });

    cy.visit('/');
  });

  it('처음 실행됐을 때, 초기 홈 화면을 구성하는 모든 component("header, search-box, main, btn")가 정상적으로 생성되어야 한다.', () => {
    cy.get('header').should('exist');
    cy.get('header').find('.search-box').should('exist');
    cy.get('main').should('exist');
    cy.get('main').find('.btn').should('exist');
  });

  it('처음 실행됐을 때, 인기있는 영화 화면을 보여준다.', () => {
    cy.get('main').find('h2').should('have.text', '지금 인기 있는 영화');
    cy.get('.item-card').eq(1).find('.item-title').should('have.text', '댐즐');
    cy.get('.item-card').should('have.length', 20);
  });
});
