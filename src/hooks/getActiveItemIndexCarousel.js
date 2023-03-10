function getActiveItemIndexCarousel(index, items, count) {
  if (index < 0) {
    return 0;
  } else if (index >= items - count) {
    return items - count;
  } else {
    return index;
  }
}

export default getActiveItemIndexCarousel;
