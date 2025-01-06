import { useEffect, useReducer } from "react";
import {
  getAll,
  getAllTags,
  getFilteredItems,
} from "../services/foodService.jsx";
import FeaturedItem from "./ui/featureditem.jsx";
import { Separator } from "./ui/separator.jsx";
import MenuItem from "./ui/menuitem.jsx";

import NotFound from "./NotFound/NotFound.jsx";
const initialState = { menu: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "MENU_LOADED":
      return { ...state, menu: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function MenuPage({ searchTerm, tag }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { menu } = state;

  useEffect(() => {
    //Loads all the sample food from foodService.js
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadMenu =
      tag || searchTerm ? getFilteredItems(searchTerm, tag) : getAll();

    loadMenu.then((menu) => dispatch({ type: "MENU_LOADED", payload: menu }));
  }, [searchTerm, tag]);

  return (
    <>
      {menu.length === 0 && <NotFound linkedText="Go back"></NotFound>}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Featured Items */}
          {menu.find((section) => section.category === "Featured Items") && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold">Featured Items</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menu
                  .find((section) => section.category === "Featured Items")
                  ?.items.map((item) => (
                    <FeaturedItem key={item.id} item={item}></FeaturedItem>
                  ))}
              </div>
            </div>
          )}
          <Separator />
          {/* Regular Menu Section */}
          {menu
            .filter((section) => section.category !== "Featured Items")
            .map((section) =>
              section.items.length > 0 ? (
                <div key={section.category}>
                  <h2 className="text-2xl font-semibold mb-6">
                    {section.category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.items.map((item) => (
                      <MenuItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </>
  );
}
