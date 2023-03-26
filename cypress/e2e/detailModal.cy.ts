describe('영화 상세 모달 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular-mock.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080/');
  });

  it('영화를 클릭하면 해당 영화의 상세 모달을 보여준다.', () => {
    cy.contains('장화신은 고양이: 끝내주는 모험').click();
    cy.get('#modal-root').should('have.not.class', 'hide');
    cy.get('.modal-content').should('be.visible');
  });

  it('닫기 버튼을 클릭하면 모달이 닫힌다.', () => {
    cy.contains('장화신은 고양이: 끝내주는 모험').click();
    cy.get('.modal-close-button').click();

    cy.get('#modal-root').should('have.class', 'hide');
  });
});

describe('별점 매기기 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular-mock.json' }
    ).as('getPopularMovies');

    cy.visit('http://localhost:8080/');
    cy.contains('장화신은 고양이: 끝내주는 모험').click();
  });

  it('첫 번째 별점을 클릭하면 별 하나가 채워지고, 2와 최악이예요를 보여준다.', () => {
    cy.get('.user-rating-buttons > button[value=2]').click();

    cy.get('.user-rating-buttons')
      .children('button')
      .find('img[src="http://localhost:8080/6328741810b732410eec.png"]')
      .should('have.length', 1);
    cy.get('.user-rating-score').should('have.text', '2');
    cy.get('.user-rating-desc').should('have.text', '최악이예요');
  });

  it('두 번째 별점을 클릭하면 별 다섯개가 채워지고, 4와 별로예요를 보여준다.', () => {
    cy.get('.user-rating-buttons > button[value=4]').click();

    cy.get('.user-rating-buttons')
      .children('button')
      .find('img[src="http://localhost:8080/6328741810b732410eec.png"]')
      .should('have.length', 2);
    cy.get('.user-rating-score').should('have.text', '4');
    cy.get('.user-rating-desc').should('have.text', '별로예요');
  });

  it('세 번째 별점을 클릭하면 별 세개가 채워지고, 6과 보통이에요를 보여준다.', () => {
    cy.get('.user-rating-buttons > button[value=6]').click();

    cy.get('.user-rating-buttons')
      .children('button')
      .find('img[src="http://localhost:8080/6328741810b732410eec.png"]')
      .should('have.length', 3);
    cy.get('.user-rating-score').should('have.text', '6');
    cy.get('.user-rating-desc').should('have.text', '보통이에요');
  });

  it('네 번째 별점을 클릭하면 별 네개가 채워지고, 8과 재미있어요를 보여준다.', () => {
    cy.get('.user-rating-buttons > button[value=8]').click();

    cy.get('.user-rating-buttons')
      .children('button')
      .find('img[src="http://localhost:8080/6328741810b732410eec.png"]')
      .should('have.length', 4);
    cy.get('.user-rating-score').should('have.text', '8');
    cy.get('.user-rating-desc').should('have.text', '재미있어요');
  });

  it('다섯 번째 별점을 클릭하면 별 두개가 채워지고, 10과 명작이에요를 보여준다.', () => {
    cy.get('.user-rating-buttons > button[value=10]').click();

    cy.get('.user-rating-buttons')
      .children('button')
      .find('img[src="http://localhost:8080/6328741810b732410eec.png"]')
      .should('have.length', 5);
    cy.get('.user-rating-score').should('have.text', '10');
    cy.get('.user-rating-desc').should('have.text', '명작이에요');
  });
});
