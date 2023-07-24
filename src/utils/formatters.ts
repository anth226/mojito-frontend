import dayjs from 'dayjs';

export const USDcurrency = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const DateFormat = (dateStr: string | Date) => {
  const date = new Date(dateStr);

  const today = new Date();

  const timeDifference = today.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const monthsDifference =
    today.getMonth() -
    date.getMonth() +
    12 * (today.getFullYear() - date.getFullYear());

  if (daysDifference === 0) {
    return 'Today';
  } else if (daysDifference > 0 && daysDifference <= 30) {
    return `${daysDifference} days ago`;
  } else if (monthsDifference >= 1 && monthsDifference <= 12) {
    return `${monthsDifference} month ago`;
  } else {
    return dayjs(date).format('DD.MM.YYYY');
  }
};
