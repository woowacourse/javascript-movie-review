function Button(id, text){
    return `
        <a>
            <button id="${id}" class="primary" style="width: 120px">${text}</button>
        </a>
    `
}

export default Button;