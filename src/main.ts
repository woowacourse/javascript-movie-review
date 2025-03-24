import MovieItem from "./components/MovieItem";

addEventListener("load", () => {
  const wrap = document.querySelector("#wrap");

  if (wrap) {
    document.querySelector(".thumbnail-list")?.appendChild(
      MovieItem.create({
        id: 696506,
        posterPath:
          "https://media.themoviedb.org/t/p/w440_and_h660_face/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
        rate: 7.0,
        title: "미키 17",
      })
    );
  }
});
