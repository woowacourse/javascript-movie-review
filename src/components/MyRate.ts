import { StarRate } from "./MovieItemModal";
import Stars from "./Stars";

const STAR_MESSAGES: Record<StarRate, string> = {
    0: "아직 평가하지 않았어요",
    1: "최악이예요",
    2: "별로예요",
    3: "보통이에요",
    4: "재미있어요",
    5: "명작이에요",
} as const;


export default function MyRate(rate: StarRate, id: string): string {
    return `
        <div class="my-rate" data-id="${id}">
            <p>내 별점</p>
            ${Stars(rate, id)}
            <span>${STAR_MESSAGES[rate]}</span>
            <span>(${rate * 2} / 10)</span>
        </div>
    `;
}