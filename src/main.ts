import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import SearchInput from "./components/SearchInput";
import Skeleton from "./components/Skeleton";
import { $ } from "./utils/dom";
import { fetchMovies } from "./store/movieService";
import { getState } from "./store/movieStore";
import { renderMovies } from "./ui/movieUI";

document.addEventListener("DOMContentLoaded", async () => {
  const $main = $("main");
  const $wrap = $("#wrap");
  if (!$main || !$wrap) return;

  const header = Header({ movie: null });
  $wrap.prepend(header);

  const searchInput = SearchInput({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onSubmit: async (query: string) => {
      if (!query.trim()) {
        alert("검색어를 입력하세요.");
        return;
      }
      await fetchMovies(1, query.trim(), true);
      renderMovies($main);

      const { list } = getState();

      if (list.length > 0) {
        const updatedHeader = Header({ movie: list[0] });
        header.replaceWith(updatedHeader);
      }
    },
  });

  const handleClickLogo = () => {
    location.reload();
  };

  const navigationBar = NavigationBar({
    input: searchInput,
    onClick: handleClickLogo,
  });

  $wrap.prepend(navigationBar);

  const container = $(".container");
  if (!container) return;

  const loadInitialMovies = async () => {
    Skeleton.render($main);
    await fetchMovies(1, "", true);
    renderMovies($main);

    const { list } = getState();
    if (list.length > 0) {
      const updatedHeader = Header({ movie: list[0] });
      header.replaceWith(updatedHeader);
    }
  };

  loadInitialMovies();
});
