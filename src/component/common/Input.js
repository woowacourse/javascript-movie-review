function Input({placeholder, eventName, id}) {
    return `
        <input type="text" id="${id}" name="${id}" data-action="${eventName}" placeholder="${placeholder}"></input>
    `
}

export default Input