module.exports = {
  presets: [
    '@babel/preset-env', // Перетворення ES6+ синтаксису в старіший JavaScript
    '@babel/preset-react', // Підтримка JSX синтаксису для React
  ],
  plugins: [
    '@babel/plugin-proposal-private-methods', // Якщо використовуєте приватні методи
    '@babel/plugin-proposal-private-property-in-object', // Для приватних властивостей в об'єктах
  ],
};
