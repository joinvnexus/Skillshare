import { extractCollection, getPublic, withQuery } from "@/shared/services/apiClient";

const listCourses = async (params = {}) => {
  const response = await getPublic(withQuery("/courses", params));
  return extractCollection(response, []);
};

const searchCourses = (search, params = {}) =>
  listCourses({
    ...params,
    search
  });

const listCoursesByCategory = (category, params = {}) =>
  listCourses({
    ...params,
    category
  });

export const catalogApi = {
  listCourses,
  searchCourses,
  listCoursesByCategory
};

export default catalogApi;
