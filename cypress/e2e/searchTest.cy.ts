describe('search test', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' })
        cy.intercept('GET', '**/search/movie**', { fixture: 'searchMovies.json' })
    })
    it('검색어를 입력한 뒤 검색 버튼을 누르면 필터링된 영화 목록을 보여준다.', () => {
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')

        cy.get('.thumbnail-list li')
            .first()
            .find('#title')
            .invoke('text')
            .then((defaultTitle) => {
                cy.get('.search-bar').type('스파이더맨')
                cy.get('.search-btn').click()

                cy.get('.thumbnail-list li')
                    .first()
                    .find('#title')
                    .invoke('text')
                    .should((searchTitle) => {
                        expect(searchTitle.trim()).not.to.equal(defaultTitle.trim())
                    })
            })
    })

    it('검색어를 입력한 뒤 엔터키를 누르면 필터링된 영화 목록을 보여준다.', () => {
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')

        cy.get('.thumbnail-list li')
            .first()
            .find('#title')
            .invoke('text')
            .then((defaultTitle) => {
                cy.get('.search-bar').type('스파이더맨{enter}')

                cy.get('.thumbnail-list li')
                    .first()
                    .find('#title')
                    .invoke('text')
                    .should((searchTitle) => {
                        expect(searchTitle.trim()).not.to.equal(defaultTitle.trim())
                    })
            })
    })
    it("검색란에 검색어를 입력해도 결과가 존재하지 않다면 '검색 결과가 없습니다' 텍스트를 띄운다", () => {
        cy.intercept('GET', '**/search/movie**', { body: { results: [] } })
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')
        cy.get('.search-bar').type('ㄴㅇ러ㅏㅗㅁ라ㅗ어ㅏ로머ㅏJklhdskldh')
        cy.get('.search-btn').click()
        cy.get('.search-error-text').should('have.text', '검색 결과가 없습니다.')
    })

    it('네트워크 오류 시 알림을 띄운다', () => {
        cy.intercept('GET', '**/movie/popular**', { forceNetworkError: true })
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')
        cy.on('window:alert', (text) => {
            expect(text).to.equal('네트워크 오류가 발생하였습니다.')
        })
    })

    it('API 오류 시 알림을 띄운다', () => {
        cy.intercept('GET', '**/movie/popular**', { statusCode: 401 })
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')
        cy.on('window:alert', (text) => {
            expect(text).to.equal('데이터를 불러오지 못했습니다.')
        })
    })
})
