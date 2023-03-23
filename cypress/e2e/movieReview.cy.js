import { MOVIE_MAX_COUNT } from '../../src/constants';

const TEST_URL = 'http://localhost:8082/';

describe('영화 리뷰 e2e 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/genre\/movie/,
      },
      { fixture: 'movieGenres.json' }
    ).as('fetchMovieGenreData');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?[^#]*page=1/,
      },
      { fixture: 'popularMoviesPage1.json' }
    ).as('fetchPopularMoviePage1Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?[^#]*page=2/,
      },
      { fixture: 'popularMoviesPage2.json' }
    ).as('fetchPopularMoviePage2Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?[^#]*query=%EC%99%B8%EA%B3%84%EC%9D%B8[^#]*page=1/,
      },
      { fixture: 'searchedMoviesPage1.json' }
    ).as('fetchSearchedMoviePage1Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?[^#]*query=%EC%99%B8%EA%B3%84%EC%9D%B8[^#]*page=2/,
      },
      {
        fixture: 'searchedMoviesPage2.json',
      }
    ).as('fetchSearchedMoviePage2Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?[^#]*query=%ED%95%9C%EA%B5%AD%EC%9D%B8%EC%9E%85%EB%8B%88%EB%8B%A4[^#]*page=1/,
      },
      { fixture: 'noSearchResult.json' }
    ).as('fetchNoSearchResultMovieData');

    cy.visit(TEST_URL);
  });

  it('웹 페이지에 처음 방문하면 지금 인기 있는 영화 목록 데이터가 렌더링되기 전에 skeleton을 볼 수 있다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?[^#]*page=1$/,
      },
      (request) => {
        request.reply(async (response) => {
          const movieData = await cy.fixture('popularMoviesPage1.json').then((data) => data);

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(response.send(movieData));
            }, 2000);
          });
        });
      }
    ).as('fetchPopularMovieData');

    cy.clock();

    cy.visit(TEST_URL);

    cy.tick(1000);

    cy.get('.skeleton').should('be.visible');
  });

  it('웹 페이지에 처음 방문하면 지금 인기 있는 영화 목록을 볼 수 있다.', () => {
    cy.get('.item-card').should('have.length', MOVIE_MAX_COUNT);

    cy.fixture('popularMoviesPage1.json').then((expectedData) => {
      expectedData.results.forEach((movieData) => {
        cy.get('.item-list').should('contain', movieData.title);
      });
    });
  });

  it('페이지의 맨 아래로 스크롤하면 지금 인기 있는 영화 목록의 영화를 더 볼 수 있다.', () => {
    cy.get('.item-card').should('have.length', MOVIE_MAX_COUNT);
    cy.scrollTo('bottom');

    cy.wait(4000);

    cy.get('.item-card').should('have.length', MOVIE_MAX_COUNT * 2);

    cy.fixture('popularMoviesPage2.json').then((expectedData) => {
      expectedData.results.forEach((movieData) => {
        cy.get('.item-list').should('contain', movieData.title);
      });
    });
  });

  it('검색시 검색 결과가 있으면 검색 결과 목록을 볼 수 있다.', () => {
    cy.get('#search-input').type('외계인', { force: true });
    cy.get('#search-button').click({ force: true });

    cy.wait(2000);

    cy.fixture('searchedMoviesPage1.json').then((expectedData) => {
      expectedData.results.forEach((movieData) => {
        cy.get('.item-list').should('contain', movieData.title);
      });
    });
  });

  it('페이지의 맨 아래로 스크롤하면 검색 결과 목록의 영화를 더 볼 수 있다.', () => {
    cy.get('#search-input').type('외계인', { force: true });
    cy.get('#search-button').click({ force: true });

    cy.wait(2000);

    cy.get('.item-card').should('have.length', MOVIE_MAX_COUNT);
    cy.scrollTo('bottom');

    cy.wait(2000);

    cy.fixture('searchedMoviesPage2.json').then((expectedData) => {
      cy.get('.item-card').should('have.length', MOVIE_MAX_COUNT + expectedData.results.length);

      expectedData.results.forEach((movieData) => {
        cy.get('.item-list').should('contain', movieData.title);
      });
    });
  });

  it('페이지 끝에 도달한 경우에는 더 이상 스크롤 되지 않는다.', () => {
    cy.get('#search-input').type('외계인', { force: true });
    cy.get('#search-button').click({ force: true });

    cy.wait(2000);

    cy.scrollTo('bottom');

    cy.wait(2000);

    cy.get('body').then((body) => {
      const initialPageHeight = body.height();

      cy.scrollTo('bottom');

      cy.get('body').then((body) => {
        const newPageHeight = body.height();

        expect(newPageHeight).to.equal(initialPageHeight);
      });
    });
  });

  it('목록에서 영화 아이템을 클릭하면 영화 상세 정보 모달을 볼 수 있다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.modal-content').should('be.visible');
    cy.url().should('include', '/?id=315162');
    cy.get('.item-title')
      .first()
      .invoke('text')
      .then((itemTitle) => {
        cy.get('.information-title')
          .first()
          .invoke('text')
          .then((modalTitle) => {
            expect(itemTitle).to.eq(modalTitle);
          });
      });
  });

  it('"X" 버튼을 눌러서 모달을 닫을 수 있다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.close-button').click({ force: true });

    cy.get('.modal-content').should('be.not.visible');
  });

  it('모달 배경(백드롭)을 눌러서 모달을 닫을 수 있다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.modal-backdrop').click({ force: true });

    cy.get('.modal-content').should('be.not.visible');
  });

  it('영화 상세 정보 모달에서 영화에 대한 평점을 줄 수 있다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.user-vote-star[data-star-index=3]').click({ force: true });
    cy.get('.vote-message').should('contain', '재미있어요');
  });

  it('영화 상세 정보 모달에서 영화에 대한 평점 주면 하단에 "평가가 완료되었습니다" 메세지가 나타난다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.modal').click({ force: true });

    cy.get('.user-vote-star[data-star-index=3]').click({ force: true });
    cy.get('.voted').should('be.visible');
  });

  it('영화 상세 정보 모달에서 영화 평가 후 새로고침 했을 때 했던 평가를 계속 볼 수 있다.', () => {
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });

    cy.get('.user-vote-star[data-star-index=3]').click({ force: true });

    cy.reload();
    cy.wait(2000);

    cy.get('.item-link').first().click({ force: true });
    cy.get('.user-vote-star[data-star-index=3]')
      .should('have.attr', 'src')
      .and('include', 'd34e9cd925f2efcf3796');
    cy.get('.user-vote-star[data-star-index=4]')
      .should('have.attr', 'src')
      .and('not.include', 'd34e9cd925f2efcf3796');
  });

  it('영화 검색하고 모달을 연 후에도 브라우저 뒤로가기/앞으로가기 버튼을 클릭해서 방문했던 페이지에 다시 갈 수 있다.', () => {
    cy.wait(2000);

    cy.get('#search-input').type('외계인', { force: true });
    cy.get('#search-button').click({ force: true });

    cy.wait(2000);

    cy.url().should('include', 'q=%EC%99%B8%EA%B3%84%EC%9D%B8');

    cy.get('.item-link').first().click({ force: true });
    cy.url().should('include', 'id=39513');
    cy.get('.close-button').click({ force: true });

    cy.url().should('include', 'q=%EC%99%B8%EA%B3%84%EC%9D%B8');

    cy.go('back');
    cy.url().should('include', 'id=39513');
    cy.get('.modal-content').should('be.visible');

    cy.go('back');
    cy.url().should('not.include', 'id=39513').and('include', 'q=%EC%99%B8%EA%B3%84%EC%9D%B8');
    cy.get('.modal-content').should('not.be.visible');

    cy.go('back');
    cy.url().should('not.include', 'q=%EC%99%B8%EA%B3%84%EC%9D%B8');
    cy.get('#movie-list-title').should('contain', '지금 인기 있는 영화');

    cy.go('forward');
    cy.url().should('include', 'q=%EC%99%B8%EA%B3%84%EC%9D%B8');
  });

  it('검색시 검색 결과가 없으면 결과 없음 메세지가 화면에 출력된다.', () => {
    cy.get('#search-input').type('한국인입니다', { force: true });
    cy.get('#search-button').click({ force: true });

    cy.wait(2000);

    cy.get('.error-message').should(
      'contain',
      '입력하신 검색어 "한국인입니다"(와)과 일치하는 결과가 없습니다.'
    );
  });

  it('HTTP 400대 에러 발생시 에러 메세지가 화면에 출력된다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?[^#]*page=1$/,
      },
      { statusCode: 400 }
    ).as('HTTPError');

    cy.visit(TEST_URL);
    cy.wait('@HTTPError');

    cy.get('.error-message').should('contain', '요청하신 작업을 할 수 없습니다.');
  });

  it('HTTP 500대 에러 발생시 에러 메세지가 화면에 출력된다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?[^#]*page=1$/,
      },
      { statusCode: 500 }
    ).as('HTTPError');

    cy.visit(TEST_URL);
    cy.wait('@HTTPError');

    cy.get('.error-message').should('contain', '서비스 이용에 불편을 드려 죄송합니다.');
  });
});
