import {
  deleteAuthed,
  extractCollection,
  extractData,
  getAuthed,
  patchAuthed,
  postAuthed
} from "@/shared/services/apiClient";

const getDashboardOverview = async () => {
  const response = await getAuthed("/instructor/dashboard/overview");
  return extractData(response, {});
};

const getRevenueOverview = async () => {
  const response = await getAuthed("/instructor/revenue/overview");
  return extractData(response, {});
};

const listPayouts = async () => {
  const response = await getAuthed("/instructor/revenue/payouts");
  return extractCollection(response, []);
};

const getBankInfo = async () => {
  const response = await getAuthed("/instructor/revenue/bank");
  return extractData(response, {});
};

const listReviews = async () => {
  const response = await getAuthed("/instructor/reviews");
  return extractCollection(response, []);
};

const getProfile = async () => {
  const response = await getAuthed("/instructor/me/profile");
  return extractData(response, {});
};

const updateProfile = async (payload) => {
  const response = await patchAuthed("/instructor/me/profile", payload);
  return extractData(response, {});
};

const listCourses = async () => {
  const response = await getAuthed("/instructor/courses");
  return extractCollection(response, []);
};

const createCourse = async (payload) => {
  const response = await postAuthed("/instructor/courses", payload);
  return extractData(response, null);
};

const updateCourse = async (courseId, payload) => {
  const response = await patchAuthed(`/instructor/courses/${courseId}`, payload);
  return extractData(response, null);
};

const deleteCourse = async (courseId) => {
  await deleteAuthed(`/instructor/courses/${courseId}`);
};

const updateCourseStatus = async (courseId, payload) => {
  const response = await patchAuthed(`/instructor/courses/${courseId}/status`, payload);
  return extractData(response, null);
};

const listCourseEnrollments = async (courseId) => {
  const response = await getAuthed(`/instructor/courses/${courseId}/enrollments`);
  return extractCollection(response, []);
};

const getCourseStudio = async (courseId) => {
  const response = await getAuthed(`/instructor/courses/${courseId}/studio`);
  return extractData(response, { sections: [] });
};

const createSection = async (courseId, payload) => {
  const response = await postAuthed(`/instructor/courses/${courseId}/sections`, payload);
  return extractData(response, null);
};

const createLesson = async (sectionId, payload) => {
  const response = await postAuthed(`/instructor/sections/${sectionId}/lessons`, payload);
  return extractData(response, null);
};

const updateLesson = async (lessonId, payload) => {
  const response = await patchAuthed(`/instructor/lessons/${lessonId}`, payload);
  return extractData(response, null);
};

const sendAnnouncement = async (payload) => {
  const response = await postAuthed("/instructor/announcements", payload);
  return extractData(response, null);
};

const replyToReview = async (reviewId, message) => {
  const response = await postAuthed(`/instructor/reviews/${reviewId}/reply`, { message });
  return extractData(response, null);
};

export const instructorApi = {
  getDashboardOverview,
  getRevenueOverview,
  listPayouts,
  getBankInfo,
  listReviews,
  getProfile,
  updateProfile,
  listCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseStatus,
  listCourseEnrollments,
  getCourseStudio,
  createSection,
  createLesson,
  updateLesson,
  sendAnnouncement,
  replyToReview
};

export default instructorApi;
