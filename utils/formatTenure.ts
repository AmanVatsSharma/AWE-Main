import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

export function formatTenure(createdAt) {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const days = differenceInDays(now, createdDate);
  const months = differenceInMonths(now, createdDate);
  const years = differenceInYears(now, createdDate);

  if (days < 30) {
    return `Customer for ${days} day${days !== 1 ? 's' : ''}`;
  } else if (months < 12) {
    const remainingDays = days % 30;
    if (remainingDays === 0) {
      return `Customer for ${months} month${months !== 1 ? 's' : ''}`;
    } else {
      return `Customer for ${months} month${months !== 1 ? 's' : ''} ${remainingDays} day${remainingDays !== 1 ? 's' : ''}`;
    }
  } else {
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `Customer for ${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `Customer for ${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
}