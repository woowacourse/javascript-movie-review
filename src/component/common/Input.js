function Input({placeholder, eventName}) {
    return `
        <inputm type="text" data-action="${eventName}" placeholder="${placeholder}"></input>
    `
}

export default Input