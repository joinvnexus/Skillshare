import { normalizeCourse } from "@/lib/normalizers";
import { courseApi } from "@/modules/course/api/courseApi";
import { resolveErrorMessage } from "@/shared/services/apiClient";

const state = () => ({
  currentCourse: null,
  relatedCourses: [],
  loading: false,
  error: null
});

const mutations = {
  SET_CURRENT_COURSE(state, course) {
    state.currentCourse = course;
  },
  SET_RELATED_COURSES(state, courses) {
    state.relatedCourses = courses;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchCourseById({ commit }, courseId) {
    try {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      const response = await courseApi.getCourseById(courseId);
      commit("SET_CURRENT_COURSE", response.course ? normalizeCourse(response.course) : null);
      commit("SET_RELATED_COURSES", (response.relatedCourses || []).map(normalizeCourse));
      return response.course ? normalizeCourse(response.course) : null;
    } catch (error) {
      commit("SET_ERROR", resolveErrorMessage(error));
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
