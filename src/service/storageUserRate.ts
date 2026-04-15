const Rating_Key = "user-rate";

export const loadUserRate = () => {
  const saved = localStorage.getItem(Rating_Key);

  if (!saved) return {};

  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }
};

export const saveUserRate = (rating: Record<number, number>) => {
  localStorage.setItem(Rating_Key, JSON.stringify(rating));
};
