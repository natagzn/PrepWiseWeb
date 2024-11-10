const generateAvatarColor = (username) => {
  // Генерація випадкового кольору на основі username
  const hash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 30%, 70%)`;
};

// Функція для генерування аватарки з ініціалами
export const generateAvatar = (username) => {
  const initials = username ? username.slice(0, 2).toUpperCase() : 'N/A';
  const backgroundColor = generateAvatarColor(username);

  return {
    initials,
    backgroundColor,
  };
};
