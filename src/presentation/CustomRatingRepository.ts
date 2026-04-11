export const getCustomRate = (movieId: number) => {   
  const rate = localStorage.getItem(String(movieId))
  if(rate) return Number(rate)
  return null
};

export const saveCustomRate = (movieId: number, rating: number): void => {   
  localStorage.setItem(String(movieId), String(rating))
};

