import { extractCollection, extractData, getAuthed, patchAuthed, postAuthed } from "@/shared/services/apiClient";

const listMyEnrollments = async () => {
  const response = await getAuthed("/student/me/enrollments");
  return extractCollection(response, []);
};

const createEnrollment = async (courseId) => {
  const response = await postAuthed("/student/me/enrollments", { courseId });
  return extractData(response, null);
};

const updateLessonProgress = async (lessonId, payload) => {
  const response = await patchAuthed(`/student/me/lessons/${lessonId}/progress`, payload);
  return extractData(response, null);
};

const checkEnrollment = async (courseId) => {
  const response = await listMyEnrollments();
  return response.data.some((enrollment) => enrollment.courseId === courseId || enrollment.course?.id === courseId);
};

export const enrollmentApi = {
  listMyEnrollments,
  createEnrollment,
  updateLessonProgress,
  checkEnrollment
};

export default enrollmentApi;
