function TabButton({ id, content, href, eventName }) {
  return `
        <a href=${href}>
            <div id="${id}" class="tab-item">
                <h3>${content}</h3>
            </div>
        </a>
    `
}

export default TabButton
