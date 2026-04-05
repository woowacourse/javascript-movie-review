export const getElement = (selector: string) => {
    const element = document.querySelector(selector)
    if (element instanceof HTMLElement) return element
    else throw new Error('element is not instance of HTMLElement')
}

export const getUListElement = (selector: string) => {
    const element = document.querySelector(selector)
    if (element instanceof HTMLUListElement) return element
    else throw new Error('element is not instance of HTMLUListElement')
}

export const getInputElement = (selector: string) => {
    const element = document.querySelector(selector)
    if (element instanceof HTMLInputElement) return element
    else throw new Error('element is not instance of HTMLInputElement')
}
