import { getPublic } from "@/shared/services/apiClient";

const getCourseById = async (identifier) => {
  const response = await getPublic(`/courses/${identifier}`);

  return {
    course: response?.data || null,
    relatedCourses: Array.isArray(response?.relatedCourses) ? response.relatedCourses : []
  };
};

export const courseApi = {
  getCourseById
};

export default courseApi;
