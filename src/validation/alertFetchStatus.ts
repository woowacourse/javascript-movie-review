export default function alertFetchStatus(status: number) {
  if (status >= 500) {
    window.alert('서버에서 영화 정보를 가져올 수 없습니다.');
    return true;
  } else if (status >= 400) {
    window.alert('페이지 정보를 가져올 수 없습니다.');
    return true;
  }

  return false;
}
