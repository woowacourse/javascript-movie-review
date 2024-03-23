describe('더보기 버튼 test', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.visit('/');
  });

  context('Flow: 인기있는 영화에서 "더보기" 버튼을 누른 경우', () => {
    it('인기있는 영화의 첫 화면에서 20개의 영화 정보를 보여준다.', () => {
      cy.get('.item-card').should('have.length', 20);
    });

    it('초기 인기있는 영화 화면에서 "더보기" 버튼을 클릭한 경우, 로딩이 완료되기 전까지 20개의 movie skeleton UI를 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { fixture: 'movie-popular-2.json', delay: 1000 },
      ).as('getPopularMovies');

      cy.get('.btn').click();
      cy.get('.item-card.skeleton').should('have.length', 20);
    });

    it('초기 인기있는 영화 화면에서 "더보기" 버튼을 클릭한 경우, 2번째 인기영화 결과의 20개를 추가로 보여준다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { fixture: 'movie-popular-2.json', delay: 1000 },
      ).as('getPopularMovies');

      const buttonClick = cy.get('.btn').click();
      cy.get('.item-card.skeleton').should('have.length', 20);

      buttonClick.then(() => {
        cy.get('.item-card.skeleton').should('not.exist');
        cy.get('.item-card').should('have.length', 40);
      });
    });
  });
});
