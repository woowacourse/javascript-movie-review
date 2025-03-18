function Button({content, eventName, type}) {
    return `
        <button type="${type}" class="primary" data-action="${eventName}">${content}</button>
    `;
}