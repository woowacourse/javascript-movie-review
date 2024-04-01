// describe('더보기 버튼 테스트', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it('더보기 버튼을 누르면 최대 20개씩 목록에 추가되어야 한다.', () => {
//     cy.interceptPopularMovieAPI();
//     cy.get('#see-more-button').click();
//     const popularMovieItems = cy.get('.item-list > li');
//     expect(popularMovieItems.should('have.length', 40));
//   });
// });

describe('무한 스크롤 테스트', () => {
  beforeEach(() => {
    cy.interceptPopularMovieAPI();
    cy.visit('/');
  });

  it('스크롤을 맨 밑까지 하면, 추가적으로 20개의 영화가 표시된다.', () => {
    cy.scrollTo('bottom');
    const popularMovieItems = cy.get('.item-list > li');
    expect(popularMovieItems.should('have.length', 40));
  });
});
