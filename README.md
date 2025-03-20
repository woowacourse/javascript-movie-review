# javascript-movie-review

FE 레벨1 영화 리뷰 미션

# 구현 사항
- [X] 컴포넌트 분리
    - [X] 헤더
    - [X] 검색창
    - [X] 썸네일 리스트
    - [X] 평점
    - [X] 버튼
    - [X] 푸터
- [X] 기능
    - [X] 영화 목록 조회 (인기순)
        - [X] 로고 클릭시 첫 화면을 보여준다.
        - [X] 가장 상위 영화를 헤더 포스터에 보여준다.
        - [X] 한 번의 요청당 20개씩 영화 목록을 보여준다.
        - [X] 더보기 버튼을 누르면 그 다음의 영화 목록을 불러온다.
            - [X] 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
        - [X] Skeleton UI를 구현한다.
        - [X] 포스터가 없는 경우 기본 이미지를 보여준다.
    - [X] 검색
        - [X] 엔터키를 눌러 검색할 수 있다.
        - [X] 검색 버튼을 클릭하여 검색할 수 있다.
        - [X] 검색시 헤더 포스터가 없어진다.
    - [X] 오류
        - [X] 오류가 발생하는 경우에는 사용자를 위한 오류 메시지를 띄워 준다.
            - [X] API 요청 실패
            - [X] 검색 결과가 없는 경우