const APP_URL = "http://localhost:5173";
const MOVIES_PER_PAGE = 20;
const TOTAL_POPULAR_PAGES = 4;
const TOTAL_SEARCH_PAGES = 3;
const SEARCH_QUERY = "해리";
const NO_RESULT_SEARCH_QUERY = "없는영화";
const MALICIOUS_QUERY = "<img onerror=alert(1) src=x>";
const MALICIOUS_TITLE_PREFIX = "<img onerror=alert(1) src=y>";
const EMPTY_QUERY_WARNING_TITLE = "검색어를 입력해주세요";
const EMPTY_QUERY_WARNING_TEXT = "영화 제목을 입력한 뒤 다시 시도해주세요.";
const ERROR_TOAST_TITLE = "오류가 발생했습니다";
const API_ERROR_TEXT = "영화 정보를 불러오는데 실패했습니다: 500";
const DETAIL_RELEASE_YEAR = "2024";
const DETAIL_GENRES = ["모험", "애니메이션"];
const DETAIL_RATE = "8.4";
const MOVIE_RATE = "7.6";
const EMPTY_MY_RATING_LABEL = "별점을 남겨보세요";
const EMPTY_MY_RATING_SCORE = "(0/10)";
const SAVED_MY_RATING_LABEL = "재미있어요";
const SAVED_MY_RATING_SCORE = "(8/10)";

const createMovie = (id: number, titlePrefix: string) => ({
  id,
  title: `${titlePrefix} ${id}`,
  vote_average: 7.56,
  poster_path: `/poster-${id}.jpg`,
  backdrop_path: `/backdrop-${id}.jpg`,
});

const createMoviePageResponse = (page: number, totalPages: number, titlePrefix: string) => ({
  page,
  total_pages: totalPages,
  results: Array.from({ length: MOVIES_PER_PAGE }, (_, index) =>
    createMovie((page - 1) * MOVIES_PER_PAGE + index + 1, titlePrefix),
  ),
});

