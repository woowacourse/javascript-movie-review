const visitHome = () => {
  cy.visit("localhost:5173");
};

const waitPopularLoaded = () => {
  cy.wait("@getMovies");
};

const searchMovie = (keyword: string, alias = "@searchMovies") => {
  waitPopularLoaded();
  cy.get(".search-input").clear().type(keyword);
  cy.get(".search-button").click();
  cy.wait(alias);
};

const searchMovieByEnter = (keyword: string, alias = "@searchMovies") => {
  waitPopularLoaded();
  cy.get(".search-input").clear().type(`${keyword}{enter}`);
  cy.wait(alias);
};

const openFirstMovie = () => {
  cy.get(".thumbnail-list li").first().click();
};

const openFirstPopularMovie = () => {
  waitPopularLoaded();
  openFirstMovie();
};

const openFirstSearchedMovie = (keyword = "Harry Potter") => {
  searchMovie(keyword);
  openFirstMovie();
};

const closeModalByButton = () => {
  cy.get("#closeModal").click();
};

const closeModalByEsc = () => {
  cy.get("body").type("{esc}");
};

const ratePerfect = () => {
  cy.get("#rate-stars img").last().click();
};

describe("인기영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular*",
      { fixture: "movies.json" },
    ).as("getMovies");
    cy.intercept("GET", "**/movie/popular*page=2*",
      { fixture: "movies2.json"}
    ).as("getMoviesPage2");
    cy.intercept("GET", "**/movie/popular*page=3*" , 
      {fixture : "movies3.json"}
    ).as("getMoviesPage3")
    cy.intercept("GET", "**/movie/1*", { fixture: "movieDetail.json" }).as("getDetail");
    visitHome();
  });

  it("웹에 접근을 하면 인기 영화 20개가 보인다", () => {
    waitPopularLoaded();
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("스크롤을 끝까지 내렸을때 추가로 랜더링 한다", () => {
    waitPopularLoaded();
    cy.scrollTo("bottom");
    cy.wait("@getMoviesPage2");
    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("무한 스크롤로 페이지를 순차적으로 불러온다", () => {
    waitPopularLoaded();
    cy.get(".thumbnail-list li").should("have.length", 20);

    cy.scrollTo("bottom");
    cy.wait("@getMoviesPage2");
    cy.get(".thumbnail-list li").should("have.length", 40);

    cy.scrollTo("bottom");
    cy.wait("@getMoviesPage3");
    cy.get(".thumbnail-list li").should("have.length", 60);
  });

  it("영화 클릭시 모달창 열림", () =>{
    openFirstPopularMovie();
    cy.get(".modal-background").should("have.class", "active");
  });

  it("ESC를 누를시 모달창 닫힘",() =>{
    openFirstPopularMovie();
    cy.get(".modal-background").should("have.class", "active");
    closeModalByEsc();
    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("닫기 버튼 클릭시 모달창 닫힘", () => {
    openFirstPopularMovie();
    cy.get(".modal-background").should("have.class", "active");
    closeModalByButton();
    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("별점 클릭시 랜더링 하기", () =>{
    openFirstPopularMovie();
    ratePerfect();
    cy.get("#rate-evaluate").should("have.text", "명작이에요");
    cy.get("#rate-score").should("have.text", "(10/10)");
  });

  it("별점이 모달을 닫고 다시 열어도 유지된다", () => {
    openFirstPopularMovie();
    ratePerfect();
    closeModalByButton();
    openFirstMovie();
    cy.get("#rate-evaluate").should("have.text", "명작이에요");
    cy.get("#rate-score").should("have.text", "(10/10)");
  });
});

describe("검색영화 렌더링 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search/movie*", { fixture: "movies.json" }).as("searchMovies");
    cy.intercept("GET", "**/movie/popular*", { fixture: "movies.json" }).as("getMovies");
    cy.intercept("GET", "**/movie/1*", { fixture: "movieDetail.json" }).as("getDetail");
    visitHome();
  });

  it("Harry Potter를 검색 하면 검색에 따른 영화를 랜더링 한다.", () => {
    searchMovie("Harry Potter");
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("뷁뷁뷁을 검색 하면 검색 결과가 없어야 한다.", () => {
    cy.intercept("GET", "**/search/movie*", { body: { results: [], total_pages: 1 } }).as("searchEmpty");
    searchMovieByEnter("뷁뷁뷁", "@searchEmpty");
    cy.get(".thumbnail-list li").should("have.length", 0);
    cy.get("#no-result").contains("검색 결과가 없습니다.").should("exist");
  });

  it("영화 클릭시 모달창 열림", () => {
    openFirstSearchedMovie();
    cy.get(".modal-background").should("have.class", "active");
  });

  it("닫기 버튼 클릭시 모달창 닫힘", () => {
    openFirstSearchedMovie();
    closeModalByButton();
    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("ESC를 누를시 모달창 닫힘", () => {
    openFirstSearchedMovie();
    closeModalByEsc();
    cy.get(".modal-background").should("not.have.class", "active");
  });

  it("별점 클릭시 랜더링 하기", () => {
    openFirstSearchedMovie();
    ratePerfect();
    cy.get("#rate-evaluate").should("have.text", "명작이에요");
    cy.get("#rate-score").should("have.text", "(10/10)");
  });

  it("별점이 모달을 닫고 다시 열어도 유지된다", () => {
    openFirstSearchedMovie();
    ratePerfect();
    closeModalByButton();
    openFirstMovie();
    cy.get("#rate-evaluate").should("have.text", "명작이에요");
    cy.get("#rate-score").should("have.text", "(10/10)");
  });

  it("연결이 되어 있지 않았을때 에러 표시를 한다", () => {
    cy.intercept("GET", "**/search/movie*", { forceNetworkError: true }).as("searchError");

    const alertStub = cy.stub();
    cy.on("window:alert", alertStub);

    waitPopularLoaded();
    cy.get(".search-input").clear().type("Harry Potter");
    cy.get(".search-button").click();

    cy.wait("@searchError").then(() => {
      expect(alertStub).to.have.been.called;
    });
  });
});

describe("Skeleton UI 테스트", () => {
  it("이미지 로드 전 스켈레톤 UI가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", () => {
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".item").should("have.class", "skeleton");
        cy.get(".skeleton-poster").should("exist");
        cy.get(".skeleton-rate").should("exist");
        cy.get(".skeleton-title").should("exist");
      });
  });

  it("이미지 로드 실패 시 스켈레톤 UI가 제거되고 대체 이미지가 표시된다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      { fixture: "movies.json" },
    ).as("getMovies");

    cy.intercept("GET", "https://image.tmdb.org/t/p/original/**", {
      statusCode: 404,
    }).as("getImageFailed");

    cy.visit("http://localhost:5173");
    cy.wait("@getMovies");
    cy.wait("@getImageFailed");

    cy.get(".thumbnail-list li")
      .first()
      .within(() => {
        cy.get(".thumbnail")
          .should("have.attr", "src")
          .and("include", "no_image.png");
        cy.get(".item").should("not.have.class", "skeleton");
        cy.get(".skeleton-poster").should("not.exist");
        cy.get(".skeleton-rate").should("not.exist");
        cy.get(".skeleton-title").should("not.exist");
      });
  });
});
