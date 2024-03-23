describe('Flow: API 오류가 생긴 경우', () => {
  beforeEach(() => {
    cy.clearAllCookies();
  });

  context('401 에러가 발생했을 때 (Access Token이 잘못된 경우)', () => {
    it('Access Token이 잘못된 경우 "접근 권한이 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { statusCode: 401 },
      );
      cy.visit('/');
      cy.get('main').should('have.text', '접근 권한이 없어요 :(');
    });
  });

  context('404 에러가 발생했을 때 (API url이 잘못된 경우)', () => {
    it('API url이 잘못된 경우 "잘못된 URL로 접근했어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { statusCode: 404 },
      );
      cy.visit('/');
      cy.get('main').should('have.text', '잘못된 URL로 접근했어요 :(');
    });
  });

  context('500 에러가 발생한 경우 (서버에 일시적인 문제가 있을 경우)', () => {
    it('서버에 일시적인 문제가 있을 경우 "서버에 일시적인 문제가 있어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { statusCode: 500 },
      );
      cy.visit('/');
      cy.get('main').should('have.text', '서버에 일시적인 문제가 있어요 :(');
    });
  });

  context('503 에러가 발생한 경우 (서비스를 이용할 수 없는 경우)', () => {
    it('서비스를 이용할 수 없는 경우 "서비스를 이용할 수 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
      cy.intercept(
        { method: 'GET', url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/ },
        { statusCode: 503 },
      );
      cy.visit('/');
      cy.get('main').should('have.text', '서비스를 이용할 수 없어요 :(');
    });
  });
});
