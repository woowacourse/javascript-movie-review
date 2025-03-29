interface Movie {
  id: number;
  rating: number;
}

type SetItemProp = {
  id: number;
  rating: number;
};

export function updateRating({ id, rating }: SetItemProp) {
  const storedData = localStorage.getItem("MovieData");
  const movieList: Movie[] = storedData ? JSON.parse(storedData) : [];

  const isExisting = movieList.some((movie) => movie.id === id);
  const updatedList = isExisting
    ? movieList.map((movie) => (movie.id === id ? { id, rating } : movie))
    : [...movieList, { id, rating }];

  localStorage.setItem("MovieData", JSON.stringify(updatedList));
}

export function getRating(id: number): number {
  const storedData = localStorage.getItem("MovieData");
  if (!storedData) return 0;

  const movieList: Movie[] = JSON.parse(storedData);
  const movie = movieList.find((movie) => movie.id === id);

  return movie ? Number(movie.rating) : 0;
}
