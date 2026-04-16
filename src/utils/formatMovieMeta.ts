export function formatMovieMeta(date: string, genres: Genre[] = []): string {
  const year = date.split("-")[0] || "";
  const genreNames = genres.map((genre) => genre.name).join(", ");

  if (!year) return genreNames;
  if (!genreNames) return year;

  return `${year} · ${genreNames}`;
}
