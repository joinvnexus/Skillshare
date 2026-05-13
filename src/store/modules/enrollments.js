import { normalizeEnrollment } from '@/lib/normalizers'
import { enrollmentApi } from '@/modules/enrollment/api/enrollmentApi'
import { resolveErrorMessage } from '@/shared/services/apiClient'

const state = {
  enrolledCourses: [],
  loading: false,
  error: null
}

const mutations = {
  SET_ENROLLED_COURSES(state, courses) {
    state.enrolledCourses = courses
  },
  ADD_ENROLLED_COURSE(state, course) {
    state.enrolledCourses.push(course)
  },
  UPDATE_COURSE_PROGRESS(state, { courseId, progress }) {
    const course = state.enrolledCourses.find((item) => item.id === courseId || item.enrollmentId === courseId)
    if (course) {
      course.progress = progress
    }
  },
  UPDATE_LESSON_PROGRESS(state, { enrollmentId, lessonId, isCompleted, progress }) {
    const course = state.enrolledCourses.find((item) => item.enrollmentId === enrollmentId)
    if (!course) return

    course.progress = progress
    const completedSet = new Set(course.completedLessonIds || [])

    if (isCompleted) {
      completedSet.add(lessonId)
    } else {
      completedSet.delete(lessonId)
    }

    course.completedLessonIds = Array.from(completedSet)
    course.sections = (course.sections || []).map((section) => ({
      ...section,
      lessons: (section.lessons || []).map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              isCompleted
            }
          : lesson
      )
    }))
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

const actions = {
  async fetchEnrolledCourses({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await enrollmentApi.listMyEnrollments()
      const courses = response.data.map(normalizeEnrollment)

      commit('SET_ENROLLED_COURSES', courses)
      return courses
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async enrollInCourse({ commit }, { courseId, courseData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await enrollmentApi.createEnrollment(courseId)

      const newCourse = {
        ...courseData,
        enrolled_at: response?.enrolledAt || response?.enrolled_at,
        progress: response?.progressPercent || 0,
        completed_at: response?.completedAt || null
      }

      commit('ADD_ENROLLED_COURSE', newCourse)
      return response
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async checkEnrollment({ commit }, { courseId }) {
    try {
      commit('SET_ERROR', null)
      return enrollmentApi.checkEnrollment(courseId)
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      throw error
    }
  },

  async updateProgress({ commit }, { lessonId, enrollmentId, isCompleted, watchSeconds = 0 }) {
    try {
      if (lessonId) {
        const response = await enrollmentApi.updateLessonProgress(lessonId, {
          enrollmentId,
          isCompleted,
          watchSeconds
        })

        commit('UPDATE_LESSON_PROGRESS', {
          enrollmentId,
          lessonId,
          isCompleted,
          progress: response?.enrollment?.progressPercent ?? 0
        })
      }
    } catch (error) {
      commit('SET_ERROR', resolveErrorMessage(error))
      throw error
    }
  }
}

const getters = {
  getEnrolledCourses: (state) => state.enrolledCourses,
  isEnrolled: (state) => (courseId) => state.enrolledCourses.some((course) => course.id === courseId),
  getEnrolledCourseById: (state) => (courseId) => state.enrolledCourses.find((course) => course.id === courseId),
  getTotalProgress: (state) => {
    if (state.enrolledCourses.length === 0) return 0
    const total = state.enrolledCourses.reduce((sum, course) => sum + (course.progress || 0), 0)
    return Math.round(total / state.enrolledCourses.length)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
