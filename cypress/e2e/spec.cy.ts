// describe('E2E테스트', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   describe('목록', () => {
//     it('사용자가 영화 목록 20개를 볼 수 있다.', () => {
//       cy.get('.thumbnail-list > li').should('have.length', 20);
//     });
//   });

//   describe('검색', () => {
//     it('검색어를 입력했을 때 목록이 있다면 목록을 보여준다.', () => {
//       cy.search('짱구');
//       cy.get('.thumbnail-list > li').should('have.length', 20);
//     });
//     it('검색어를 입력했을 때 목록이 없다면 빈 화면을 보여준다.', () => {
//       cy.search('없는제목우아아아아아아');
//       cy.get('.error').contains('검색 결과가 없습니다.').should('exist');
//     });
//   });
// });
