import { BASE_URL } from '../../src/constants/api/api';

describe('비동기 호출에 대한 테스트 코드 작성', () => {
  beforeEach(() => {
    cy.visitMainPage();
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const apiKey = Cypress.env('api_key');
    const apiUrl = `${BASE_URL}/movie/popular?language=ko-kr&page=1&api_key=${apiKey}`;

    cy.fetchData(apiUrl);
  });

  it('키워드를 입력하면 그에 맞는 영화 리스트 목록을 보여준다.', () => {
    const searchKeyword = '어벤져스';
    cy.get('.search-form input').type(searchKeyword);
    cy.get('.search-button').click();
    const apiKey = Cypress.env('api_key');
    const apiUrl = `${BASE_URL}/search/movie?api_key=${apiKey}&query=${searchKeyword}&language=ko-kr`;

    cy.fetchData(apiUrl);
  });

  it('빈값을 검색하면 alert창이 뜨고, 화면이 재렌더링되지 않는다.', () => {
    cy.get('.search-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('검색어는 1글자 이상이어야 합니다..');
    });

    cy.get('li').should('have.length', 20);
  });

  it('키워드를 검색하면 스켈레톤 UI가 렌더링됐다가 데이터가 다 받아지면 목록으로 보여준다.', () => {
    const searchKeyword = '어벤져스';
    cy.get('.search-form input').type(searchKeyword);
    cy.get('.search-button').click();

    cy.get('body').then(($body) => {
      if ($body.find('.skeleton').length) {
        cy.get('.skeleton').should('be.visible');
      }
    });

    const apiKey = Cypress.env('api_key');
    const apiUrl = `${BASE_URL}/search/movie?api_key=${apiKey}&query=${searchKeyword}&language=ko-kr`;
    cy.fetchData(apiUrl);

    cy.get('.skeleton').should('not.exist');
  });
});
