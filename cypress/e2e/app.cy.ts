describe('Movielist 앱 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  context('로고를 누르면', () => {
    beforeEach(() => {
      cy.mockPopularMovies(20);
      cy.get('header h1').click();
    });

    it('인기 있는 영화 목록을 화면에 보여준다.', () => {
      cy.get('movie-list-item').should('have.length', 20);
    });
  });

  const query = '고양이';
  context(`${query}를 검색하면`, () => {
    beforeEach(() => {
      cy.get('#search-input').type(query);
      cy.get('.search-box').submit();
    });

    it(`리스트 제목은 ${query}를 포함한다.`, () => {
      cy.get('#movie-list-title').contains(query);
    });

    it(`모든 영화 제목은 ${query}를 포함한다.`, () => {
      cy.get('movie-list-item').each((element) => cy.wrap(element).contains(query));
    });
  });

  context('스크롤을 끝까지 내리면', () => {
    beforeEach(() => {
      cy.mockPopularMovies(20);
      cy.scrollTo('bottom');
    });

    it('영화 목록이 40개가 된다.', () => {
      cy.get('movie-list-item').should('have.length', 40);
    });
  });

  context('401 에러가 발생하면', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
        },
        {
          statusCode: 401,
        }
      ).as('getPopularMovies');
      cy.get('header h1').click();
    });

    it('"인증되지 않았어요" 메세지를 포함한다.', () => {
      cy.contains('인증되지 않았어요');
    });
  });

  context('404 에러가 발생하면', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
        },
        {
          statusCode: 404,
        }
      ).as('getPopularMovies');
      cy.get('header h1').click();
    });

    it('"예전에 있었지만 사라진 페이지일 수도 있어요" 메세지를 포함한다.', () => {
      cy.contains('예전에 있었지만 사라진 페이지일 수도 있어요');
    });
  });

  context('500 에러가 발생하면', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
        },
        {
          statusCode: 500,
        }
      ).as('getPopularMovies');
      cy.get('header h1').click();
    });

    it('"서버에 문제가 생겼어요" 메세지를 포함한다.', () => {
      cy.contains('서버에 문제가 생겼어요');
    });
  });
});
