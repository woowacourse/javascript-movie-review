export const Star = ({ $modalContainer, title }) => {
  const $stars = $modalContainer.querySelectorAll(".rate-star");
  let currentRating = 0;

  $stars.forEach((star, index) => {
    star.addEventListener("click", (event) => {
      event.stopPropagation();

      currentRating = index + 1;
      updateStarDisplay($stars, currentRating);
      saveRating(title, currentRating);
    });
  });

  const savedRating = getRating(title);
  if (savedRating) {
    currentRating = savedRating;
    updateStarDisplay($stars, currentRating);
  }

  function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.src = "./star_filled.png";
      } else {
        star.src = "./star_empty.png";
      }
    });
    const $userRate = $modalContainer.querySelector(".user_rate");

    const existingDescription = $userRate?.querySelector("div");
    if (existingDescription) {
      existingDescription.remove();
    }

    const rateDescription = document.createElement("div");
    rateDescription.classList.add("rate_description");
    switch (rating) {
      case 1:
        rateDescription.innerHTML = "최악이에요 (2/10)";
        break;
      case 2:
        rateDescription.innerHTML = "별로예요 (4/10)";
        break;
      case 3:
        rateDescription.innerHTML = "보통이에요 (6/10)";
        break;
      case 4:
        rateDescription.innerHTML = "재미있어요 (8/10)";
        break;
      case 5:
        rateDescription.innerHTML = "명작이에요 (10/10)";
        break;
    }
    $userRate?.appendChild(rateDescription);
  }

  function saveRating(movieTitle, rating) {
    const movieRatings = JSON.parse(
      localStorage.getItem("movieRatings") || "{}"
    );
    movieRatings[movieTitle] = rating;
    localStorage.setItem("movieRatings", JSON.stringify(movieRatings));
  }

  function getRating(movieTitle) {
    const movieRatings = JSON.parse(
      localStorage.getItem("movieRatings") || "{}"
    );
    return movieRatings[movieTitle] || null;
  }

  const cleanup = () => {
    $stars.forEach((star, index) => {
      star.removeEventListener("click", () => {});
    });
  };

  return {
    cleanup,
    currentRating,
  };
};
