import ErrorPage from "../../../shared/ui/components/ErrorPage";

const url = (page: number) =>
  `https://api.themoviedb.org/3/tv/popular?page=${page}`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const getMovieList = async ({ page }: { page: number }) => {
  try {
    const response = await fetch(url(page), options);

    if (!response.ok) {
      throw new Error("Failed to fetch movie list");
    }

    return response.json();
  } catch (error) {
    const $container = document.querySelector(".container");
    $container!.replaceChildren(ErrorPage());
  }
};
