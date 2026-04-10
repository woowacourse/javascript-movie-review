const popularMoviesPage1 = {
  results: [
    {
      id: 1,
      title: "test1",
      poster_path: "/test1.jpg",
      vote_average: 8.8,
      backdrop_path: "/test1-bg.jpg",
    },
    {
      id: 2,
      title: "test2",
      poster_path: "/test2.jpg",
      vote_average: 8.7,
      backdrop_path: "/test2-bg.jpg",
    },
  ],
  total_pages: 2,
};

const popularMoviesPage2 = {
  results: [
    {
      id: 3,
      title: "test3",
      poster_path: "/test3.jpg",
      vote_average: 9.1,
      backdrop_path: "/test3-bg.jpg",
    },
  ],
  total_pages: 2,
};

const searchMovies = {
  results: [
    {
      id: 4,
      title: "search-test",
      poster_path: "/search-test.jpg",
      vote_average: 7.9,
      backdrop_path: "/search-test-bg.jpg",
    },
  ],
  total_pages: 1,
};

const movieDetail = {
  id: 1,
  title: "test1",
  poster_path: "/test1.jpg",
  vote_average: 8.8,
  overview: "테스트 데이터",
  genres: [{ name: "SF" }, { name: "스릴러" }],
  release_date: "2010-07-21",
};

function mockMovieApis() {
  cy.intercept("GET", "**/movie/popular?*page=1*", popularMoviesPage1).as(
    "getPopularMoviesPage1",
  );
  cy.intercept("GET", "**/movie/popular?*page=2*", popularMoviesPage2).as(
    "getPopularMoviesPage2",
  );
  cy.intercept("GET", "**/search/movie?*query=*", searchMovies).as(
    "searchMovies",
  );
  cy.intercept("GET", "**/movie/1?*", movieDetail).as("getMovieDetail");
}

describe("영화 리뷰 웹 E2E 테스트", () => {
  beforeEach(() => {
    mockMovieApis();
    cy.visit("http://localhost:5173", {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.wait("@getPopularMoviesPage1");
  });

  it("초기 진입 시 인기 영화 목록이 표시된다", () => {
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length", 2);
    cy.get(".thumbnail-list").should("contain.text", "test1");
    cy.get(".thumbnail-list").should("contain.text", "test2");
  });

  it("검색어 입력 시 검색 결과가 표시된다", () => {
    cy.get(".search-input").type("search-test");
    cy.get(".search-form").submit();

    cy.wait("@searchMovies");
    cy.get(".main-title").should("contain.text", '"search-test" 검색 결과');
    cy.get(".thumbnail-list li").should("have.length", 1);
    cy.get(".thumbnail-list").should("contain.text", "search-test");
  });

  it("빈 검색어 제출 시 인기영화로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".search-input").clear();
    cy.get(".search-form").submit();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });

  it("영화 카드를 클릭하면 상세 정보 모달이 열린다", () => {
    cy.get(".thumbnail-list .item").first().click();

    cy.wait("@getMovieDetail");
    cy.get(".modal-background").should("have.class", "active");
    cy.get(".modal").should("contain.text", "test1");
    cy.get(".modal").should("contain.text", "2010");
    cy.get(".modal").should("contain.text", "SF, 스릴러");
    cy.get(".modal").should("contain.text", "테스트 데이터");
  });

  it("ESC 입력 시 모달이 닫힌다", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail");

    cy.document().then((doc) => {
      doc.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    cy.get(".modal-background.active").should("not.exist");
  });

  it("별점을 선택하면 localStorage에 저장되고 다시 열었을 때 유지된다", () => {
    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail");

    cy.get('.stars .star[data-id="8"]').click();
    cy.wait("@getMovieDetail");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("ratedMovies")).to.equal(
        JSON.stringify([{ id: 1, rating: 8 }]),
      );
    });

    cy.get(".modal").should("contain.text", "재미있어요");
    cy.get(".modal").should("contain.text", "(8/10)");
  });

  it("스크롤 하단 도달 시 다음 페이지 영화 목록을 추가로 불러온다", () => {
    cy.document().then((doc) => {
      Object.defineProperty(doc.body, "scrollHeight", {
        value: 1000,
        configurable: true,
      });
    });

    cy.window().then((win) => {
      Object.defineProperty(win, "innerHeight", {
        value: 1000,
        configurable: true,
      });
      Object.defineProperty(win, "scrollY", {
        value: 0,
        configurable: true,
      });
      win.dispatchEvent(new Event("scroll"));
    });

    cy.wait("@getPopularMoviesPage2");
    cy.get(".thumbnail-list li").should("have.length", 3);
    cy.get(".thumbnail-list").should("contain.text", "test3");
  });

  it("로고 클릭 시 홈으로 돌아온다", () => {
    cy.get(".search-input").type("아이언맨");
    cy.get(".search-form").submit();
    cy.get(".main-title").should("contain.text", "아이언맨");

    cy.get(".logo").click();
    cy.get(".main-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length.greaterThan", 0);
  });
});
