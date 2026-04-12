// 영화 포스터 , 영화 제목, 영화 장르, 별점, 줄거리 정보를 담은 영화 상세 정보 모달을 렌더링
// MovieDetailModal.render(data);  
import { MovieDetail } from "../../../types/types";
import { THUMB_NAIL_URL } from "../../constants/constant";

export default class MovieDetailModal {
   div = document.createElement("div");

    reset(){
        this.div.innerHTML="";
    }

    render(data: MovieDetail){
        // 포스터
        // 내용
        // - 제목
        // - 영화 제목
        // - 장르
        // - 평균 별점
        // - 내 별점
        // - 줄거리 
        this.div.className = "modal";
        this.div.innerHTML = /*html*/`<div class="modal-container">
            <img class="modal-image" src="${THUMB_NAIL_URL}${data.poster_path}" alt="${data.title}">
            <div class="modal-description">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-release-date">${data.release_date}</p>
                <p class="modal-genres">${data.genres.map(genre => genre.name).join(", ")}</p>
                <p class="modal-rating">평균 별점: ${data.vote_average.toFixed(1)}</p>
                </hr>
                <p class ="modal-user-rating">내 별점: </p>
                <p class="modal-overview">${data.overview}</p>
            </div>
        </div>`;
        document.body.appendChild(this.div);
    }
}
