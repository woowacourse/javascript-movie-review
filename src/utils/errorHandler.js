import toast from "../components/toast/toast";
import view from "../view/view";

const errorHandler = (code) => {
  view.hideSkeleton();
  if (code >= 400 && code < 500){
    toast('클라이언트 오류: 다시 접속해주세요.');
  } else if (code >= 500 && code < 600){
    toast('서버 오류: 다시 접속해주세요.');
  } else if (code === 'Failed to fetch') {
    toast('이 서비스는 일시적으로 오프라인 상태입니다. 네트워크를 확인해주세요.');
  } else {
    toast('예기치 못 한 오류가 생겼습니다. 다시 접속해주세요.');
  }
}

export default errorHandler;
