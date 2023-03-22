const MovieModal = (data, genreData) => {
  const poster =
    data.poster_path === null
      ? './assets/no_image.png'
      : `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  const genres = data.genre_ids
    .map((id) => {
      return genreData[id];
    })
    .join(', ');
  console.log(genres);
  return `
        <div class="modal-container">
            <span>${data.title}</span>
            <button>X</button>
        </div>
        <div>
            <img class="item-thumbnail" src=${poster} alt="${data.title}" />
            <div>
                <div>
                    <div>${genres}<img src="./assets/star_filled.png" alt="별점" />${data.vote_average}</div>
                    <div>${data.overview}</div>
                </div>
                <div>
                    내 별점
                    <span>
                        <img src="./assets/star_filled.png" alt="별점" />
                        <img src="./assets/star_filled.png" alt="별점" />
                        <img src="./assets/star_filled.png" alt="별점" />
                        <img src="./assets/star_filled.png" alt="별점" />
                        <img src="./assets/star_filled.png" alt="별점" />
                        5
                    </span>
                    보통이에요
                </div>
            </div>
        </div>
    `;
};

export default MovieModal;
