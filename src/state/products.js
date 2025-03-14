import { createStore, createEvent } from "effector";

// Создаем событие для обновления данных пользователя
export const setUser = createEvent();

// Создаем хранилище для данных пользователя
export const $user = createStore(null).on(setUser, (_, user) => user);

export const setLiked = createEvent();

// Создаем хранилище для данных пользователя
export const $liked = createStore("").on(setLiked, (_, liked) => liked);
