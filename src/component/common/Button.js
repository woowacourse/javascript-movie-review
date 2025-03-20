function Button({content, eventName, type, width}) {
    return `
        <button type="${type}" style=${width ? `width: ${width}` : ""} class="primary" data-action="${eventName}">${content}</button>
    `;
}

export default Button;