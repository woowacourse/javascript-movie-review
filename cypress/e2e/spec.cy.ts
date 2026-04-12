export const createMockMovie = (id: number) => ({
  id,
  title: `어벤져스 ${id}`,
  poster_path: `/avengers${id}.jpg`,
  vote_average: 7.5,
  backdrop_path: `/backdrop${id}.jpg`,
  genre_ids: [12, 99],
  original_language: "ko",
  original_title: `어벤져스 ${id}`,
  overview: "타노스를 조심해",
  popularity: 22.4343,
  release_date: "2026-04-01",
  video: false,
  vote_count: 1000,
  adult: false,
});

export const createMoviesResponse = (
  count: number,
  page: number = 1,
  totalPages: number = 500,
) => ({
  page,
  results: Array.from({ length: count }, (_, i) =>
    createMockMovie((page - 1) * 20 + i + 1),
  ),
  total_pages: totalPages,
  total_results: 10000,
});

describe("영화 리뷰 앱", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*", createMoviesResponse(20)).as(
      "getPopularMovies",
    );
    cy.intercept("GET", "**/genre/movie/list*", {
      fixture: "genres.json",
    }).as("getGenres");
    cy.visit("/");
  });

  describe("홈 화면", () => {
    it("첫 렌더링시 영화 배너가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get(".banner-container .top-rated-movie").should("be.visible");
      cy.get(".banner-container .title").should("have.text", "어벤져스 1");
    });

    it("첫 렌더링시 섹션 헤더가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get("section > h2").should("be.visible");
      cy.get("section > h2").should("have.text", "지금 인기 있는 영화");
    });

    it("초기 영화 데이터가 20개가 렌더링된다", () => {
      cy.wait("@getPopularMovies");
      cy.get(".thumbnail-list li").should("have.length", 20);
    });

    it("영화 데이터 로딩 중 스켈레톤 UI가 표시된다", () => {
      cy.intercept("GET", "**/movie/popular*", (req) => {
        req.reply({ delay: 500, body: createMoviesResponse(20) });
      }).as("getPopularMoviesDelayed");

      cy.visit("/");
      cy.get(".thumbnail-list li.skeleton").should("exist");
      cy.wait("@getPopularMoviesDelayed");
      cy.get(".thumbnail-list li.skeleton").should("not.exist");
    });
  });

  describe("더 보기", () => {
    it("end-of-thumbnail-list에 도달했을떄 영화가 20개 추가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/movie/popular*", createMoviesResponse(20, 2)).as(
        "getMoreMovies",
      );

      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait("@getMoreMovies");

      cy.get(".thumbnail-list li").should("have.length", 40);
    });

    it("마지막 페이지일 때 더 이상 영화를 가져오지 않는다", () => {
      cy.wait("@getPopularMovies");
      cy.intercept(
        "GET",
        "**/movie/popular*",
        createMoviesResponse(5, 1, 1),
      ).as("getMoreMovies");
      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait("@getMoreMovies");

      cy.get(".thumbnail-list li").should("have.length", 25);

      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait(500);
      cy.get(".thumbnail-list li").should("have.length", 25);
    });

    it("더 보기 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/movie/popular*", { statusCode: 500 }).as(
        "getMoreMovies",
      );

      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait("@getMoreMovies");
      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });
  });

  describe("검색", () => {
    it("검색 시 결과가 렌더링되고 섹션 헤딩에 검색어가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.get(".thumbnail-list li").should("have.length", 5);
      cy.get("section > h2").should("contain.text", "액션");
    });

    it("검색 결과가 마지막 페이지일 때 더 이상 영화를 가져오지 않는다.", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(3, 1, 1)).as(
        "getMoreMovies",
      );
      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait("@getMoreMovies");
      cy.get(".thumbnail-list li").should("have.length", 23);

      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait(500);
      cy.get(".thumbnail-list li").should("have.length", 23);
    });

    it("검색 결과가 없을 때 안내 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      }).as("searchEmpty");

      cy.get(".search-form input").type("겨울왕국");
      cy.get(".search-form").submit();
      cy.wait("@searchEmpty");

      cy.get(".notice-text").should("contain.text", "검색 결과가 없습니다");
    });

    it("검색 이후 더 보기 API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.wait("@getPopularMovies");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(20)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.intercept("GET", "**/search/movie*", { statusCode: 500 }).as(
        "getMoreMovies",
      );
      cy.get("#end-of-thumbnail-list").scrollIntoView();
      cy.wait("@getMoreMovies");

      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });
  });

  describe("에러 처리", () => {
    it("API 실패 시 에러 메시지가 렌더링된다", () => {
      cy.intercept("GET", "**/movie/popular*", {
        statusCode: 500,
      }).as("getPopularMoviesError");

      cy.visit("/");
      cy.wait("@getPopularMoviesError");

      cy.get(".notice-text").should(
        "contain.text",
        "오류가 발생했습니다. 다시 시도해주세요.",
      );
    });

    it("API 실패 이후 검색 시 검색 결과가 렌더링된다", () => {
      cy.intercept("GET", "**/movie/popular*", {
        statusCode: 500,
      }).as("getPopularMoviesError");

      cy.visit("/");
      cy.wait("@getPopularMoviesError");
      cy.get(".notice-text").should("exist");

      cy.intercept("GET", "**/search/movie*", createMoviesResponse(5)).as(
        "searchMovies",
      );

      cy.get(".search-form input").type("액션");
      cy.get(".search-form").submit();
      cy.wait("@searchMovies");

      cy.get(".thumbnail-list li").should("have.length", 5);
      cy.get("section > h2").should("contain.text", "액션");
    });

    [
      ["인증에 실패했습니다. API 키를 확인해주세요.", 401],
      ["요청한 정보를 찾을 수 없습니다", 404],
      ["오류가 발생했습니다. 다시 시도해주세요.", 500],
    ].forEach(([message, statusCode]) => {
      it(`API ${statusCode} 에러 시 에러 메시지가 렌더링된다`, () => {
        cy.wait("@getPopularMovies");

        cy.intercept("GET", "**/movie/popular*", { statusCode }).as(
          "getMoreMovies",
        );

        cy.get("#end-of-thumbnail-list").scrollIntoView();
        cy.wait("@getMoreMovies");

        cy.get(".notice-text").should("contain.text", message);
      });
    });
  });

  describe("영화 정보", () => {
    const origin = new URL(Cypress.config("baseUrl") as string).origin;
    beforeEach(() => {
      cy.wait("@getPopularMovies");
      cy.wait("@getGenres");
    });
    it("영화를 클릭하면 영화에 대한 자세한 정보가 담긴 모달이 렌더링된다", () => {
      cy.get(".thumbnail-list li").first().click();
      cy.get(".modal").should("be.visible");
    });

    it("영화 카테고리 아이디는 이름으로 변환되어 렌더링된다.", () => {
      cy.get(".thumbnail-list li").first().click();
      cy.get("#movie-detail-category").should("have.text", "모험, 다큐멘터리");
      cy.get("#movie-detail-release-year").should("have.text", "2026");
    });

    it("모달 닫기 버튼을 클릭하면 영화 정보 모달이 제거된다.", () => {
      cy.get(".thumbnail-list li").first().click();
      cy.get("#closeModal").click();
      cy.get("dialog").should("not.be.visible");
    });

    it("영화를 클릭하면 영화 ID가 영화에 대한 자세한 정보가 담긴 컨테이너의 data-movie-id 속성에 저장된다.", () => {
      cy.get(".thumbnail-list li").eq(2).click();
      cy.get("#movie-detail-container")
        .invoke("attr", "data-movie-id")
        .should("eq", "3");
    });

    it("별점을 클릭하면 로컬스토리지에 선택된 영화에 내 평점이 저장된다.", () => {
      function assertLocalStorageValue(key: string, value: string) {
        cy.getAllLocalStorage().then((result) => {
          expect(result).to.deep.equal({
            [origin]: {
              [key]: value,
            },
          });
        });
      }
      cy.get(".thumbnail-list li").eq(4).click();
      cy.get(".my-rating-container button").eq(0).click();
      assertLocalStorageValue("movie-5-my-rating", "2");
      cy.get(".my-rating-container button").eq(1).click();
      assertLocalStorageValue("movie-5-my-rating", "4");
      cy.get(".my-rating-container button").eq(2).click();
      assertLocalStorageValue("movie-5-my-rating", "6");
      cy.get(".my-rating-container button").eq(3).click();
      assertLocalStorageValue("movie-5-my-rating", "8");
      cy.get(".my-rating-container button").eq(4).click();
      assertLocalStorageValue("movie-5-my-rating", "10");
    });

    it("별점을 클릭하면 별점에 따라 내 평점 렌더링이 변화된다.", () => {
      const ratingCases = [
        { buttonIndex: 0, rating: 2, label: "최악이에요", filledCount: 1 },
        { buttonIndex: 1, rating: 4, label: "별로에요", filledCount: 2 },
        { buttonIndex: 2, rating: 6, label: "보통이에요", filledCount: 3 },
        { buttonIndex: 3, rating: 8, label: "재미있어요", filledCount: 4 },
        { buttonIndex: 4, rating: 10, label: "명작이에요", filledCount: 5 },
      ];

      cy.get(".thumbnail-list li").eq(4).click();

      ratingCases.forEach(({ buttonIndex, rating, label, filledCount }) => {
        cy.get(".my-rating-container button").eq(buttonIndex).click();
        cy.get("#my-rating-to-string").should("have.text", label);
        cy.get("#my-rating-ratio").should("have.text", `(${rating}/10)`);
        for (let i = 0; i < ratingCases.length; i++) {
          const expectedSrc =
            i < filledCount ? "star_filled.png" : "star_empty.png";
          cy.get("#my-rating button")
            .eq(i)
            .find("img")
            .should("have.attr", "src")
            .and("include", expectedSrc);
        }
      });
    });
  });
});
