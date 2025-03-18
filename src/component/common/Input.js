function Input({placeholder, eventName}) {
    return `
        <input type="text" data-action="${eventName}" placeholder="${placeholder}"></input>
    `
}

export default Input