import { createElement, getHTML } from '../../util/utils'

/**
 * ScrollObserver는 observerTrigger가 뷰포트에 100% 노출될 때
 * onIntersect 콜백 함수를 실행하는 IntersectionObserver 기반 컴포넌트입니다.
 *
 * ⚠️ 주의:
 * - 한 인스턴스는 단 **하나의 targetId**에만 사용할 수 있습니다.
 *   동일 인스턴스로 여러 target을 등록하려 하면 예기치 않은 동작이 발생할 수 있습니다.
 *   container의 상태를 함수 내 전역으로 관리하고 있기 때문입니다.
 * - `render()`가 실행되어 DOM에 옵저버 트리거가 생성된 이후에만 `hideTrigger()` 호출이 가능합니다.
 *
 * @returns {{
 *   render: (targetId: string, onIntersect: () => void) => void,
 *   hideTrigger: () => void
 * }}
 */

function ScrollObserver() {
  let observer = null
  let container = null

  function render(targetId: string, onIntersect) {
    container = getHTML(targetId)
    const observerTrigger = createElement({
      tag: 'div',
      id: 'observerTrigger',
      className: 'observer-trigger',
    })
    if (observer) observer.disconnect()
    container.appendChild(observerTrigger)
    setFunction(onIntersect)
  }

  function hideTrigger() {
    const observerTrigger = container.querySelector('#observerTrigger')
    if (observerTrigger) observerTrigger.style.display = 'none'
  }

  function setFunction(onIntersect) {
    const observerTrigger = container.querySelector('#observerTrigger')
    if (!observerTrigger) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect()
          }
        })
      },
      {
        root: null,
        threshold: 1.0,
      }
    )

    observer.observe(observerTrigger)
  }

  return { render, hideTrigger }
}

export default ScrollObserver
