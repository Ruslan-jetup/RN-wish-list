export const wishCountTitleConfig = (wishesCount: number) => {
  switch (wishesCount) {
    case 0:
      return '0 wishes';
    case 1:
      return '1 wish';
    default:
      return `${wishesCount || 0} wishes`;
  }
};
