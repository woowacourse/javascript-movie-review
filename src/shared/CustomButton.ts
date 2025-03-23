interface ButtonField {
  type: "button" | "submit";
  className: string;
  content: string;
}

export const ADD_MOVIE_BUTTON: ButtonField = {
  type: "button",
  className: "primary add-movie",
  content: "더보기",
};
