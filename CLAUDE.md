# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # 개발 서버 실행
npm run build        # TypeScript 타입 체크 후 Vite 빌드
npm run test-unit    # Vitest 단위 테스트 실행
npm run test-e2e     # Cypress E2E 테스트 실행 (UI)
npm run preview      # 빌드 결과물 미리보기
```

단위 테스트 단일 실행:
```bash
npx vitest run --reporter=verbose <파일명>
```

환경변수: `VITE_TMDB_API_TOKEN`이 `.env`에 필요 (TMDB API Bearer token).

## 아키텍처

3개 레이어로 구성되며 단방향 의존성을 유지한다. 아래 레이어는 위 레이어를 모른다.

```
Presentation  →  Domain  →  Data Source
```

### Data Source
- `src/movieAPIResponse.ts` — TMDB API fetch. 응답을 `MoviePage { results, totalPages }`로 정규화. 에러는 throw만 함. API 필드명(snake_case)은 이 파일 안에서만 존재해야 한다.

### Domain
- `src/domain/MovieBrowser.ts` — 순수 상태 기계. DOM/fetch 의존성 없음. 페이지네이션 상태, 검색 모드, 배너/버튼 표시 여부를 관리. 렌더러가 필요한 값(`showsBanner`, `sectionTitle`, `isNewSession`, `canLoadMore`)을 직접 계산해서 노출한다.

### Presentation
- `src/presentation/fetchStrategies.ts` — `FetchStrategy` 타입과 `popularStrategy` / `searchStrategy`. 모드별 fetch 전략을 교체 가능하게 분리.
- `src/presentation/MovieController.ts` — 이벤트 → 도메인 명령 → 렌더 흐름 조율. `#createNewRequest()`, `#applyResult()`, `#handleError()`로 분해됨. 에러 처리와 로딩 상태 관리 담당.
- `src/presentation/MovieRenderer.ts` — `MovieBrowser` 상태를 받아 DOM 반영. 도메인 상태를 해석하지 않고 그대로 사용. `startLoading()` / `stopLoading()`은 컨트롤러가 호출하고, `render()`는 데이터 표시만 담당.
- `src/eventListeners.ts` — DOM 이벤트 감지 및 keyword 추출. 유저 입력 검증(빈 keyword 필터)도 여기서 처리.
- `src/initTemplate.ts` — 앱 초기화 HTML 주입. App에서 최초 1회 호출.
- `src/App.ts` — 부팅만 담당. `initTemplate → initSearchSubmit → initLoadMore → loadPopular` 순서로 초기화.

## 핵심 설계 규칙

- **레이어 위반 금지**: 도메인이 DOM을 참조하거나, 렌더러가 fetch를 참조하면 안 된다.
- **도메인은 UI 결정을 내린다**: "배너를 보여야 하는가"(`showsBanner`), "섹션 제목이 무엇인가"(`sectionTitle`) 등은 렌더러가 판단하지 않고 도메인 getter에서 반환한다.
- **렌더러는 상태를 해석하지 않는다**: `render(state, movies)`는 `state.canLoadMore` 등을 그대로 사용하며, 모드를 직접 비교하는 분기(`if mode === 'search'`)를 가지면 안 된다.
- **FetchStrategy 교체로 모드 전환**: `search()`는 `#strategy`를 `searchStrategy`로 교체하고, `loadPopular()`는 `popularStrategy`를 유지한다. 컨트롤러 내부에 fetch 분기(`if mode`)가 없어야 한다.
