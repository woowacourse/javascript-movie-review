describe('앱 실행 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');

    cy.viewport(1536, 960); // Set viewport to 550px x 750px
    cy.viewport('macbook-16');
  });

  context('스크롤을 아래로 내리면', () => {
    it('영화가 추가 로드된다.', () => {
      cy.scrollTo('bottom');
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
      cy.get('input[type="text"]').type('노트북');
      cy.get('.search-button').click();
      cy.get('h1').click();
    });
  });

  context('영화를 클릭하면', () => {
    it('모달창이 등장한다.', () => {
      cy.get('ul li:first').click();
    });
  });

  context('모달창에서 별점을 클릭하면', () => {
    it('점수가 설정된다.', () => {
      cy.get('ul li:first').click();
      cy.get('.vote-star:first').click();
      cy.get('.vote-star:last').click();
    });
  });

  context('모달창을 나가기 위해선', () => {
    it('x버튼을 누르면 된다.', () => {
      cy.get('ul li:first').click();
      cy.get('.back-button').click();
    });

    it('모달 배경을 클릭하면 된다.', () => {
      cy.get('ul li:first').click();
      cy.get('.modal-backdrop').click('top');
    });
  });
});
