export const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};