describe('Fixture를 이용한 테스트', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    cy.interceptPopularMovieAPI();
    cy.wait('@getPopularMovies').then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      // 제대로 렌더링이 되었는지 테스트하는 코드
      const popularMovieItems = cy.get('.item-list > li');
      expect(popularMovieItems.should('have.length', 20));
    });
  });
});
