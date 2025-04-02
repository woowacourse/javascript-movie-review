// import StarButton from "./StarButton.js";
// import { RATING_MESSAGES } from "../../constant/constant.js";
// import createStorage from "../../storage/createStorage.js";

// function MyRating(title) {
//     const ratingData = createStorage(`${title}`);
//     const data = ratingData.get();
//     const rating = data ?? "fallback";
//     const stars = Array.from({ length: 5 }, (_, i) => 
//         i <= rating ? StarButton(true, i) : StarButton(false, i)
//     ).join("");


//     function starEvent(titlee){
//         const starEls = document.querySelectorAll(".star-button");


//         function updateMyRating(titlee) {
//             const myRating = MyRating(titlee);
//             document.querySelector(".my-rating-container").innerHTML = myRating;
//         }

//         starEls.forEach((movieListEl) => {
//             movieListEl.addEventListener("click", async (event) => {
//                 ratingData.set(movieListEl.id);
//                 const myRating = MyRating(titlee);

//                 document.querySelector(".my-rating-container").innerHTML = myRating;
//             });
//         });
//     }

//     const myRatingtemplate = `
//     <div class="my-rating">
//         <div style="display: flex;">
//              ${stars}
//         </div>
//         <div  style="display: flex; gap: 10px;">
//             <div >${RATING_MESSAGES[rating].comment}</div>
//             <div class="my-rating-text">${RATING_MESSAGES[rating].rating}/10</div>
//         </div>
//     </div>
//     `


//     return {myRatingtemplate, starEvent};
// }

// export default MyRating;




import StarButton from "./StarButton.js";
import { RATING_MESSAGES } from "../../constant/constant.js";
import createStorage from "../../storage/createStorage.js";

function MyRating(title) {
    const ratingData = createStorage(title);
    const data = ratingData.get();
    const rating = data ?? "fallback";
    
    const stars = Array.from({ length: 5 }, (_, i) => 
        i <= rating ? StarButton(true, i) : StarButton(false, i)
    ).join("");

    function starEvent() {
        const starEls = document.querySelectorAll(".star-button");

        starEls.forEach((starEl) => {
            starEl.addEventListener("click", () => {
                ratingData.set(starEl.id);
                updateMyRating(title);
            });
        });
    }

    function updateMyRating(title) {
        const { myRatingtemplate, starEvent } = MyRating(title);
        const container = document.querySelector(".my-rating-container");
        
        if (container) {
            container.innerHTML = myRatingtemplate;
            starEvent();
        }
    }

    const myRatingtemplate = `
    <div class="my-rating">
        <div style="display: flex;">
             ${stars}
        </div>
        <div style="display: flex; gap: 10px;">
            <div>${RATING_MESSAGES[rating].comment}</div>
            <div class="my-rating-text">${RATING_MESSAGES[rating].rating}/10</div>
        </div>
    </div>
    `;

    return { myRatingtemplate, starEvent };
}

export default MyRating;
