function saveMovieRating(key: string, value: string) {
  localStorage.setItem(key, value);
}

function loadMovieRating(key: string) {
  return localStorage.getItem(key);
}

export { saveMovieRating, loadMovieRating };
