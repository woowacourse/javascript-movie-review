describe("Fixture를 이용한 테스트", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { fixture: "movie-popular.json" }
      ).as("getPopularMovies");
  
      cy.visit("http://localhost:5173");
    });
  
    it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
      cy.wait("@getPopularMovies").then((interception) => {

        const popularMovies = interception.response?.body.results;
        expect(popularMovies.length).to.equal(20);
  

        const popularMovieItems = cy.get(".thumbnail-list > li");
        expect(popularMovieItems.should("have.length", 20));
      });
    });

    it("영화의 제목, 평점, 포스터가 올바르게 화면에 보여야 한다", () => {
        cy.wait("@getPopularMovies").then((interception) => {  
          cy.get(".thumbnail-list li")
          .first()
          .find("strong")
          .should("have.text", "미키 17");

          cy.get(".thumbnail-list li")
          .first()
          .find("span")
          .should("have.text", "7");

          cy.get(".thumbnail-list li")
          .first()
          .find(".thumbnail")
          .should("have.attr", "src", "https://image.tmdb.org/t/p/w500/7KghOYtsxFquUuw4THbARsSEo6g.jpg");
        });
      });

      it("더보기 버튼 클릭 시 다음 영화 목록이 20개 더 출력된다.", () => {
        

        cy.wait("@getPopularMovies").then((interception) => {  
          cy.intercept(
            {
              method: "GET",
              url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
            },
            { fixture: "movie-search.json" }
          ).as("getMoreMovieList");
          cy.get('.primary[data-action="readMoreMovieList"]').click()
          cy.wait("@getMoreMovieList").then((interception) => {
            const popularMovieItems = cy.get(".thumbnail-list > li");
            expect(popularMovieItems.should("have.length", 40));
            cy.get(".thumbnail-list li")
            .eq(20)
            .find("strong")
            .should("have.text", "짱구");
          })
        });
      });
  });
  