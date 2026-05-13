export const CATALOG_DEFAULT_PAGE = 1;
export const CATALOG_DEFAULT_SORT = "newest";
export const CATALOG_DEFAULT_MAX_PRICE = 1000;

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => String(item || "").split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const parseCatalogQuery = (query = {}) => {
  const maxPrice = toPositiveInt(query.maxPrice, CATALOG_DEFAULT_MAX_PRICE);
  const minPrice = Number.parseInt(query.minPrice, 10);
  const sortBy = String(query.sort || CATALOG_DEFAULT_SORT).trim() || CATALOG_DEFAULT_SORT;

  return {
    searchQuery: String(query.q || "").trim(),
    selectedCategories: toArray(query.categories),
    selectedLevels: toArray(query.levels),
    priceRange: [Number.isFinite(minPrice) && minPrice >= 0 ? minPrice : 0, maxPrice],
    sortBy,
    currentPage: toPositiveInt(query.page, CATALOG_DEFAULT_PAGE)
  };
};

export const buildCatalogQuery = (state) => {
  const query = {};

  if (state.searchQuery.trim()) {
    query.q = state.searchQuery.trim();
  }

  if (state.selectedCategories.length) {
    query.categories = state.selectedCategories.join(",");
  }

  if (state.selectedLevels.length) {
    query.levels = state.selectedLevels.join(",");
  }

  if (state.priceRange[0] > 0) {
    query.minPrice = String(state.priceRange[0]);
  }

  if (state.priceRange[1] < CATALOG_DEFAULT_MAX_PRICE) {
    query.maxPrice = String(state.priceRange[1]);
  }

  if (state.sortBy !== CATALOG_DEFAULT_SORT) {
    query.sort = state.sortBy;
  }

  if (state.currentPage > CATALOG_DEFAULT_PAGE) {
    query.page = String(state.currentPage);
  }

  return query;
};
