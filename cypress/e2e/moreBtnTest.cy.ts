describe('무한스크롤 테스트', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' });
    });
    it('스크롤을 내리면 추가 영화 목록을 불러온다.', () => {
        cy.fixture('popularMovies.json').then((data) => {
            const pageSize = data.results.length;

            cy.visit('/');
            cy.get('.thumbnail-list li').should('have.length', pageSize);
            cy.get('.thumbnail-list li').last().scrollIntoView();

            cy.get('.thumbnail-list li').should('have.length.greaterThan', pageSize);
        });
    });

    it('스크롤을 끝까지 내리면 마지막 페이지에서 멈춘다.', () => {
        cy.fixture('popularMovies.json').then((data) => {
            const pageSize = data.results.length;
            cy.visit('/');
            cy.get('.thumbnail-list li').should('have.length', pageSize);
            cy.get('.thumbnail-list li').last().scrollIntoView();

            cy.get('.thumbnail-list li').should('have.length.greaterThan', pageSize);

            cy.get('.thumbnail-list li').last().scrollIntoView();
            cy.get('.thumbnail-list li').should('have.length', pageSize * 2);
        });
    });
});

// describe('more btn test', () => {
//     beforeEach(() => {
//         cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' })
//         cy.intercept('GET', '**/search/movie**', { fixture: 'searchMovies.json' })
//     })
//     it('페이지 접속 후 더보기 버튼을 1번 누르면 영화 개수가 40개가 된다.', () => {
//         cy.visit('https://javascript-movie-review-dvlk.vercel.app/')

//         cy.get('.item').should('have.length', 20)

//         cy.get('.display-more-btn').click()

//         cy.get('.item').should('have.length', 40)
//     })
//     it('페이지 접속 후 더보기 버튼을 10번 누르면 영화 개수가 220개가 된다.', () => {
//         cy.visit('https://javascript-movie-review-dvlk.vercel.app/')
//         cy.get('.item').should('have.length', 20)
//         for (let i = 0; i < 10; i++) {
//             cy.get('.display-more-btn').click()
//         }
//         cy.get('.item').should('have.length', 220)
//     })
// })
