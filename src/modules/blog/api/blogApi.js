import { extractCollection, extractData, getPublic, postAuthed, withQuery } from "@/shared/services/apiClient";

const listBlogs = async (params = {}) => {
  const response = await getPublic(withQuery("/blogs", params));
  return extractCollection(response, []);
};

const listFeaturedBlogs = async () => {
  const response = await getPublic("/home");
  return Array.isArray(response?.data?.featuredBlogs) ? response.data.featuredBlogs : [];
};

const getBlogBySlug = async (slug) => {
  const response = await getPublic(`/blogs/${slug}`);
  return extractData(response, null);
};

const createBlog = async (payload) => {
  const response = await postAuthed("/admin/blogs", payload);
  return extractData(response, null);
};

const incrementViewCount = async (slug) => {
  await getPublic(`/blogs/${slug}`);
};

export const blogApi = {
  listBlogs,
  listFeaturedBlogs,
  getBlogBySlug,
  createBlog,
  incrementViewCount
};

export default blogApi;
