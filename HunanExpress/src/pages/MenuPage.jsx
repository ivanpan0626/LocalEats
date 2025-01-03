import { useEffect, useReducer } from "react";
import {
  getAll,
  getAllTags,
  getFilteredItems,
} from "../services/foodService.jsx";
import MenuItem from "../components/MenuItem.jsx";

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
      <div className="w-full max-w-[1400px] mx-auto bg-gray-50 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {foods.map((food) => (
            <MenuItem food={food} />
          ))}
        </div>
      </div>
    </>
  );
}
