import { useState } from "react";

import { MAX_PRODUCT_PRICE } from "../constants";

export default function useFilters() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("category");
  const [priceLimit, setPriceLimit] = useState(MAX_PRODUCT_PRICE);

  const clearFilters = () => {
    setFilterText("");
    setInStockOnly(false);
    setSortBy("category");
  setPriceLimit(MAX_PRODUCT_PRICE);
  };

  return {
    filterText,
    inStockOnly,
    sortBy,
  priceLimit,
    setFilterText,
    setInStockOnly,
    setSortBy,
  setPriceLimit,
    clearFilters,
  };
}
