import {
  extractCollection,
  extractData,
  getAuthed,
  patchAuthed,
  postAuthed,
  withQuery
} from "@/shared/services/apiClient";

const listResource = async (resource, params = {}) => {
  const response = await getAuthed(withQuery(`/admin/${resource}`, params));
  return extractCollection(response, []);
};

const createResource = async (resource, payload) => {
  const response = await postAuthed(`/admin/${resource}`, payload);
  return extractData(response, null);
};

const updateResource = async (resource, id, payload) => {
  const response = await patchAuthed(`/admin/${resource}/${id}`, payload);
  return extractData(response, null);
};

const getDashboardOverview = async () => {
  const response = await getAuthed("/admin/dashboard/overview");
  return extractData(response, {});
};

export const adminApi = {
  getDashboardOverview,
  listUsers: (params) => listResource("users", params),
  updateUser: (userId, payload) => updateResource("users", userId, payload),
  listTestimonials: (params) => listResource("testimonials", params),
  updateTestimonial: (id, payload) => updateResource("testimonials", id, payload),
  listOrders: (params) => listResource("orders", params),
  updateOrder: (id, payload) => updateResource("orders", id, payload),
  listCourses: (params) => listResource("courses", params),
  updateCourse: (id, payload) => updateResource("courses", id, payload),
  updateCourseStatus: async (id, payload) => {
    const response = await patchAuthed(`/admin/courses/${id}/status`, payload);
    return extractData(response, null);
  },
  listLearningPaths: (params) => listResource("learning-paths", params),
  createLearningPath: (payload) => createResource("learning-paths", payload),
  updateLearningPath: (id, payload) => updateResource("learning-paths", id, payload),
  listBlogs: (params) => listResource("blogs", params),
  createBlog: (payload) => createResource("blogs", payload),
  updateBlog: (id, payload) => updateResource("blogs", id, payload),
  listCategories: (params) => listResource("categories", params),
  createCategory: (payload) => createResource("categories", payload),
  updateCategory: (id, payload) => updateResource("categories", id, payload),
  listCoupons: (params) => listResource("coupons", params),
  createCoupon: (payload) => createResource("coupons", payload),
  updateCoupon: (id, payload) => updateResource("coupons", id, payload),
  listReviews: (params) => listResource("reviews", params),
  updateReview: (id, payload) => updateResource("reviews", id, payload),
  listNotifications: (params) => listResource("notifications", params),
  createNotification: (payload) => createResource("notifications", payload),
  updateNotification: (id, payload) => updateResource("notifications", id, payload),
  listAuditLogs: (params) => listResource("audit-logs", params)
};

export default adminApi;
