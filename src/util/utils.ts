type HTMLTagName = keyof HTMLElementTagNameMap

export const getHTML = (id: string) => document.getElementById(id) as HTMLElement

interface ICreateElementProps {
  tag: HTMLTagName
  id?: string
  className?: string
}
export const createElement = ({ tag, id, className }: ICreateElementProps) => {
  const element = document.createElement(tag)
  if (id) element.id = id
  if (className) element.className = className
  return element
}
