///  <reference types="cypress" />

interface TmdbApiFetchFailResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

const ERROR_MESSAGE: Record<number, string> = {
  3: "인증 실패: 서비스 접근 권한이 없습니다.",
  4: "잘못된 형식: 해당 형식의 서비스는 존재하지 않습니다.",
  5: "잘못된 매개변수: 요청 매개변수가 올바르지 않습니다.",
  7: "유효하지 않은 API 키: 유효한 키가 부여되어야 합니다.",
  9: "서비스 오프라인: 이 서비스는 일시적으로 오프라인 상태입니다. 나중에 다시 시도하세요.",
  10: "정지된 API 키: 귀하의 계정 접근이 정지되었습니다. TMDB에 문의하세요.",
  11: "내부 오류: 문제가 발생했습니다. TMDB에 문의하세요.",
  14: "인증 실패.",
  15: "실패했습니다.",
  18: "검증 실패.",
  19: "유효하지 않은 accept 헤더입니다.",
  22: "잘못된 페이지: 페이지는 1부터 500 사이의 정수여야 합니다.",
  24: "백엔드 서버 요청 시간이 초과되었습니다. 다시 시도하세요.",
  25: "요청 횟수 (#)가 허용 한도(40)를 초과했습니다.",
  31: "계정이 비활성화되었습니다. TMDB에 문의하세요.",
  33: "유효하지 않은 요청 토큰: 토큰이 만료되었거나 올바르지 않습니다.",
  34: "요청하신 리소스를 찾을 수 없습니다.",
  35: "유효하지 않은 토큰입니다.",
  42: "해당 리소스는 이 요청 메서드를 지원하지 않습니다.",
  43: "백엔드 서버에 연결할 수 없습니다.",
  46: "API가 유지보수 중입니다. 나중에 다시 시도하세요.",
  47: "입력이 올바르지 않습니다.",
};

describe("Fetch 에러 테스트", () => {
  it("페이지 로드 시 fetch 요청 실패 (401 유효하지 않은 API 키)", () => {
    const tmdbErrorCode = 7;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 401,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        } as TmdbApiFetchFailResponse,
      }
    ).as("getPopularMoviesError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });

  it("페이지 로드 시 fetch 요청 실패 (404 찾을 수 없음)", () => {
    const tmdbErrorCode = 34;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 404,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        } as TmdbApiFetchFailResponse,
      }
    ).as("getPopularMoviesNotFoundError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesNotFoundError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });

  it("페이지 로드 시 fetch 요청 실패 (500 Internal Server Error)", () => {
    const tmdbErrorCode = 11;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 500,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        } as TmdbApiFetchFailResponse,
      }
    ).as("getPopularMoviesServerError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesServerError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });
});
