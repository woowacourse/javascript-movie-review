import view from "../view/view";

const errorHandler = (code) => {
  view.hideSkeleton();
  if (code === 'Invalid API key: You must be granted a valid key.'){
    toast('서비스에 접근할 수 있는 권한이 없습니다. API 키를 다시 발급 받아주세요.');
  } else if (code === 'Failed to fetch') {
    toast('이 서비스는 일시적으로 오프라인 상태입니다. 네트워크를 확인해주세요.');
  } else {
    toast('예기치 못 한 오류가 생겼습니다. 다시 접속해주세요.');
  }
}

export default errorHandler