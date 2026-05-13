import { adminApi } from "@/modules/dashboard-admin/api/adminApi";
import { instructorApi } from "@/modules/dashboard-instructor/api/instructorApi";
import { studentApi } from "@/modules/dashboard-student/api/studentApi";
import { resolveErrorMessage } from "@/shared/services/apiClient";

const state = () => ({
  overviewByRole: {
    ADMIN: null,
    INSTRUCTOR: null,
    STUDENT: null
  },
  loading: false,
  error: null
});

const mutations = {
  SET_OVERVIEW(state, { role, data }) {
    state.overviewByRole = {
      ...state.overviewByRole,
      [role]: data
    };
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const overviewLoaders = {
  ADMIN: () => adminApi.getDashboardOverview(),
  INSTRUCTOR: () => instructorApi.getDashboardOverview(),
  STUDENT: () => studentApi.getDashboardOverview()
};

const actions = {
  async fetchOverview({ commit }, role = "STUDENT") {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const loader = overviewLoaders[role] || overviewLoaders.STUDENT;
      const data = await loader();
      commit("SET_OVERVIEW", { role, data });
      return data;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  }
};

const getters = {
  overviewForRole: (state) => (role) => state.overviewByRole[role] || {}
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
