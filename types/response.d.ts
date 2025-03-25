export type Response =
  | {
      status: "success";
      data: MovieResponse;
    }
  | {
      status: "fail";
      data: [];
    };
