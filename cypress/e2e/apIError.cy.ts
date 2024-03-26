describe('Flow: API 오류가 생긴 경우', () => {
  beforeEach(() => {
    cy.clearAllCookies();
  });

  it('Access Token이 잘못된 경우[401 ERROR] "접근 권한이 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.interceptAPI({ type: 'popular', statusCode: 401 });
    cy.visit('/');
    cy.get('main').should('have.text', '접근 권한이 없어요 :(');
  });

  it('API url이 잘못된 경우[404 ERROR] "잘못된 URL로 접근했어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.interceptAPI({ type: 'popular', statusCode: 404 });
    cy.visit('/');
    cy.get('main').should('have.text', '잘못된 URL로 접근했어요 :(');
  });

  it('서버에 일시적인 문제가 있을 경우[500 ERROR] "서버에 일시적인 문제가 있어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.interceptAPI({ type: 'popular', statusCode: 500 });
    cy.visit('/');
    cy.get('main').should('have.text', '서버에 일시적인 문제가 있어요 :(');
  });

  it('서비스를 이용할 수 없는 경우[503 ERROR] "서비스를 이용할 수 없어요 :(" 라는 문구와 함께 fallback screen을 출력한다.', () => {
    cy.interceptAPI({ type: 'popular', statusCode: 503 });
    cy.visit('/');
    cy.get('main').should('have.text', '서비스를 이용할 수 없어요 :(');
  });
});
