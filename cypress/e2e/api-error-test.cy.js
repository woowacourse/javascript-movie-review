import ERROR_MESSAGE from '../../src/constant/errorMessage.ts';

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

    cy.visitHome();
    cy.verifyToastExists(ERROR_MESSAGE.SERVER_ERROR);
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
    );

    cy.visitHome();
    cy.verifyToastExists(ERROR_MESSAGE.SERVER_ERROR);

    cy.get('#retry-button').click();
    cy.verifyToastNotExists();
    cy.get('.skeleton').should('not.exist');
  });

  it('5번 초과로 비동기 에러가 발생하면 더 이상 요청할 수 없게 제한한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      },
    ).as('fetchMovies');

    cy.visitHome();

    Array.from({ length: 4 }).forEach(() => {
      cy.get('#retry-button').click();
      cy.wait('@fetchMovies');
    });

    cy.get('#retry-button').click();
    cy.verifyToastExists(ERROR_MESSAGE.RETRY_LIMIT_EXCEEDED);
  });
});