const createMovieDetailResponse = (movieId: number, title: string) => ({
  poster_path: `/detail-poster-${movieId}.jpg`,
  title,
  release_date: `${DETAIL_RELEASE_YEAR}-07-24`,
  genres: DETAIL_GENRES.map((name, index) => ({
    id: index + 1,
    name,
  })),
  vote_average: 8.35,
  overview: `${title} 줄거리`,
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

const mockPopularMoviePage = (page: number, alias = `getPopularMoviesPage${page}`) => {
  mockMoviePage({
    page,
    totalPages: TOTAL_POPULAR_PAGES,
    titlePrefix: "인기 영화",
    pathname: "/3/movie/popular",
    alias,
  });
};

const mockMoviePageError = ({
  page,
  pathname,
  alias,
  query,
}: {
  page: number;
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
      statusCode: 500,
      body: {},
    },
  ).as(alias);
};

const mockMovieDetail = ({
  movieId,
  title,
  alias,
  delay = 300,
}: {
  movieId: number;
  title: string;
  alias: string;
  delay?: number;
}) => {
  cy.intercept(
    {
      method: "GET",
      hostname: "api.themoviedb.org",
      pathname: `/3/movie/${movieId}`,
      query: {
        language: "ko-KR",
      },
    },
    {
      delay,
      body: createMovieDetailResponse(movieId, title),
    },
  ).as(alias);
};

const mockMovieDetailError = ({ movieId, alias }: { movieId: number; alias: string }) => {
  cy.intercept(
    {
      method: "GET",
      hostname: "api.themoviedb.org",
      pathname: `/3/movie/${movieId}`,
      query: {
        language: "ko-KR",
      },
    },
    {
      delay: 300,
      statusCode: 500,
      body: {},
    },
  ).as(alias);
};

const mockSearchMoviePage = (page: number, alias = `getSearchMoviesPage${page}`) => {
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
  cy.get(".skeleton-card .thumbnail-skeleton").should("have.length", MOVIES_PER_PAGE);
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

const scrollToSentinelAndVerify = (page: number, alias: string, titlePrefix: string) => {
  cy.get("#infinite-scroll-sentinel").scrollIntoView();
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

const expectErrorToast = (text: string) => {
  cy.get(".sn-notifications-container").should("exist");
  cy.get(".sn-notify.sn-notify-error").should("be.visible");
  cy.contains(".sn-notify-title", ERROR_TOAST_TITLE).should("be.visible");
  cy.contains(".sn-notify-text", text).should("be.visible");
};

const expectNoResultSection = () => {
  cy.get(".no-result").should("be.visible");
  cy.get(".no-result-image").should("be.visible").and("have.attr", "src").and("include", "no-result-planet.png");
  cy.get(".no-result-text").should("be.visible").and("have.text", "검색 결과가 없습니다.");
};

const expectMovieDetailClosed = () => {
  cy.get("#modalBackground").should("not.have.attr", "open");
  cy.get("body").should("not.have.class", "modal-open");
};

const expectMovieDetailModal = (movieId: number, title: string) => {
  cy.get("#modalBackground").should("have.attr", "open");
  cy.get("body").should("have.class", "modal-open");
  cy.get("#modalPosterImage").should("have.attr", "src").and("include", `detail-poster-${movieId}.jpg`);
  cy.get("#modalTitle").should("have.text", title);
  cy.get("#modalCategory").should("have.text", `${DETAIL_RELEASE_YEAR} · ${DETAIL_GENRES.join(", ")}`);
  cy.get("#modalRateIcon").should("have.attr", "src").and("include", "star_filled.png");
  cy.get("#modalRateValue").should("have.text", DETAIL_RATE);
  cy.get("#modalDetail").should("have.text", `${title} 줄거리`);
};

describe("메인 화면", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    Array.from({ length: TOTAL_POPULAR_PAGES }, (_, index) => index + 1).forEach((page) => mockPopularMoviePage(page));
  });

  it("초기 로드 후 스크롤을 내려 영화 목록을 3번 더 불러온다", () => {
    cy.visit(APP_URL);

    expectSkeletonUi();
    cy.wait("@getPopularMoviesPage1");
    expectMovieList(1, "인기 영화");
    cy.get("#hero-rate-value").should("have.text", MOVIE_RATE);
    cy.get(".thumbnail-list .rate span").first().should("have.text", MOVIE_RATE);

    scrollToSentinelAndVerify(2, "getPopularMoviesPage2", "인기 영화");
    scrollToSentinelAndVerify(3, "getPopularMoviesPage3", "인기 영화");
    scrollToSentinelAndVerify(4, "getPopularMoviesPage4", "인기 영화");

    cy.get("#infinite-scroll-sentinel").should("not.be.visible");
  });

  it("스크롤 로딩이 실패하면 에러 토스트를 띄우고 다시 스크롤을 올려서 벗어났다 내려오면 재시도한다", () => {
    mockMoviePageError({
      page: 2,
      pathname: "/3/movie/popular",
      alias: "getPopularMoviesPage2Error",
    });

    cy.visit(APP_URL);

    expectSkeletonUi();
    cy.wait("@getPopularMoviesPage1");
    expectMovieList(1, "인기 영화");

    cy.get("#infinite-scroll-sentinel").scrollIntoView();
    expectSkeletonUi();
    cy.wait("@getPopularMoviesPage2Error");

    expectErrorToast(API_ERROR_TEXT);
    expectMovieList(1, "인기 영화");
    cy.get(".movie-section-title").should("have.text", "지금 인기 있는 영화");
    cy.get("#hero-section").should("be.visible");
    cy.get(".no-result").should("not.be.visible");
    cy.get("#infinite-scroll-sentinel").should("exist");

    // 재시도를 위해 모킹을 다시 성공으로 변경하고 상단으로 스크롤(sentinel 화면 이탈) 후 다시 내림
    mockPopularMoviePage(2, "getPopularMoviesPage2Retry");
    cy.scrollTo("top");
    cy.wait(100); // Observer 반응 대기
    cy.get("#infinite-scroll-sentinel").scrollIntoView();
    cy.wait("@getPopularMoviesPage2Retry");
    expectMovieList(2, "인기 영화");
  });

  it("썸네일 클릭으로 영화 상세 모달을 열고 닫을 수 있다", () => {
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getMovieDetail1",
    });
    mockMovieDetail({
      movieId: 2,
      title: "인기 영화 2",
      alias: "getMovieDetail2",
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetail1");
    expectMovieDetailModal(1, "인기 영화 1");

    cy.get("#closeModal").click();
    expectMovieDetailClosed();

    cy.contains(".thumbnail-list .item", "인기 영화 2").click();
    cy.wait("@getMovieDetail2");
    expectMovieDetailModal(2, "인기 영화 2");

    cy.get("#modalBackground").click("topLeft");
    expectMovieDetailClosed();
  });

  it("ESC 키로 영화 상세 모달을 닫을 수 있다", () => {
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getMovieDetailEsc",
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetailEsc");
    expectMovieDetailModal(1, "인기 영화 1");

    cy.focused().type("{esc}");
    expectMovieDetailClosed();
  });

  it("hero의 자세히 보기 버튼으로 첫 번째 영화 상세 모달을 연다", () => {
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getHeroMovieDetail1",
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".hero-detail-button").click();
    cy.wait("@getHeroMovieDetail1");
    expectMovieDetailModal(1, "인기 영화 1");
  });

  it("영화 상세 요청이 실패하면 에러 토스트를 띄우고 모달을 열지 않는다", () => {
    mockMovieDetailError({
      movieId: 1,
      alias: "getMovieDetail1Error",
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetail1Error");

    expectErrorToast(API_ERROR_TEXT);
    expectMovieDetailClosed();
  });

  it("영화 상세를 연속으로 클릭하면 마지막으로 클릭한 영화만 표시한다", () => {
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getMovieDetailRace1",
      delay: 200,
    });
    mockMovieDetail({
      movieId: 2,
      title: "인기 영화 2",
      alias: "getMovieDetailRace2",
      delay: 500,
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.contains(".thumbnail-list .item", "인기 영화 2").click();

    cy.wait("@getMovieDetailRace1");
    expectMovieDetailClosed();

    cy.wait("@getMovieDetailRace2");
    expectMovieDetailModal(2, "인기 영화 2");
  });

  it("내 별점을 저장하고 새로고침 후에도 유지한다", () => {
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getMovieDetailWithUserRating",
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetailWithUserRating");
    expectMovieDetailModal(1, "인기 영화 1");
    cy.get("#myRatingMessage").should("have.text", EMPTY_MY_RATING_LABEL);
    cy.get("#myRatingScore").should("have.text", EMPTY_MY_RATING_SCORE);

    cy.get('.my-rating-star-button[data-user-rating="8"]').click();
    cy.get("#myRatingMessage").should("have.text", SAVED_MY_RATING_LABEL);
    cy.get("#myRatingScore").should("have.text", SAVED_MY_RATING_SCORE);
    cy.get(".my-rating-star-button img").eq(0).should("have.attr", "src").and("include", "star_filled.png");
    cy.get(".my-rating-star-button img").eq(3).should("have.attr", "src").and("include", "star_filled.png");
    cy.get(".my-rating-star-button img").eq(4).should("have.attr", "src").and("include", "star_empty.png");

    cy.reload();
    cy.wait("@getPopularMoviesPage1");
    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetailWithUserRating");

    cy.get("#myRatingMessage").should("have.text", SAVED_MY_RATING_LABEL);
    cy.get("#myRatingScore").should("have.text", SAVED_MY_RATING_SCORE);
  });
});

describe("검색 화면", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    Array.from({ length: TOTAL_POPULAR_PAGES }, (_, index) => index + 1).forEach((page) => mockPopularMoviePage(page));
    Array.from({ length: TOTAL_SEARCH_PAGES }, (_, index) => index + 1).forEach((page) => mockSearchMoviePage(page));
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
          body: createMoviePageResponse(1, TOTAL_SEARCH_PAGES, `${SEARCH_QUERY} 영화`),
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
    cy.get("#infinite-scroll-sentinel").should("exist");
  });

  it("검색 결과 후 스크롤을 통해 목록을 끝까지 불러오고 로고로 메인 화면에 돌아간다", () => {
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#search-input").type(SEARCH_QUERY);
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getSearchMoviesPage1");
    cy.get(".movie-section-title").should("have.text", `"${SEARCH_QUERY}" 검색 결과`);
    expectMovieList(1, `${SEARCH_QUERY} 영화`);

    scrollToSentinelAndVerify(2, "getSearchMoviesPage2", `${SEARCH_QUERY} 영화`);
    scrollToSentinelAndVerify(3, "getSearchMoviesPage3", `${SEARCH_QUERY} 영화`);

    cy.get("#infinite-scroll-sentinel").should("not.be.visible");

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
    cy.get(".movie-section-title").should("have.text", `"${SEARCH_QUERY}" 검색 결과`);
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
    cy.get(".movie-section-title").should("have.text", `"${NO_RESULT_SEARCH_QUERY}" 검색 결과`);
    cy.get(".thumbnail-list li").should("have.length", 0);
    cy.get(".skeleton-card").should("be.empty");

    expectNoResultSection();
    cy.get("#hero-section").should("not.be.visible");
    cy.get("#infinite-scroll-sentinel").should("not.be.visible");
  });

  it("검색 요청이 실패하면 에러 토스트를 띄우고 기존 메인 목록을 유지한다", () => {
    mockMoviePageError({
      page: 1,
      pathname: "/3/search/movie",
      alias: "getSearchMoviesPage1Error",
      query: SEARCH_QUERY,
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");
    expectMovieList(1, "인기 영화");

    cy.get("#search-input").type(SEARCH_QUERY);
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getSearchMoviesPage1Error");

    expectErrorToast(API_ERROR_TEXT);
    expectMovieList(1, "인기 영화");
    cy.get(".movie-section-title").should("have.text", "지금 인기 있는 영화");
    cy.get("#search-input").should("have.value", SEARCH_QUERY);
    cy.get("#hero-section").should("be.visible");
    cy.get(".no-result").should("not.be.visible");
    cy.get("#infinite-scroll-sentinel").should("exist");
  });

  it("검색어와 영화 제목에 HTML이 포함되어도 텍스트로만 렌더링한다", () => {
    mockMoviePage({
      page: 1,
      totalPages: 1,
      titlePrefix: MALICIOUS_TITLE_PREFIX,
      pathname: "/3/search/movie",
      alias: "getMaliciousSearchMoviesPage1",
      query: MALICIOUS_QUERY,
    });

    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");
    cy.window().then((window) => {
      cy.stub(window, "alert").as("alert");
    });

    cy.get("#search-input").type(MALICIOUS_QUERY, {
      parseSpecialCharSequences: false,
    });
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getMaliciousSearchMoviesPage1");

    cy.get("@alert").should("not.have.been.called");
    cy.get(".movie-section-title").should("have.text", `"${MALICIOUS_QUERY}" 검색 결과`);
    cy.get(".movie-section-title img").should("not.exist");
    cy.get(".thumbnail-list strong").first().should("have.text", `${MALICIOUS_TITLE_PREFIX} 1`);
    cy.get(".thumbnail-list strong img").should("not.exist");
  });
});

