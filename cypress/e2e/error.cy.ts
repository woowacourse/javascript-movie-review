import { API_ENDPOINT } from '../../src/constants/api/api';

describe('api 통신 중 에러 발생시 에러 컴포넌트 렌더링 테스트', () => {
  const errorScenarios = [
    { statusCode: 404, statusText: 'Not Found' },
    { statusCode: 500, statusText: 'Internal Server Error' },
  ];

  errorScenarios.forEach((scenario) => {
    it(`API에서 ${scenario.statusCode} 에러가 발생하면 ${scenario.statusCode} status를 화면에 보여주는 Error 컴포넌트가 보여진다.`, () => {
      cy.intercept('GET', API_ENDPOINT.POPULAR(), {
        statusCode: scenario.statusCode,
        body: { error: scenario.statusText },
      }).as('fetchMoviesError');

      cy.visitMainPage();

      cy.wait('@fetchMoviesError');

      cy.get('.error-container').should('be.visible');

      cy.get('.error-container .error-title').should('contain', scenario.statusCode);
    });
  });
});
