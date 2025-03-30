import { createElement, getHTML } from '../../util/utils'

function ScrollObserver(targetId: string, onIntersect) {
  const container = getHTML(targetId)
  let observer = null

  function render() {
    console.log('스크롤옵저버 몇번 렌더되는지 추적용 로그')
    const observerTrigger = createElement({
      tag: 'div',
      id: 'observerTrigger',
      className: 'observer-trigger',
    })
    container.appendChild(observerTrigger)
    setFunction()
  }

  function hideTrigger() {
    const observerTrigger = container.querySelector('#observerTrigger')
    if (observerTrigger) observerTrigger.style.display = 'none'
  }

  function setFunction() {
    const observerTrigger = container.querySelector('#observerTrigger')
    if (!observerTrigger) return
    if (observer) observer.disconnect()

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
