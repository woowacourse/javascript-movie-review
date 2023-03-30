import { BASE_URL } from '../../src/apis/tmdb';
import { SCORE_COMMENT } from '../../src/constants';

describe('영화 리뷰 앱 기능 테스트를 진행하다', () => {
  const SITE_URL = 'http://localhost:8080';
  const MOVIE_NAME_ONE = '범죄도시';
  const MOVIE_NAME_TWO = '아바타';
  const MOVIE_NAME_THREE = '안녕';

  const SCROLL_DURATION = 300;
  const SCROLL_HEIGHT = 5000;

  beforeEach(() => {
    cy.visit(SITE_URL);
  });

  it('실제 외부 API에 요청하여 받아오는 것을 테스트하다', () => {
    cy.request('GET', `${BASE_URL}movie/popular?api_key=${Cypress.env('API_KEY')}&language=ko&page=1`).as(
      'moviePopular'
    );

    cy.get('@moviePopular').its('status').should('eq', 200);
    cy.get('@moviePopular').its('body.results').should('have.length', 20);
  });

  it.skip('Intercept를 이용히여 테스트에 사용할 movie-popular.json을 생성하다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${BASE_URL}movie/popular?api_key=${Cypress.env('API_KEY')}&language=ko&page=1`,
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies');

    cy.visit(SITE_URL);
  });

  it('Fixture를 이용하여 인기 있는 영화 아이템이 20개인지 테스트하다', () => {
    cy.fixture('movie-popular.json').as('getPopularMovies');

    cy.get('@getPopularMovies').its('results').should('have.length', 20);
  });

  it('범죄 도시 검색 결과 목록이 나오는지 확인하는 테스트하다', () => {
    cy.get('#search-input-tag').type(MOVIE_NAME_ONE);
    cy.get('#search-form-button').click();
    cy.get('movie-item').should(movieItem => {
      const Movielength = movieItem.length;
      Array.from({ length: Movielength }).forEach((__, index) => {
        console.log(movieItem[index]);
        expect(movieItem[index]).to.contain(MOVIE_NAME_ONE);
      });
    });
  });

  it('아바타 검색 결과 목록이 나오는지 확인하는 테스트하다', () => {
    cy.get('#search-input-tag').type(MOVIE_NAME_TWO);
    cy.get('#search-form-button').click();
    cy.get('movie-item').should(movieItem => {
      const Movielength = movieItem.length;
      Array.from({ length: Movielength }).forEach((__, index) => {
        console.log(movieItem[index]);
        expect(movieItem[index]).to.contain(MOVIE_NAME_TWO);
      });
    });
  });

  it('안녕 검색 결과 목록이 나오는지 확인하는 테스트하다', () => {
    cy.get('#search-input-tag').type(MOVIE_NAME_THREE);
    cy.get('#search-form-button').click();
    cy.get('movie-item').should(movieItem => {
      const Movielength = movieItem.length;
      Array.from({ length: Movielength }).forEach((__, index) => {
        expect(movieItem[index]).to.contain(MOVIE_NAME_THREE);
      });
    });
  });

  it('무한 스크롤 기능이 작동하는 지 테스트하다', () => {
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 2, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 3, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 4, left: 0 },
    });
    cy.get('movie-item').should('have.length', 100);
  });

  it('위로 가기 기능이 작동하는 지 테스트하다', () => {
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 2, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 3, left: 0 },
    });
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: SCROLL_DURATION,
      offset: { top: SCROLL_HEIGHT * 4, left: 0 },
    });

    cy.get('#logo').click();
    cy.get('movie-item').should(movieItem => {
      expect(movieItem[0]).to.be.visible;
    });
  });

  it('아이디의 상세 값 URL을 이동했을 경우 해당되는 상세 정보를 보여준다.', () => {
    const URL = `${SITE_URL}/#?id=76600`;
    const TITLE = '아바타: 물의 길';
    const RELEASE_DATE = '2022/12/14';
    const RUNNING_TIME = '3시간 12분';
    const DESCRIPTION =
      '판도라 행성에서 제이크 설리와 네이티리가 이룬 가족이 겪게 되는 무자비한 위협과 살아남기 위해 떠나야 하는 긴 여정과 전투, 그리고 견뎌내야 할 상처에 대한 이야기를 그렸다. 살아남기 위해 설리 가족이 숲에서 바다로 터전을 옮기면서 겪게 되는 화합의 과정, 그리고 곳곳에서 도사리는 새로운 위협까지 역경 속에서 더 아름답게 펼쳐진다.';
    cy.visit(URL);

    cy.get('.modal-header-title').should('contain', TITLE);
    cy.get('.modal-date').should('contain', RELEASE_DATE);
    cy.get('.modal-running-time').should('contain', RUNNING_TIME);
    cy.get('.modal-description').should('contain', DESCRIPTION);
  });

  it('검색어를 가진 URL로 이동했을 경우 해당되는 검색 정보를 보여준다.', () => {
    const URL = `${SITE_URL}/#?q=${MOVIE_NAME_THREE}`;
    cy.visit(URL);

    cy.get('movie-item').should(movieItem => {
      const Movielength = movieItem.length;
      Array.from({ length: Movielength }).forEach((__, index) => {
        expect(movieItem[index]).to.contain(MOVIE_NAME_THREE);
      });
    });
  });

  it('영화를 클릭해 상세 정보 모달창을 연다.', () => {
    cy.get('movie-item').first().click();

    cy.get('body').should('have.class', 'scroll-hidden');
  });

  it('모달 뒤 배경을 클릭하여 모달을 종료한다.', () => {
    cy.get('movie-item').first().click();

    cy.get('#modal-background').click('top', { force: true });
    cy.get('body').should('not.have.class', 'scroll-hidden');
  });

  it('모달에서 ESC를 눌러서 모달을 종료한다.', () => {
    cy.get('movie-item').first().click();

    cy.get('body').type('{esc}');
    cy.get('body').should('not.have.class', 'scroll-hidden');
  });

  it('모달의 X 버튼을 클릭하여 모달을 종료한다.', () => {
    cy.get('movie-item').first().click();

    cy.get('body').type('{esc}');
    cy.get('body').should('not.have.class', 'scroll-hidden');
  });

  it('상세 정보가 있는 모달창에서 별점을 매기는 기능을 이용해본다. 첫번째 별점을 이용해보고 잘 나오는 지 테스트한다. 그리고 다시 별점을 눌러 평가를 취소한다.', () => {
    cy.get('movie-item').first().click();

    cy.get('#modal-star-container input').first().click();
    cy.get('#modal-my-score').should('contain', '2');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[1]);

    cy.get('#modal-star-container input').first().click();
    cy.get('#modal-my-score').should('contain', '0');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[0]);
  });

  it('상세 정보가 있는 모달창에서 별점을 매기는 기능을 이용해본다. 모든 별점을 클릭해서 동작을 확인한다.', () => {
    cy.get('movie-item').first().click();

    cy.get('#modal-star-container input').first().next().click();
    cy.get('#modal-my-score').should('contain', '4');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[2]);

    cy.get('#modal-star-container input').first().next().next().click();
    cy.get('#modal-my-score').should('contain', '6');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[3]);

    cy.get('#modal-star-container input').first().next().next().next().click();
    cy.get('#modal-my-score').should('contain', '8');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[4]);

    cy.get('#modal-star-container input').last().click();
    cy.get('#modal-my-score').should('contain', '10');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[5]);

    cy.get('#modal-star-container input').last().click();
    cy.get('#modal-my-score').should('contain', '0');
    cy.get('#modal-my-comment').should('contain', SCORE_COMMENT[0]);
  });

  it('유저가 너무 빠르게 내려서 무한 스크롤 기능이 동작하지 않았을 때 더 보기 버튼을 이용해서 렌더할 수 있도록 한다.', () => {
    cy.get('#movie-list-wrapper').scrollIntoView({
      easing: 'linear',
      duration: 0,
      offset: { top: SCROLL_HEIGHT, left: 0 },
    });

    cy.get('movie-item').should('have.length', 20);
    cy.get('#more-button').click();
    cy.get('movie-item').should('have.length.greaterThan', 40);
  });

  it('엔터키로 검색이 되는 지 확인한다. ', () => {
    cy.get('#search-input-tag').type(`${MOVIE_NAME_ONE}{enter}`);
  });

  it('검색 결과가 없을 때 사용자에게 검색 결과가 없다고 안내한다. ', () => {
    const NO_SHOW_TITLE = 'sadfkjhskuehgf';

    cy.get('#search-input-tag').type(`${NO_SHOW_TITLE}{enter}`);

    cy.get('#movie-container-title').should('contain', `"${NO_SHOW_TITLE}" 에 대한 검색 결과가 없습니다.`);
    cy.get('#no-result-message span').first().should('contain', '· 단어의 철자가 정확한지 확인해 보세요.');
  });
});
