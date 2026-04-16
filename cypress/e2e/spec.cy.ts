const APP_URL = "http://localhost:5173";
const MOVIES_PER_PAGE = 20;
const TOTAL_POPULAR_PAGES = 4;
const TOTAL_SEARCH_PAGES = 3;
const SEARCH_QUERY = "해리";
const NO_RESULT_SEARCH_QUERY = "없는영화";
const EMPTY_QUERY_WARNING_TITLE = "검색어를 입력해주세요";
const EMPTY_QUERY_WARNING_TEXT = "영화 제목을 입력한 뒤 다시 시도해주세요.";

const createMovie = (id: number, titlePrefix: string) => ({
  id,
  title: `${titlePrefix} ${id}`,
  vote_average: 7.5,
  poster_path: `/poster-${id}.jpg`,
  backdrop_path: `/backdrop-${id}.jpg`,
});

const createMoviePageResponse = (
  page: number,
  totalPages: number,
  titlePrefix: string,
) => ({
  page,
  total_pages: totalPages,
  results: Array.from({ length: MOVIES_PER_PAGE }, (_, index) =>
    createMovie((page - 1) * MOVIES_PER_PAGE + index + 1, titlePrefix),
  ),
});

const mockMoviePage = ({
  page,
  totalPages,
  titlePrefix,
  pathname,
  alias,
  query,
}: {
  page: number;
  totalPages: number;
  titlePrefix: string;
  pathname: string;
  alias: string;
  query?: string;
}) => {
  cy.intercept(
    {
      method: "GET",
      hostname: "api.themoviedb.org",
      pathname,
      query: {
        language: "ko-KR",
        page: `${page}`,
        ...(query ? { query } : {}),
      },
    },
    {
      delay: 300,
      body: createMoviePageResponse(page, totalPages, titlePrefix),
    },
  ).as(alias);
};

const mockPopularMoviePage = (
  page: number,
  alias = `getPopularMoviesPage${page}`,
) => {
  mockMoviePage({
    page,
    totalPages: TOTAL_POPULAR_PAGES,
    titlePrefix: "인기 영화",
    pathname: "/3/movie/popular",
    alias,
  });
};

const mockSearchMoviePage = (
  page: number,
  alias = `getSearchMoviesPage${page}`,
) => {
  mockMoviePage({
    page,
    totalPages: TOTAL_SEARCH_PAGES,
    titlePrefix: `${SEARCH_QUERY} 영화`,
    pathname: "/3/search/movie",
    alias,
    query: SEARCH_QUERY,
  });
};

const mockEmptySearchMoviePage = (alias = "getEmptySearchMoviesPage1") => {
  cy.intercept(
    {
      method: "GET",
      hostname: "api.themoviedb.org",
      pathname: "/3/search/movie",
      query: {
        language: "ko-KR",
        page: "1",
        query: NO_RESULT_SEARCH_QUERY,
      },
    },
    {
      delay: 300,
      body: {
        page: 1,
        total_pages: 0,
        results: [],
      },
    },
  ).as(alias);
};

const expectSkeletonUi = () => {
  cy.get(".skeleton-card .thumbnail-skeleton").should(
    "have.length",
    MOVIES_PER_PAGE,
  );
};

const expectMovieList = (page: number, titlePrefix: string) => {
  const loadedMovieCount = page * MOVIES_PER_PAGE;
  const firstMovieTitle = `${titlePrefix} 1`;
  const lastMovieTitle = `${titlePrefix} ${loadedMovieCount}`;

  cy.get(".thumbnail-list li").should("have.length", loadedMovieCount);
  cy.contains(".thumbnail-list strong", firstMovieTitle).should("be.visible");
  cy.contains(".thumbnail-list strong", lastMovieTitle).should("be.visible");
  cy.get(".skeleton-card").should("be.empty");
};


// 무한 스크롤
const scrollToSentinelAndVerify = (
  page: number,
  alias: string,
  titlePrefix: string,
) => {
  cy.get("#scroll-sentinel").scrollIntoView();
  expectSkeletonUi();
  cy.wait(`@${alias}`);
  expectMovieList(page, titlePrefix);
};

const expectWarningToast = (title: string, text: string) => {
  cy.get(".sn-notifications-container").should("exist");
  cy.get(".sn-notify.sn-notify-warning").should("be.visible");
  cy.contains(".sn-notify-title", title).should("be.visible");
  cy.contains(".sn-notify-text", text).should("be.visible");
};

