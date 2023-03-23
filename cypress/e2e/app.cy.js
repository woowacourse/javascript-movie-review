const URL = 'http://localhost:8081/#';

describe('E2E 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');
    cy.visit(URL);
  });

  it('페이지에 접속하면 인기 있는 영화 20개가 렌더링 된다.', () => {
    cy.wait('@getPopularMovies').then(interception => {
      const movieItems = interception.response.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });

  it('더 보기 버튼을 누르면, 추가로 영화 리스트를 확인할 수 있다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular2.json' }
    ).as('getPopularMovies2');

    cy.get('.btn')
      .click()
      .wait('@getPopularMovies2')
      .then(interception => {
        const movieItems = interception.response.body.results;
        expect(movieItems.length).to.equal(20);
      });
  });

  it('영화를 검색 하면(enter), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'harry-potter.json' }
    ).as('getHarryPotter');

    cy.get('.search-box')
      .type('해리포터{enter}')
      .wait('@getHarryPotter')
      .then(interception => {
        const movieItems = interception.response.body.results;
        expect(movieItems[0].original_title).to.equal('harry poter');
      });
  });

  it('영화를 검색 하면(클릭), 관련 영화 리스트를 화면에 보여준다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie*/,
      },
      { fixture: 'harry-potter.json' }
    ).as('getHarryPotter');

    cy.get('.search-box').type('해리포터');
    cy.get('.search-button')
      .click()
      .wait('@getHarryPotter')
      .then(interception => {
        const movieItems = interception.response.body.results;
        expect(movieItems[0].original_title).to.equal('harry poter');
      });
  });
});
