# javascript-movie-review

FE 레벨1 영화관 미션 

<br>

## 시연 영상

![ezgif com-video-to-gif-converter](https://github.com/healim01/javascript-movie-review/assets/74346290/49546f9e-7206-4200-bd30-6c856b355ee4)

<br>

## 모듈 구조 
![모듈구조](https://github.com/healim01/javascript-movie-review/assets/74346290/f0868b16-e84d-478d-b8d1-b427d79ce086)

<br>

## 기능 목록

### 도메인 로직

#### APIClient

- api 데이터 받아오기
- 더보기 버튼 숨길지 보일지 결정

#### DataStateStore

- 데이터 관리
- 스택으로 관리
- 이전 데이터와 합쳐짐

### 영화 리스트 구현

- DataStateStore의 데이터를 받아와서 영화 리스트를 보여줌
- 스크롤: 스롤링 기능

### 영화 검색 기능

#### 검색 입력창

- enter 키, 검색 아이콘 클릭 시 검색 진행

#### 검색 결과에 따른 영화 리스트

- 검색 결과에 따라 영화 리스트와 타이틀 변경

### 더보기 버튼

- api를 통해 데이터를 불어올때, 다음 검색 대상이 존재하는지 여부에 따라 더보기 버튼을 숨기거나 보여줌
