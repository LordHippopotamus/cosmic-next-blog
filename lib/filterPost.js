export const filterPosts = (posts, category, tag) =>
  posts.filter((el) => {
    if (category && tag) {
      const isCategoryMatch = el.metadata.category.id === category;
      const isTagMatch = el.metadata.tags.find((tagsEl) => tagsEl.id === tag);
      return isCategoryMatch && isTagMatch;
    }
    if (category) {
      return el.metadata.category.id === category;
    }
    if (tag) {
      return el.metadata.tags.find((tagsEl) => tagsEl.id === tag);
    }
    return true;
  });
