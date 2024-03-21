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
    ).as('getPopularMovies');

    cy.visit('/');

    cy.contains('다시 요청해주세요.').should('exist');
  });

  it('서버 에러가 발생하면 재요청 버튼을 눌러 다시 api를 불러올 수 있다.', () => {
    let requestCount = 0;

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        requestCount += 1;
        if (requestCount === 1) {
          req.reply({
            statusCode: 500,
            body: { message: 'Internal Server Error' },
          });
        } else {
          req.reply({
            statusCode: 200,
            fixture: 'movie-popular.json',
          });
        }
      },
    ).as('getPopularMovies');

    cy.visit('/');
    cy.contains('다시 요청해주세요.').should('exist');

    cy.get('.retry-button').click();
    cy.contains('다시 요청해주세요.').should('not.exist');
    cy.get('.skeleton').should('not.exist');
  });
});
