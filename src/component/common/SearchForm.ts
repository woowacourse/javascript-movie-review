import Input from './Input.js'
import { getHTML } from '../../util/utils.js'

async function SearchForm(targetId: string) {
  const formId = 'searchForm'
  let searchCallback: (keyword: string) => void = () => {}

  function onSearch(callback: (keyword: string) => void) {
    searchCallback = callback
  }

  function getSearchData(event: Event): void {
    event.preventDefault()
    const form = getHTML(formId)
    const formData = new FormData(form)
    const searchKeyword = String(formData.get('searchInput'))
    searchCallback(searchKeyword)
  }

  function setEvent() {
    getHTML(formId).removeEventListener('submit', getSearchData)
    getHTML(formId).addEventListener('submit', getSearchData)
  }

  function template() {
    return `
        <form class="search-input-box" id="${formId}">
            ${Input({ placeholder: '검색어를 입력하세요', id: 'searchInput' })}
            <button type="submit">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 14L10 10M11.3333 6.66667C11.3333 9.244 9.244 11.3333 6.66667 11.3333C4.08934 11.3333 2 9.244 2 6.66667C2 4.08934 4.08934 2 6.66667 2C9.244 2 11.3333 4.08934 11.3333 6.66667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </form>
        `
  }

  function render() {
    const container = getHTML(targetId)
    const searchFormtemplate = template()
    container.innerHTML = searchFormtemplate
    setEvent()
  }

  return { render, onSearch }
}

export default SearchForm
