export function getRatingToString(rating: number): string {
  switch (rating) {
    case 10:
      return "명작이에요";
    case 8:
      return "재미있어요";
    case 6:
      return "보통이에요";
    case 4:
      return "별로에요";
    case 2:
      return "최악이에요";
    default:
      return "";
  }
}
