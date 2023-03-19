function WholeScreenMessageAlert(message: string) {
  return `<div class="alert-container">
    <p class="alert-message alert-title">${message}</p>
    
    <p class="alert-message alert-sub-title">❌ 새로고침 부탁드립니다.</p>
    <p class="alert-message alert-sub-title">❌ 네트워크 상태 확인 부탁드립니다.</p>
    <p class="alert-message alert-sub-title">❌ 02-000-0000으로 연락 주세요. 불편함을 드려 죄송합니다.</p>
  </div>`;
}

export default WholeScreenMessageAlert;
