export function getImageContainerTemplate(imagePath: string, title: string) {
  return /*html*/ `
    <div class="modal-image-container">
    ${
      imagePath
        ? /*html */
          `<img 
            class="modal-image skeleton" 
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${imagePath}" 
            alt="${title} 포스터" 
        />`
        : /*html */
          `<div 
            class="modal-image center" 
            style="
                background-color:white; 
                color:black; 
                display:flex; 
                justify-content:center; 
                align-items:center; 
                font-weight:600; 
                font-size:24px;
                border-radius: 16px;
                "
        >
            <span>No Image</span>
        </div>`
    }
    </div>
  `;
}
