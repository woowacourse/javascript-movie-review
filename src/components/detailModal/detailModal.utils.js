export function getYear(date) {
  return date.slice(0, 4);
}

export function getGenre(genres) {
  return genres.map((genre) => genre.name);
}