describe("반응형 UI 및 기기별 특화 기능", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    mockPopularMoviePage(1);
    mockMovieDetail({
      movieId: 1,
      title: "인기 영화 1",
      alias: "getMovieDetail",
    });
  });

  it("[데스크톱] 영화 목록이 4열로 보이고, 모달에 포스터가 정상 노출된다", () => {
    cy.viewport(1280, 800);
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get(".footer").should("be.visible").and("have.css", "position", "fixed");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetail");

    cy.get("#modalPosterImage").should("be.visible");
    cy.get(".my-rating-row").should("have.css", "flex-direction", "row");
  });

  it("[모바일] 모달이 바텀 시트로 열리며 공간 확보를 위해 포스터 이미지가 숨김 처리된다", () => {
    cy.viewport("iphone-6");
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.contains(".thumbnail-list .item", "인기 영화 1").click();
    cy.wait("@getMovieDetail");

    cy.get("#modalPosterImage").should("not.be.visible");

    cy.get("#modalTitle").should("be.visible");

    cy.get(".my-rating-row").should("have.css", "flex-direction", "column");
  });

  it("무한 스크롤 시 하단 푸터에 콘텐츠가 가려지지 않고 정상 작동한다", () => {
    mockPopularMoviePage(2);
    cy.viewport(1280, 800);
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#infinite-scroll-sentinel").scrollIntoView();
    cy.wait("@getPopularMoviesPage2");

    cy.get(".thumbnail-list li").should("have.length", 40);

    cy.get(".footer").should("be.visible");
  });
});
