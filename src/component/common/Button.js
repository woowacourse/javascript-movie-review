function Button({ content, ...rest }) {
  const attributes = Object.entries(rest)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
  return `
        <button class="primary detail" ${attributes}>${content}</button>
    `
}

export default Button
