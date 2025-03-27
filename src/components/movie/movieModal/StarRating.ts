// const $rateBox = this.modalElement.querySelector(".rate-box") as HTMLDivElement;
// $rateBox.replaceChildren(); // 기존 별점, 코멘트 삭제

// // 새 별들 생성
// for (let i = 0; i < 5; i++) {
//   const $newStar = document.createElement("img");
//   $newStar.classList.add("star");
//   $newStar.src = i < 3 ? "./images/star_filled.png" : "./images/star_empty.png";
//   $rateBox.appendChild($newStar);
// }

// // 코멘트도 다시 추가
// const $newComment = document.createElement("p");
// $newComment.classList.add("comment");
// $newComment.textContent = "보통이에요";

// $rateBox.appendChild($newComment);

// const $starElements = $rateBox.querySelectorAll(".star");

// $starElements.forEach((star, index) => {
//   star.addEventListener("click", () => {
//     console.log(index + 1);
//     $stars.replaceChildren();

//     const filledCount = index + 1;
//     const emptyCount = 5 - filledCount;

//     for (let i = 0; i < filledCount; i++) {
//       const $countedStar = createElement({
//         tag: "img",
//         classNames: ["star"],
//         src: "./images/star_filled.png",
//       });

//       // ⭐ 새 별에 이벤트 다시 등록
//       $countedStar.addEventListener("click", () => {
//         console.log(i + 1);
//       });

//       $stars.appendChild($countedStar);
//     }

//     for (let i = 0; i < emptyCount; i++) {
//       const $unCountedStar = createElement({
//         tag: "img",
//         classNames: ["star"],
//         src: "./images/star_empty.png",
//       });

//       // ⭐ 새 별에 이벤트 다시 등록
//       $unCountedStar.addEventListener("click", () => {
//         console.log(filledCount + i + 1);
//       });

//       $stars.appendChild($unCountedStar);
//     }
//   });
// });
