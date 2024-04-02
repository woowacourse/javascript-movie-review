describe("영화 목록 보여주는 주요한 기능 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: "movie-search.json" }
    ).as("getSearchMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+\?language=ko-KR/,
      },
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    cy.visit("http://localhost:8080/");
  });

  context("인기있는 영화 목록이 정상적으로 나열된다.", () => {
    it("메인 화면에서 인기있는 영화가 20개씩 목록에 나열되어야 한다", () => {
      cy.wait("@getPopularMovies");
      const popularMovieItems = cy.get(".item-list > li");
      const moviePosterPerPage = 20;
      expect(popularMovieItems.should("have.length", moviePosterPerPage));
    });

    it("스크롤을 가장 아래로 내리면 새로운 영화목록 20개를 보여준다. (무한스크롤)", () => {
      cy.wait("@getPopularMovies");
      cy.scrollTo("bottom");
      cy.wait("@getPopularMovies");
      const moviePosterPerPage = 20;
      const currentPage = 2;
      const popularMovieItems = cy.get(".item-list > li");
      expect(
        popularMovieItems.should(
          "have.length",
          moviePosterPerPage * currentPage
        )
      );
    });
  });

  context(
    "검색창에 영화 이름을 검색하면 관련 영화 이름과 관련 영화 목록이 나열되어야 한다.",
    () => {
      it("존재하는 영화 이름을 검색하면 해당 영화 목록을 확인할 수 있다", () => {
        const searchTarget = "탕후루판다";
        const input = cy.get("#header__search-box");
        input.type(searchTarget + "\n");
        cy.wait("@getSearchMovies");

        cy.get("h2").should("have.text", `"${searchTarget}" 검색 결과`);
        const popularMovieItems = cy.get(".item-list > li");
        expect(popularMovieItems.should("have.length.above", 1));
      });

      it("존재하는 영화 이름을 검색한 후 어떤 영화를 검색했는지 텍스트로 확인할 수 있다.", () => {
        const searchTarget = "탕후루판다";
        const input = cy.get("#header__search-box");
        input.type(searchTarget + "\n");
        cy.wait("@getSearchMovies");

        cy.get("h2").should("have.text", `"${searchTarget}" 검색 결과`);
      });
    }
  );

  context(
    "영화 포스터 클릭 시 영화 상세 정보를 보여주는 모달창이 보인다.",
    () => {
      it("'남주기 아까운 그녀' 포스터 클릭 시 영화 상세 정보가 모달창에 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
      });

      it("별점 1개를 클릭하면 '재미없어요' 글자가 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").first().click();
        cy.contains("재미없어요").should("be.visible");
      });

      it("별점 2개를 클릭하면 '조금 아쉬워요' 글자가 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").eq(1).click();
        cy.contains("조금 아쉬워요").should("be.visible");
      });

      it("별점 3개를 클릭하면 '보통이에요' 글자가 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").eq(2).click();
        cy.contains("보통이에요").should("be.visible");
      });

      it("별점 4개를 클릭하면 '나름 괜찮아요' 글자가 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").eq(3).click();
        cy.contains("나름 괜찮아요").should("be.visible");
      });

      it("별점 5개를 클릭하면 '최고에요' 글자가 보인다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").eq(4).click();
        cy.contains("최고에요").should("be.visible");
      });

      it("x 버튼을 누르면 모달이 닫힌다", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".close-button-x").click();
        cy.contains("성격과 가치관은 정반대").should("not.be.exist");
      });

      it("모달 밖을 누르면 모달이 닫힌다", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".modal-backdrop").click({ force: true });
        cy.contains("성격과 가치관은 정반대").should("not.be.exist");
      });

      it("한번 설정한 별점은 모달창을 나갔다 들어와도 설정되어 있다.", () => {
        cy.wait("@getPopularMovies");
        cy.contains("남주기 아까운 그녀").click();
        cy.contains("성격과 가치관은 정반대").should("be.visible");
        cy.get(".editable-star").eq(4).click();
        cy.contains("최고에요").should("be.visible");

        cy.get(".close-button-x").click();
        cy.contains("최고에요").should("not.be.exist");

        cy.contains("남주기 아까운 그녀").click();
        cy.contains("최고에요").should("be.visible");
      });
    }
  );
});