const expectNoResultSection = () => {
  cy.get(".no-result").should("be.visible");
  cy.get(".no-result-image")
    .should("be.visible")
    .and("have.attr", "src")
    .and("include", "no-result-planet.png");
  cy.get(".no-result-text")
    .should("be.visible")
    .and("have.text", "검색 결과가 없습니다.");
};

describe("메인 화면", () => {
  beforeEach(() => {
    Array.from(
      { length: TOTAL_POPULAR_PAGES },
      (_, index) => index + 1,
    ).forEach((page) => mockPopularMoviePage(page));
  });

  it("초기 로드 후 스크롤로 영화 목록을 3번 더 불러온다", () => {
    cy.visit(APP_URL);
    expectSkeletonUi();
    cy.wait("@getPopularMoviesPage1");
    expectMovieList(1, "인기 영화");

    scrollToSentinelAndVerify(2, "getPopularMoviesPage2", "인기 영화");
    scrollToSentinelAndVerify(3, "getPopularMoviesPage3", "인기 영화");
    scrollToSentinelAndVerify(4, "getPopularMoviesPage4", "인기 영화");

    cy.get("#scroll-sentinel").scrollIntoView();
    cy.get(".thumbnail-list li").should("have.length", 4 * MOVIES_PER_PAGE);
  });
});

describe("검색 화면", () => {
  beforeEach(() => {
    Array.from(
      { length: TOTAL_POPULAR_PAGES },
      (_, index) => index + 1,
    ).forEach((page) => mockPopularMoviePage(page));
    Array.from({ length: TOTAL_SEARCH_PAGES }, (_, index) => index + 1).forEach(
      (page) => mockSearchMoviePage(page),
    );
  });

  it("빈 검색어로 검색하면 경고 토스트를 띄우고 기존 메인 목록을 유지한다", () => {
    let searchRequestCount = 0;

    cy.intercept(
      {
        method: "GET",
        hostname: "api.themoviedb.org",
        pathname: "/3/search/movie",
      },
      (request) => {
        searchRequestCount += 1;
        request.reply({
          delay: 300,
          body: createMoviePageResponse(
            1,
            TOTAL_SEARCH_PAGES,
            `${SEARCH_QUERY} 영화`,
          ),
        });
      },
    ).as("unexpectedSearchRequest");

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".movie-section-title").should("have.text", "지금 인기 있는 영화");
    expectMovieList(1, "인기 영화");

    cy.get("#search-input").should("have.value", "");
    cy.get("#search-button").click();

    expectWarningToast(EMPTY_QUERY_WARNING_TITLE, EMPTY_QUERY_WARNING_TEXT);
    cy.get("#search-input").should("be.focused");
    cy.then(() => {
      expect(searchRequestCount).to.equal(0);
    });
    cy.get(".movie-section-title").should("have.text", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length", MOVIES_PER_PAGE);
    cy.get(".skeleton-card").should("be.empty");
    cy.get(".no-result").should("not.be.visible");
    cy.get("#hero-section").should("be.visible");
  });

  it("검색 버튼으로 검색 결과 목록을 끝까지 불러오고 로고로 메인 화면에 돌아간다", () => {
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#search-input").type(SEARCH_QUERY);
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getSearchMoviesPage1");
    cy.get(".movie-section-title").should(
      "have.text",
      `"${SEARCH_QUERY}" 검색 결과`,
    );
    expectMovieList(1, `${SEARCH_QUERY} 영화`);

    scrollToSentinelAndVerify(
      2,
      "getSearchMoviesPage2",
      `${SEARCH_QUERY} 영화`,
    );
    scrollToSentinelAndVerify(
      3,
      "getSearchMoviesPage3",
      `${SEARCH_QUERY} 영화`,
    );


    mockPopularMoviePage(1, "reloadPopularMoviesPage1");
    cy.get(".logo").click();

    cy.wait("@reloadPopularMoviesPage1");
    cy.get("#hero-section").should("be.visible");
    cy.get(".movie-section-title").should("have.text", "지금 인기 있는 영화");
    cy.get("#search-input").should("have.value", "");
  });

  it("엔터 입력으로도 검색이 동작한다", () => {
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#search-input").type(`${SEARCH_QUERY}{enter}`);

    expectSkeletonUi();
    cy.wait("@getSearchMoviesPage1");
    cy.get(".movie-section-title").should(
      "have.text",
      `"${SEARCH_QUERY}" 검색 결과`,
    );
    expectMovieList(1, `${SEARCH_QUERY} 영화`);
  });

  it("검색 결과가 없으면 결과 없음 컴포넌트를 보여준다", () => {
    mockEmptySearchMoviePage();

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#search-input").type(NO_RESULT_SEARCH_QUERY);
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getEmptySearchMoviesPage1");
    cy.get(".movie-section-title").should(
      "have.text",
      `"${NO_RESULT_SEARCH_QUERY}" 검색 결과`,
    );
    cy.get(".thumbnail-list li").should("have.length", 0);
    cy.get(".skeleton-card").should("be.empty");
    expectNoResultSection();
    cy.get("#hero-section").should("not.be.visible");
  });
});

