import { useEffect, useReducer } from "react";
import {
  getAll,
  getAllTags,
  getFilteredItems,
} from "../services/foodService.jsx";
import FeaturedItem from "../components/ui/featureditem.jsx";
import { Separator } from "../components/ui/separator.jsx";
import MenuItem from "../components/ui/menuitem.jsx";

import NotFound from "../components/NotFound/NotFound.jsx";
const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function MenuPage({ searchTerm, tag }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;

  useEffect(() => {
    //Loads all the sample food from foodService.js
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );
    const loadFoods =
      tag || searchTerm ? getFilteredItems(searchTerm, tag) : getAll();

    loadFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm, tag]);

  return (
    //Handles base page, with search bar and tags
    <>
      {foods.length === 0 && <NotFound linkedText="Go back"></NotFound>}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Featured Items */}
          {foods.find((section) => section.category === "Featured Items") && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-semibold">Featured Items</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {foods
                  .find((section) => section.category === "Featured Items")
                  ?.items.map((item) => (
                    <FeaturedItem key={item.id} item={item}></FeaturedItem>
                  ))}
              </div>
            </div>
          )}
          <Separator />
          {/* Regular Menu Section */}
          {foods
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
