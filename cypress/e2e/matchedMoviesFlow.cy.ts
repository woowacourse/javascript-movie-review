beforeEach(() => {
  cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-matched.json' });
  cy.intercept(POPULAR_MOVIES_REQUEST, { fixture: 'movie-popular.json' });

  cy.visit('/');
});

describe('Flow: 검색어 입력을 통한 영화 검색', () => {
  it('검색어를 입력 후 검색 버튼을 누르면 해당 검색어에 대한 초기 검색 결과 20개를 보여준다.', () => {
    cy.get('input').type('쿵푸');
    cy.get('.search-button')
      .click()
      .then(() => {
        cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
        cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
        cy.get('.item-card').should('have.length', 20);
      });
  });

  it('검색어를 입력 후 Enter 키를 누르면 해당 검색어에 대한 초기 검색 결과 20개를 보여준다.', () => {
    cy.searchMovie('쿵푸').then(() => {
      cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
      cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
      cy.get('.item-card').should('have.length', 20);
    });
  });

  it('초기 검색 결과 화면에서 "더보기" 버튼을 클릭한 경우, 로딩이 완료되기 전까지 20개의 movie skeleton UI를 출력한다.', () => {
    cy.searchMovie('쿵푸');
    cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-matched-2.json', delay: 1000 });

    cy.get('.btn').click();
    cy.get('.item-card.skeleton').should('have.length', 20);
  });

  it('초기 검색 결과 화면에서 "더보기" 버튼을 클릭한 경우, 로딩이 완료된 후 2번째 검색 결과의 20개를 추가로 보여준다.', () => {
    cy.searchMovie('쿵푸');
    cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-matched-2.json', delay: 1000 });

    const buttonClick = cy.get('.btn').click();
    cy.get('.item-card.skeleton').should('have.length', 20);

    buttonClick.then(() => {
      cy.get('.item-card.skeleton').should('not.exist');
      cy.get('.item-card').should('have.length', 40);
    });
  });

  it('검색어에 대한 영화 목록이 더이상 없을 경우 더보기 버튼을 출력하지 않고, "더이상 불러올 목록이 없어요. :(" UX writing을 출력한다.', () => {
    cy.intercept(MATCHED_MOVIES_REQUEST, { fixture: 'movie-none.json' });

    cy.searchMovie('ㅁ').then(() => {
      cy.get('.item-card').should('not.exist');
      cy.get('.btn').should('be.disabled');
      cy.get('.btn').should('have.text', '더이상 불러올 목록이 없어요. :(');
    });
  });
});

describe('Flow: 검색 결과 화면에서 좌상단 로고를 누른 경우', () => {
  it('검색 결과 화면에서 좌상단 로고를 클릭하면 인기있는 영화 화면으로 전환되어 인기 영화 20개를 출력한다.', () => {
    cy.searchMovie('쿵푸').then(() => {
      cy.get('.item-view').find('h2').should('have.text', '"쿵푸"검색 결과');
      cy.get('.item-card').eq(1).find('.item-title').should('have.text', '쿵푸팬더');
      cy.get('.item-card').should('have.length', 20);
    });
    cy.get('header')
      .find('img')
      .click()
      .then(() => {
        cy.get('.item-view').find('h2').should('have.text', '지금 인기있는 영화');
        cy.get('.item-card').eq(1).find('.item-title').should('have.text', '댐즐');
        cy.get('.item-card').should('have.length', 20);
      });
  });
});
