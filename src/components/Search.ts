export function Search() {
  return `
        <form class="search-box">
            <input type="text" placeholder="검색" name="keyword" id="keyword" required/>
            <button type="submit" class="search-button">검색</button>
        </form>
     `;
}
