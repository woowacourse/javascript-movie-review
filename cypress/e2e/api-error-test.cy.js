describe('API에서 에러가 발생하는 경우 테스트', () => {
  it('서버 에러가 발생하면 toast를 띄운다', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      },
    );

    cy.visit('/');

    cy.contains('서버 에러').should('exist');
  });
});
