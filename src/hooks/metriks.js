export const sendMetrik = (type, method, value) => {
  console.log(type, method, { Поиск: value });
  window.ym(96005951, type, method, { Поиск: value });
};
