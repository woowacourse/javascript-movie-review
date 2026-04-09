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

const createMoviePageResponse = (page: number, totalPages: number, titlePrefix: string) => ({
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

const mockPopularMoviePage = (page: number, alias = `getPopularMoviesPage${page}`) => {
  mockMoviePage({
    page,
    totalPages: TOTAL_POPULAR_PAGES,
    titlePrefix: "인기 영화",
    pathname: "/3/movie/popular",
    alias,
  });
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

const clickSeeMoreAndVerify = (page: number, alias: string, titlePrefix: string) => {
  cy.get("#see-more-btn").should("be.visible").click();
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
  cy.get(".no-result-text").should("be.visible").and("have.text", "검색 결과가 없습니다.");
};

describe("메인 화면", () => {
  beforeEach(() => {
    Array.from({ length: TOTAL_POPULAR_PAGES }, (_, index) => index + 1).forEach((page) => mockPopularMoviePage(page));
  });

  it("초기 로드 후 더보기 버튼으로 영화 목록을 3번 더 불러온다", () => {
    cy.visit(APP_URL);

    expectSkeletonUi();
    cy.wait("@getPopularMoviesPage1");
    expectMovieList(1, "인기 영화");

    clickSeeMoreAndVerify(2, "getPopularMoviesPage2", "인기 영화");
    clickSeeMoreAndVerify(3, "getPopularMoviesPage3", "인기 영화");
    clickSeeMoreAndVerify(4, "getPopularMoviesPage4", "인기 영화");

    cy.get("#see-more-btn").should("not.be.visible");
  });
});

describe("검색 화면", () => {
  beforeEach(() => {
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
    cy.get("#see-more-btn").should("be.visible");
  });

  it("검색 버튼으로 검색 결과 목록을 끝까지 불러오고 로고로 메인 화면에 돌아간다", () => {
    cy.visit(APP_URL);
    cy.wait("@getPopularMoviesPage1");

    cy.get("#search-input").type(SEARCH_QUERY);
    cy.get("#search-button").click();

    expectSkeletonUi();
    cy.wait("@getSearchMoviesPage1");
    cy.get(".movie-section-title").should("have.text", `"${SEARCH_QUERY}" 검색 결과`);
    expectMovieList(1, `${SEARCH_QUERY} 영화`);

    clickSeeMoreAndVerify(2, "getSearchMoviesPage2", `${SEARCH_QUERY} 영화`);
    clickSeeMoreAndVerify(3, "getSearchMoviesPage3", `${SEARCH_QUERY} 영화`);

    cy.get("#see-more-btn").should("not.be.visible");

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
    cy.get("#see-more-btn").should("not.be.visible");
  });
});
