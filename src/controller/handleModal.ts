import { getMovieDetails } from "../api/getMovieDetails";
import { errorMovieDetail } from "../services/errorMovieDetail";

export async function handleModal(clickedMovieId: string) {
  // 영화 상세정보 api
  const movieDetailsData = await getMovieDetails(Number(clickedMovieId));
  // 에러 확인
  if (!movieDetailsData.success) {
    errorMovieDetail(movieDetailsData.error);
    return;
  };
  // 상세보기 렌더링
  
}
