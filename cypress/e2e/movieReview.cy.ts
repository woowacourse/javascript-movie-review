describe('영화 리뷰 웹앱을 E2E 테스트한다.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport('iphone-xr');
  });

  it('웹페이지에 접속했을 때 인기순 영화 리스트에 20개의 아이템이 렌더링된다.', () => {
    cy.get('.item-list').children('li').should('have.length', 20);
  });

  it('해리포터 라는 키워드를 검색하면 그에 맞는 영화 아이템들이 렌더링된다.', () => {
    cy.get('#keyword').type('해리포터');
    cy.get("button[type='submit']").click();

    cy.get('.item-list').children('li').should('have.length', 8);
  });

  it('영화 제목을 클릭하여 모달 창에서 영화의 상세정보를 조회하고, 모달 창을 닫을 수 있다.', () => {
    cy.get('#603692').click();
    cy.get('.modal-container').children('header').children('h2').should('contain', '존 윅 4');
    cy.get('.modal-close-btn').click();
  });

  it('스크롤을 내려 영화를 20개 더 조회할 수 있다.', () => {
    cy.scrollTo(0, 3200);
    cy.get('.item-list').children('li').should('have.length', 40);
  });
});
