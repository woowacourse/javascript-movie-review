import { fetchMovieDetail } from '../service/movieApi.ts';
import { getElement } from '../view/getElementView.ts';
import { Movie, showBackgroundMovieInfo, updateMyStarRate } from '../view/movieListView.ts';
import { StarRatingStore } from '../storage/StarRatingStorage.ts';

class ModalController {
    private currentMovieId = 0;

    bindModalOnOffEvent = (storage: StarRatingStore) => {
        const thumbnailBox = getElement('.thumbnail-list');
        const modalBackground = getElement('#modalBackground');

        // 모달 열기
        thumbnailBox.addEventListener('click', async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const item = target.closest('li') as HTMLElement;
            if (!item?.dataset.id) return;

            const movie = await fetchMovieDetail(Number(item.dataset.id));
            this.filledModalInfo(storage, movie);

            modalBackground.classList.add('active');
            document.body.classList.add('modal-open');
        });

        // 모달 닫기 - X 버튼
        getElement('#closeModal').addEventListener('click', () => {
            modalBackground.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        // 모달 닫기 - 배경 클릭
        modalBackground.addEventListener('click', (event: MouseEvent) => {
            if (event.target === modalBackground) {
                modalBackground.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    };

    filledModalInfo = (storage: StarRatingStore, movie: Movie) => {
        this.currentMovieId = movie.id;
        const modalPoster = getElement('#modalPoster') as HTMLImageElement;
        showBackgroundMovieInfo(movie);
        modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        getElement('#modalTitle').textContent = movie.title;
        getElement('#modalCategory').textContent =
            `${movie.release_date.slice(0, 4)} · ${movie.genres.map((g) => g.name).join(', ')}`;
        getElement('#modalRate').textContent = String(movie.vote_average.toFixed(1));
        getElement('#modalDetail').textContent = movie.overview;

        const savedRate = storage.get(movie.id);
        updateMyStarRate(savedRate ?? '0');
    };

    bindClickStarEvent = (storage: StarRatingStore) => {
        // 별점 클릭 - 한 번만 등록
        const emptyStars = document.querySelectorAll<HTMLElement>('.star-icon');
        emptyStars.forEach((star: HTMLElement) => {
            star.addEventListener('click', () => {
                const starValue = star.dataset.value;
                storage.set(this.currentMovieId, starValue ?? '');
                updateMyStarRate(starValue ?? '');
            });
        });
    };
}

export default ModalController;
