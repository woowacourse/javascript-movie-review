import { createElement, getHTML } from '../../util/utils'

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
