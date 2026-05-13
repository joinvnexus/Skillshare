import { extractCollection, extractData, getAuthed, postAuthed, deleteAuthed } from "@/shared/services/apiClient";

const getDashboardOverview = async () => {
  const response = await getAuthed("/student/dashboard/overview");
  return extractData(response, {});
};

const listWishlist = async () => {
  const response = await getAuthed("/student/me/wishlist");
  return extractCollection(response, []);
};

const addWishlistItem = async (courseId) => {
  const response = await postAuthed("/student/me/wishlist", { courseId });
  return extractData(response, null);
};

const removeWishlistItem = async (courseId) => {
  await deleteAuthed(`/student/me/wishlist/${courseId}`);
};

export const studentApi = {
  getDashboardOverview,
  listWishlist,
  addWishlistItem,
  removeWishlistItem
};

export default studentApi;
