const MovieModal = (data) => {
  console.log(data);
  const poster =
    data.poster_path === null
      ? './assets/no_image.png'
      : `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  return `
        <div>
            <span>${data.title}</span>
            <button>X</button>
        </div>
        <div>
            <img class="item-thumbnail" src=${poster} alt="${data.title}" />
            <div>
                <div><img src="./assets/star_filled.png" alt="별점" />${data.vote_average}</div>
                <div>${data.overview}</div>
            </div>
        </div>
    `;
};

export default MovieModal;
