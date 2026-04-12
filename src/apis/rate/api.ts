import { CreateMovieRateParameter, GetMovieRateParameter, Rate, UpdateMovieRateParameter } from "./type.ts";

const RATE_KEY = "rate";

const getRates = (): Record<string, number> => {
  return JSON.parse(localStorage.getItem(RATE_KEY) ?? "{}");
};

export const getRate = async ({
  movieId,
}: GetMovieRateParameter): Promise<Rate> => {
  const rate = getRates()[movieId];
  return { rate: rate ?? null };
};

export const createRate = async ({
  movieId,
  rate,
}: CreateMovieRateParameter) => {
  const rates = getRates();
  localStorage.setItem(RATE_KEY, JSON.stringify({ ...rates, [movieId]: rate }));
};

export const updateRate = async ({
  movieId,
  rate,
}: UpdateMovieRateParameter) => {
  const rates = getRates();
  localStorage.setItem(RATE_KEY, JSON.stringify({ ...rates, [movieId]: rate }));
};
