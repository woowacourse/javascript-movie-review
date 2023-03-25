describe('Movie-Review e2e 기능 Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('처음 홈페이지에 들어갔을 때 영화 리스트가 잘 보여야 한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('moviePopular');

    cy.wait('@moviePopular').then((interception) => {
      cy.get('.item-title').first().should('have.text', '장화신은 고양이: 끝내주는 모험');
    });
  });

  it('검색했을 경우 검색 결과가 화면에 보여야 한다.', () => {
    cy.wait(1000);
    cy.get('.search-box').click().type('아이언맨');
    cy.get('.search-button').click();
    cy.get('.item-title').first().should('contain', '아이언맨');
  });

  it('스크롤을 내리면 무한 스크롤이 되어야 한다.', () => {
    cy.scrollTo('bottom');

    cy.get('movie-item').should('have.length', 60);
  });

  it('검색 후에도 무한 스크롤이 되어야 한다.', () => {
    cy.wait(1000);
    cy.get('.search-box').click().type('사랑');
    cy.get('.search-button').click();

    cy.scrollTo('bottom');
    cy.get('movie-item').should('have.length', 60);
  });

  it('헤더의 로고를 클릭했을 때 현재 인기 목록이 나와야 한다.', () => {
    cy.get('.logo').click();

    cy.get('movie-item').should('be.visible');
  });

});

describe('Movie-Review e2e 모달 Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('영화 목록 중 하나를 클릭했을 때 모달이 떠야한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.modal').should('be.visible');
  });

  it('영화 모달에 사진이 잘 나와야 한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.modal-body_left').should('be.visible');
  });

  it('영화 모달에 장르가 잘 나와야 한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.modal-body_right_genreAndstar').should('be.visible');
  });

  it('영화 사용자 별점추가 기능이 잘 나와야 한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.modal-body_right_userStar').should('be.visible');
  });

  it('모달 닫기 버튼을 누르면 모달 창이 꺼져야 한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();

    cy.get('.modal-close').click();
    cy.get('.modal').should('not.be.visible');
  });

  it('사용자가 별점을 추가 했을 경우에 다시 모달을 열어도 유지 되어야 한다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();

    cy.get('#stars-3').click();
    cy.get('.modal-close').click();

    cy.get('.item-thumbnail').first().click();
    cy.get('.modal-right-score').should('have.text', '6');
    cy.get('.modal-right-comment').should('have.text', '보통이에요');
  });
});