const mockMovieDetail = (
  movieId: number,
  alias = `getMovieDetail${movieId}`,
) => {
  cy.intercept(
    {
      method: "GET",
      hostname: "api.themoviedb.org",
      pathname: `/3/movie/${movieId}`,
    },
    {
      delay: 100,
      body: {
        id: movieId,
        title: "인사이드 아웃 2",
        vote_average: 7.617,
        poster_path: "/poster.jpg",
        backdrop_path: "/backdrop.jpg",
        genres: [{ id: 16, name: "애니메이션" }],
        release_date: "2024-06-11",
        overview: "13살이 된 라일리의 이야기",
      },
    },
  ).as(alias);
};

describe("모달", () => {
  beforeEach(() => {
    mockPopularMoviePage(1);
  });

  it("영화 카드 클릭 → 모달이 열리고 상세 정보가 표시된다", () => {
    const firstMovieId = 1; // createMovie에서 생성한 첫 번째 영화 id
    mockMovieDetail(firstMovieId);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");

    cy.get("#modalBackground").should("have.class", "active");
    cy.get("#modal-title").should("have.text", "인사이드 아웃 2");
    cy.get("#modal-category").should("contain.text", "2024");
    cy.get("#modal-category").should("contain.text", "애니메이션");
    // rate는 toFixed(1)로 표시 (mock의 7.617 → "7.6")
    cy.get("#modal-rate-value").should("have.text", "7.6");
    cy.get("#modal-detail").should("have.text", "13살이 된 라일리의 이야기");
  });

  it("X 버튼 클릭 → 모달이 닫힌다", () => {
    mockMovieDetail(1);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");

    cy.get("#modalBackground").should("have.class", "active");
    cy.get("#closeModal").click();
    cy.get("#modalBackground").should("not.have.class", "active");
  });

  it("ESC 키 → 모달이 닫힌다", () => {
    mockMovieDetail(1);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");

    cy.get("#modalBackground").should("have.class", "active");
    cy.get("body").type("{esc}");
    cy.get("#modalBackground").should("not.have.class", "active");
  });

  it("모달 배경 클릭 → 모달이 닫힌다", () => {
    mockMovieDetail(1);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");

    cy.get("#modalBackground").should("have.class", "active");
    cy.get("#modalBackground").click({ force: true }); // 배경 직접 클릭
    cy.get("#modalBackground").should("not.have.class", "active");
  });
});

describe("별점", () => {
  beforeEach(() => {
    mockPopularMoviePage(1);
    cy.clearLocalStorage();
  });

  it("별 클릭 → 라벨이 업데이트된다", () => {
    mockMovieDetail(1);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");

    // 4번째 별(8점) 클릭
    cy.get('[data-score="8"]').click();

    cy.get("#my-rating-label").should("have.text", "재미있어요 (8/10)");
  });

  it("별점 저장 후 새로고침 → 모달 열면 이전 별점이 복원된다", () => {
    mockMovieDetail(1);

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    // 첫 번째 열기: 8점 저장
    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1");
    cy.get('[data-score="8"]').click();
    cy.get("#closeModal").click();

    // 새로고침 후 두 번째 열기
    mockPopularMoviePage(1, "reloadPage1");
    mockMovieDetail(1, "getMovieDetail1_reload");

    cy.visit(APP_URL);
    cy.wait("@reloadPage1");

    cy.get(".thumbnail-list .item").first().click();
    cy.wait("@getMovieDetail1_reload");

    // 이전에 저장한 8점이 표시됨
    cy.get("#my-rating-label").should("have.text", "재미있어요 (8/10)");
    cy.get('[data-score="8"]')
      .invoke("attr", "src")
      .should("contain", "star_filled.png");
    cy.get('[data-score="10"]')
      .invoke("attr", "src")
      .should("contain", "star_empty.png");
  });
});
