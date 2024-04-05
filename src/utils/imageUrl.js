const sizes = {
  small: 'w220_and_h330_face',
  large: 'w500'
};

const imageUrl = (size, posterPath) => {
  return `https://image.tmdb.org/t/p/${sizes[size]}/${posterPath}.jpg`;
};

export default imageUrl;
