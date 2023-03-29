describe('영화 리뷰 어플리케이션 e2e 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('moviePopular');
    cy.visit('http://localhost:8080/');
  });

  it('API 요청을 보냈을 때 정상적으로 응답하는지 확인한다.', () => {
    cy.wait('@moviePopular').then((interception) => {
      const movieItems = interception.response.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it('검색했을 경우 검색 결과가 화면에 보여야 한다.', () => {
    cy.get('.search-box').type('아이언맨');
    cy.get('.search-button').click();
    cy.get('.item-title').first().should('contain', '아이언맨');
  });

  it('API 요청 후 로딩시 skeleton이 화면에 보여야 한다.', () => {
    cy.get('.search-box').type('아이언맨');
    cy.get('.search-button').click();
    cy.get('.item-card').children().first().should('have.class', 'skeleton');
  });

  it('영화 포스터를 클릭했을 때 모달이 보여야 한다.', () => {
    cy.get('.item-card').first().click();
    cy.get('.modal-container').should('not.have.class', 'hidden');
  });

  it('모달 닫기 버튼을 누르면 모달이 닫혀야 한다', () => {
    cy.get('.item-card').first().click();
    cy.get('.modal-close-button').click();
    cy.get('.modal-container').should('have.class', 'hidden');
  });

  it('모달창에서 별점을 줄 수 있고, 모달을 껐다 켜도 별점이 유지되어야 한다.', () => {
    cy.get('.item-card').first().click();
    cy.get('label[for="star4"]').click();
    cy.get('.modal-close-button').click();
    cy.get('.item-card').first().click();
    cy.get('.my-score').should('contain.text', '8');
  });

  it('스크롤을 내리면 추가적인 영화 목록을 볼 수 있다.', () => {
    cy.scrollTo('bottom');
    cy.get('.item-list').children().should('have.length', 40);
  });
});
