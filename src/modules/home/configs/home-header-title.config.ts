export const homeHeaderTitleConfig = (hour: number): string => {
  switch (true) {
    case hour >= 0 && hour < 6:
      return 'Good night';
    case hour >= 6 && hour < 12:
      return 'Good morning';
    case hour >= 12 && hour < 18:
      return 'Good afternoon';
    default:
      return 'Good evening';
  }
};
