import { normalizeCourse } from "@/lib/normalizers";
import { catalogApi } from "@/modules/catalog/api/catalogApi";
import {
  buildCatalogQuery,
  CATALOG_DEFAULT_MAX_PRICE,
  CATALOG_DEFAULT_PAGE,
  CATALOG_DEFAULT_SORT,
  parseCatalogQuery
} from "@/modules/catalog/catalogQuery";
import { resolveErrorMessage } from "@/shared/services/apiClient";

const state = () => ({
  allCourses: [],
  popularCourses: [],
  featuredCourses: [],
  loading: false,
  error: null,
  currentPage: CATALOG_DEFAULT_PAGE,
  itemsPerPage: 6,
  searchQuery: "",
  selectedCategories: [],
  selectedLevels: [],
  priceRange: [0, CATALOG_DEFAULT_MAX_PRICE],
  sortBy: CATALOG_DEFAULT_SORT
});

const mutations = {
  SET_COURSES(state, courses) {
    state.allCourses = courses;
    state.popularCourses = courses.filter((course) => course.isPopular);
    state.featuredCourses = courses.filter((course) => course.isFeatured);
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_SELECTED_CATEGORIES(state, categories) {
    state.selectedCategories = categories;
  },
  SET_SELECTED_LEVELS(state, levels) {
    state.selectedLevels = levels;
  },
  SET_PRICE_RANGE(state, range) {
    state.priceRange = range;
  },
  SET_SORT_BY(state, sortBy) {
    state.sortBy = sortBy;
  },
  APPLY_QUERY_STATE(state, queryState) {
    state.searchQuery = queryState.searchQuery;
    state.selectedCategories = queryState.selectedCategories;
    state.selectedLevels = queryState.selectedLevels;
    state.priceRange = queryState.priceRange;
    state.sortBy = queryState.sortBy;
    state.currentPage = queryState.currentPage;
  }
};

const sortCourses = (courses, sortBy) => {
  const items = [...courses];

  return items.sort((a, b) => {
    if (sortBy === "newest" || sortBy === "createdAt") {
      return new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0);
    }

    if (sortBy === "popular") {
      return Number(b.students || 0) - Number(a.students || 0);
    }

    if (sortBy === "rated" || sortBy === "rating") {
      return Number(b.rating || 0) - Number(a.rating || 0);
    }

    if (sortBy === "price-low") {
      return Number(a.price || 0) - Number(b.price || 0);
    }

    if (sortBy === "price-high") {
      return Number(b.price || 0) - Number(a.price || 0);
    }

    return 0;
  });
};

const actions = {
  async initializeCatalogPage({ dispatch, state }, query = {}) {
    dispatch("hydrateFromQuery", query);

    if (!state.allCourses.length) {
      await dispatch("fetchCourses");
    }
  },

  hydrateFromQuery({ commit }, query = {}) {
    commit("APPLY_QUERY_STATE", parseCatalogQuery(query));
  },

  async fetchCourses({ commit, getters }) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const response = await catalogApi.listCourses();
      const courses = response.data.map(normalizeCourse);
      commit("SET_COURSES", courses);

      const totalPages = Math.max(1, getters.totalPages);
      if (totalPages < getters.currentPage) {
        commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
      }

      return courses;
    } catch (error) {
      const message = resolveErrorMessage(error);
      commit("SET_ERROR", message);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  setSearchQuery({ commit }, query) {
    commit("SET_SEARCH_QUERY", query);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  setSelectedCategories({ commit }, categories) {
    commit("SET_SELECTED_CATEGORIES", categories);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  setSelectedLevels({ commit }, levels) {
    commit("SET_SELECTED_LEVELS", levels);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  setPriceRange({ commit }, range) {
    commit("SET_PRICE_RANGE", range);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  setSortBy({ commit }, sortBy) {
    commit("SET_SORT_BY", sortBy);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  resetFilters({ commit }) {
    commit("SET_SEARCH_QUERY", "");
    commit("SET_SELECTED_CATEGORIES", []);
    commit("SET_SELECTED_LEVELS", []);
    commit("SET_PRICE_RANGE", [0, CATALOG_DEFAULT_MAX_PRICE]);
    commit("SET_SORT_BY", CATALOG_DEFAULT_SORT);
    commit("SET_CURRENT_PAGE", CATALOG_DEFAULT_PAGE);
  },

  changePage({ commit }, page) {
    commit("SET_CURRENT_PAGE", page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

const getters = {
  filteredCourses: (state) => {
    let filtered = [...state.allCourses];

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.trim().toLowerCase();
      filtered = filtered.filter((course) => {
        const title = String(course.title || "").toLowerCase();
        const description = String(course.description || course.shortDescription || "").toLowerCase();
        const tags = Array.isArray(course.tags) ? course.tags : [];

        return (
          title.includes(query) ||
          description.includes(query) ||
          tags.some((tag) => String(tag || "").toLowerCase().includes(query))
        );
      });
    }

    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter((course) => state.selectedCategories.includes(course.category));
    }

    if (state.selectedLevels.length > 0) {
      filtered = filtered.filter((course) => state.selectedLevels.includes(course.level));
    }

    filtered = filtered.filter((course) => {
      const price = Number(course.price || 0);
      return price >= state.priceRange[0] && price <= state.priceRange[1];
    });

    return sortCourses(filtered, state.sortBy);
  },
  paginatedCourses: (state, getters) => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    return getters.filteredCourses.slice(start, start + state.itemsPerPage);
  },
  totalPages: (state, getters) => Math.ceil(getters.filteredCourses.length / state.itemsPerPage) || 1,
  courseCount: (_state, getters) => getters.filteredCourses.length,
  allCategories: (state) => [...new Set(state.allCourses.map((course) => course.category).filter(Boolean))],
  allLevels: (state) => [...new Set(state.allCourses.map((course) => course.level).filter(Boolean))],
  hasFilters: (state) =>
    state.selectedCategories.length > 0 ||
    state.selectedLevels.length > 0 ||
    state.priceRange[0] !== 0 ||
    state.priceRange[1] !== CATALOG_DEFAULT_MAX_PRICE ||
    state.searchQuery.trim() !== "",
  getPopularCourses: (state) => state.popularCourses,
  getFeaturedCourses: (state) => state.featuredCourses.slice(0, 3),
  currentPage: (state) => state.currentPage,
  routeQuery: (state) => buildCatalogQuery(state)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
