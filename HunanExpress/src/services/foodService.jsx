import { menu, tags } from "./menuService";

export const getFilteredItems = async (searchTerm, tag) => {
  let filteredItems = menu;

  if (tag && tag !== "All") {
    filteredItems = filteredItems.filter((item) => item.tags.includes(tag));
  }

  if (searchTerm) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filteredItems;
};

export const getAll = async () => {
  return menu;
};

export const search = async (searchTerm) => {
  const searchResult = menu.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search based on name
  );
  return searchResult;
};

export const getAllTags = async () => {
  return tags;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") {
    return getAll();
  }
  const filteredByTag = menu.filter((item) => item.tags.includes(tag)); // Filter items by tag
  return filteredByTag;
};

export const getById = async (foodId) => {
  const foodItem = menu.find((item) => item.id === foodId);
  return foodItem;
};
