describe('앱 실행 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.viewport(1536, 960); // Set viewport to 550px x 750px
    cy.viewport('macbook-16');
  });

  context('더 보기 버튼을 클릭하면', () => {
    it('영화가 추가 로드된다.', () => {
      cy.get('.btn').click();
    });
  });

  context('노트북을 검색하면', () => {
    it('노트북과 관련된 영화가 검색된다.', () => {
      cy.get('input[type="text"]').type('노트북');
      cy.get('.search-button').click();
    });
  });

  context('로고를 클릭하면', () => {
    it('인기있는 영화목록으로 이동한다.', () => {
      cy.get('img[alt="MovieList 로고"]').click();
    });
  });
});
