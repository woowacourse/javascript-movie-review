describe("영화 모달 테스트", () => {
  beforeEach(() => {
    cy.mockPopularMovies(1);
    cy.getMovieDetail(83533);
    cy.visit("/");
  });

  it("인기 있는 영화 목록이 호출이 되는지 테스트한다.", () => {
    cy.wait("@getPopularMoviesPage1").its("response.body.results").should("be.an", "array");
  });

  it("영화 id가 83533인 영화를 클릭했을 때, 해당 영화의 상세 정보를 불러오는지 테스트한다.", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.wait("@getMovieDetail83533");
    cy.get(".modal").should("exist");
  });

  it("모달 안에 제목, 별점, 내용이 있는지 확인하는 테스트", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.get(".modal").should("exist");
    cy.wait("@getMovieDetail83533")
      .its("response.body")
      .then((movieDetail) => {
        cy.get(".modal-description-title").should("contain", movieDetail.title);
        cy.get("#modal-description-year").should("contain", movieDetail.release_date.split("-")[0]);
        cy.get("#modal-description-genre").should("contain", movieDetail.genres.map((item: {id: Number, name: string}) => item.name).join(", "));
        cy.get("#modal-rate-number").should("contain", movieDetail.vote_average.toFixed(1));
        cy.get("#modal-detail-description").should("contain", movieDetail.overview);
      });
  });

  it ("모달 창의 닫기 버튼을 눌렀을 때 닫히는지 테스트", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.get(".modal").should("exist");
    cy.wait("@getMovieDetail83533")
    cy.get(".close-modal").click();
    cy.get(".modal-background").should("not.be.visible");
  });

  it ("모달 창의 ESC를 눌렀을 때 닫히는지 테스트", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.get(".modal").should("exist");
    cy.wait("@getMovieDetail83533")
    cy.get("body").type('{esc}');
    cy.get(".modal-background").should("not.be.visible");
  });
});

describe("나의 평점 테스트", () => {
  beforeEach(() => {
    cy.mockPopularMovies(1);
    cy.getMovieDetail(83533);
    cy.visit("/");
  });

  it("별 이미지를 클릭한만큼 나의 평점 설정 가능 테스트", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.wait("@getMovieDetail83533");
    cy.get(".modal").should("exist");
    const evaluation: Record<number, string> = {
      0: "나의 별점을 눌러보세요.",
      1: "최악이예요",
      2: "별로예요",
      3: "보통이에요",
      4: "재미있어요",
      5: "명작이에요",
    };
    for (let i = 1; i <= 5; i++) {
      cy.get(`#my-star-image-${i}`).click();
      cy.get("#my-star-evaluation").should("contain", evaluation[i])
      cy.get("#my-star-score").should("contain", `${i * 2} / 10`);
      
      for (let j = 1; j <= 5; j++) {
        if (j <= i) {
          cy.get(`#my-star-image-${j}`)
            .should("have.attr", "src")
            .and("include", "star_filled.png")
        } else {
          cy.get(`#my-star-image-${j}`)
            .should("have.attr", "src")
            .and("include", "star_empty.png")
        }
      };
    };
  });

it("별 이미지를 클릭한만큼 나의 평점이 localstorage에 저장되는지 테스트", () => {
    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.wait("@getMovieDetail83533");
    cy.get(".modal").should("exist");
    const evaluation: Record<number, string> = {
      0: "나의 별점을 눌러보세요.",
      1: "최악이예요",
      2: "별로예요",
      3: "보통이에요",
      4: "재미있어요",
      5: "명작이에요",
    };
    for (let i = 1; i <= 5; i++) {
      cy.get(`#my-star-image-${i}`).click();
      cy.get("#my-star-evaluation").should("contain", evaluation[i])
      cy.get("#my-star-score").should("contain", `${i * 2} / 10`);
      cy.window().its("localStorage").invoke("getItem", 83533).should("eq", `${i * 2}`);

      for (let j = 1; j <= 5; j++) {
        if (j <= i) {
          cy.get(`#my-star-image-${j}`)
            .should("have.attr", "src")
            .and("include", "star_filled.png")
        } else {
          cy.get(`#my-star-image-${j}`)
            .should("have.attr", "src")
            .and("include", "star_empty.png")
        }
      };
    };
  });

  it("local storage에 이미 평점이 있다면, 모달을 열었을 때 해당 평점이 화면에 반영되는 테스트", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("83533", "10");
      },
    });

    cy.wait("@getPopularMoviesPage1");
    cy.get(`[data-movie-id=83533]`).click();
    cy.wait("@getMovieDetail83533");

    cy.get("#my-star-evaluation").should("contain", "명작이에요");
    cy.get("#my-star-score").should("contain", "10 / 10");
    cy.get(`#my-star-image-5`).should("have.attr", "src").and("include", "star_filled.png");
  });
});
