describe('popular movie test', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' }
    ).as('moviePopular');
    cy.visit('http://localhost:8080');
  });

  it('페이지 접속 시 20개의 스켈레톤이 발생한다.', () => {
    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('페이지 접속 시 20개의 아이템이 로딩된다.', () => {
    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 20);
    });
  });

  it('로고 클릭 시 20개의 스켈레톤이 발생한다.', () => {
    cy.get('.header h1').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('로고 클릭 시 20개의 아이템이 로딩된다.', () => {
    cy.get('.header h1').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 20);
    });
  });

  it('스크롤을 맨 밑으로 내리면 20개의 스켈레톤이 발생한다.', () => {
    cy.scrollTo('bottom', { duration: 3000 });

    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('스크롤을 맨 밑으로 내리면 총 40개의 아이템이 로딩된다.', () => {
    cy.scrollTo('bottom', { duration: 3000 });

    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 40);
    });
  });

  it('영화 아이템 클릭하면 이미지가 렌더링된다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.modal-image').should('be.visible');
  });

  it('모달 창에서 왼쪽 첫 번째 별 클릭 시에 "최악이예요" 문구가 출력된다.', () => {
    cy.wait(1000);
    cy.get('.item-thumbnail').first().click();
    cy.get('.rating-stars>img').first().click();
    cy.get('.rating-word').should('have.text', '최악이예요');
  });
});
