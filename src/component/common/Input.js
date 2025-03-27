function Input({ placeholder, eventName, id }) {
  return `
        <input type="text" id="${id}" name="${id}" placeholder="${placeholder}"></input>
    `
}

export default Input
