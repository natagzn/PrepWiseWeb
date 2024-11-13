// utils/formatDate.js

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const [year, month, day] = dateString.slice(0, 10).split('-');
  return `${day}.${month}.${year}`;
};
