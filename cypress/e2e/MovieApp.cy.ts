describe("Movie App 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("첫 화면에서 인기 있는 20개의 영화 항목들을 보여준다.", () => {
    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popularMovies.json",
      }
    );

    cy.get("h2").contains("인기 있는 영화").should("exist");
    cy.get("li").should("have.length", 20);
  });

  it("더보기 버튼을 눌렀을 때 다음 20개의 영화 항목들을 보여준다.", () => {
    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popularMovies.json",
      }
    );

    cy.get("li").should("have.length", 20);
    cy.get("button").contains("더 보기").click();
    cy.get("li").should("have.length", 40);
  });

  context("검색 기능에 대한 테스트", () => {
    it("검색어가 500자를 초과할 시 500자 이후의 글자는 생략된다.", () => {
      cy.get("input").type("a".repeat(501));
      cy.get("input").should("have.value", "a".repeat(500));
    });

    it("검색 시 검색결과 타이틀에 검색어가 포함된다.", () => {
      cy.intercept(
        {
          url: "https://api.themoviedb.org/3/search/movie?*",
        },
        {
          fixture: "searchedMovies.json",
        }
      );

      cy.get("input").type("쿵푸");
      cy.get("#search-form button").click();
      cy.get("h2").contains("쿵푸").should("exist");
    });

    it("입력한 검색어를 포함한 결과가 있으면 화면에 출력한다.", () => {
      cy.intercept(
        {
          url: "https://api.themoviedb.org/3/search/movie?*",
        },
        {
          fixture: "searchedMovies.json",
        }
      );

      cy.get("input").type("쿵푸");
      cy.get("#search-form button").click();
      cy.get("li").should("have.length", 20);
    });
  });

  it("검색 후 로고를 클릭했을 때 입력된 검색어가 초기화 되고, 초기 화면을 렌더링한다.", () => {
    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/search/movie?*",
      },
      {
        fixture: "searchedMovies.json",
      }
    );

    cy.get("input").type("쿵푸");
    cy.get("#search-form button").click();
    cy.get("h2").contains("인기 있는 영화").should("not.exist");

    cy.intercept(
      {
        url: "https://api.themoviedb.org/3/movie/popular?*",
      },
      {
        fixture: "popularMovies.json",
      }
    );

    cy.get("#movie-list-logo").click();

    cy.get("h2").contains("인기 있는 영화").should("exist");
    cy.get("li").should("have.length", 20);
  });
});
