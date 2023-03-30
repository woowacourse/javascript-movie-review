import { Movie } from "../../src/types/type";

const mockPopularMovies = (page: number) => {
  const url = new RegExp(
    `^https:\/\/api.themoviedb.org\/3\/movie\/popular.*(page=${page})`
  );
  cy.intercept(url, { fixture: `popularMovies${page}.json` });
};

const mockSearchMovies = (query: string) => {
  const url = new RegExp(
    `^https:\/\/api.themoviedb.org\/3\/search\/movie.*(query=${query}).*`
  );

  const queryToFilename: {
    [key: string]: string;
  } = {
    컴퓨터: "Movies1",
    "쿠키 커피": "NoImageMovies",
    고구마: "NoResult",
  };

  cy.intercept(url, {
    fixture: `search${queryToFilename[query]}.json`,
  });
};

describe("정상 작동 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1400, 850);
  });

  it("영화 목록을 인기 순으로 1페이지를 불러 올 수 있다", () => {
    mockPopularMovies(1);

    cy.fixture("popularMovies1.json").then((response) => {
      response.results.forEach((movie: Movie) => {
        cy.get("movie-item").should("contain", movie.title);
      });
    });
  });

  it("스크롤 시 다음의 인기 영화 목록을 불러 올 수 있다", () => {
    mockPopularMovies(1);
    mockPopularMovies(2);

    cy.scrollTo("bottom");

    cy.fixture("popularMovies2.json").then((response) => {
      response.results.forEach((movie: Movie) => {
        cy.get("movie-item").should("contain", movie.title);
      });
    });
  });

  it("영화 목록 아이템에 대한 Skeleton UI를 띄운다.", () => {
    cy.get(".skeleton").should("be.visible");
  });

  it("검색를 포함하고 있는 영화를 검색할 수 있다", () => {
    mockSearchMovies("컴퓨터");

    cy.get("#search-input").type("컴퓨터");
    cy.get("#search-form").submit();

    cy.fixture("searchMovies1.json").then((response) => {
      response.results.forEach((movie: Movie) => {
        cy.get("movie-item").should("contain", movie.title);
      });
    });
  });
});

describe("데이터 값이 없을 때 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
    cy.viewport(1400, 850);
  });

  it("포스터가 없을 때 대체 이미지가 출력된다", () => {
    mockSearchMovies("쿠키 커피");

    cy.get("#search-input").type("쿠키 커피 도시락");
    cy.get("#search-form").submit();

    cy.get(".item-card")
      .find(".item-thumbnail")
      .should(
        "have.attr",
        "src",
        "http://localhost:8081/da3e03a95b7922e70c82.png"
      );
  });

  it("검색어가 없을 때 안내 메세지가 출력된다", () => {
    mockSearchMovies("고구마");

    cy.get("#search-input").type("고구마");
    cy.get("#search-form").submit();

    cy.get(".not-search").should("contain.text", "해당 검색 결과가 없습니다");
  });
});
