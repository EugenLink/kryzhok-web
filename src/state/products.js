import { combine, createEffect, createEvent, createStore } from "effector";

export const getProducts = createEffect(async () => {
  const url = `https://volga24bot.com/cgi-bin/product/getAll.php?`;
  const req = await fetch(url);

  return req.json();
});

export const $products = createStore([]).on(
  getProducts.doneData,
  (_, data) => data
);

export const setValue = createEvent();

export const $value = createStore("").on(setValue, (_, payload) => payload);

export const $searchItems = combine(
  $products,
  getProducts.pending,
  $value,
  (data, isLoading, value) => {
    if (isLoading) {
      return "loading";
    } else {
      if (value.length < 3) {
        return null;
      } else {
        return data.filter(
          (el) =>
            el.Chapter.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            el.Name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            el.Model.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            el.PreChapter.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      }
    }
  }
);
