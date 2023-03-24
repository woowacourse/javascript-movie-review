export const movieModalTemplate =
  /* html */
  `
		<movie-modal class="modal">
			<div class="modal-backdrop">
				<div class="modal-container">
					<div class="modal-header">
						<h2 class="item-title skeleton"></h2>
						<button type="button" class="escape-button" aria-label="escape">X</button>
					</div>
					<div class="modal-body">
						<div class="item-poster">
							<img class="item-thumbnail skeleton"/>
						</div>
						<div class="item-info">
							<div class="item-genre-score-plot">
								<div class="item-genre-score">
								</div>
							</div>
							<div class="self-grade">
							</div>
						</div>
					</div>
				</div>
			</div>
		</movie-modal>
	`;
