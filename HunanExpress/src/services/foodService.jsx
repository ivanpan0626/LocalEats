import { menu, tags } from "./menuService";

export const getFilteredItems = async (searchTerm, tag) => {
  console.log(searchTerm, tag);
  let filteredMenu = [];
  if (tag === "All" && searchTerm === "") {
    return menu;
  } else if (tag !== "All") {
    let categoryItems = menu;
    categoryItems = categoryItems.filter((section) =>
      section.category.includes(tag)
    );
    filteredMenu = categoryItems;
    if (searchTerm) {
      categoryItems = categoryItems[0].items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (categoryItems.length > 0) {
        filteredMenu = [{ category: tag, items: categoryItems }];
      }
      return filteredMenu;
    }
    return filteredMenu;
  } else {
    menu.map((section) => {
      let categoryItems = section.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (categoryItems.length > 0) {
        filteredMenu.push({ category: section.category, items: categoryItems });
      }
    });
    return filteredMenu;
  }
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
