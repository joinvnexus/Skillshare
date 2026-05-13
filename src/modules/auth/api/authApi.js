import { extractData, getAuthed, patchAuthed, postPublic } from "@/shared/services/apiClient";

const getCurrentUser = async () => {
  const response = await getAuthed("/auth/me");
  return extractData(response, null);
};

const register = async (payload) => {
  const response = await postPublic("/auth/register", payload);
  return extractData(response, null);
};

const login = async (payload) => {
  const response = await postPublic("/auth/login", payload);
  return extractData(response, null);
};

const logout = async (refreshToken) => {
  const response = await postPublic("/auth/logout", { refreshToken });
  return extractData(response, null);
};

const updateProfile = async (payload) => {
  const response = await patchAuthed("/auth/me/profile", payload);
  return extractData(response, null);
};

const requestEmailChange = async (payload) => {
  const response = await postPublic("/auth/change-email/request", payload, { auth: true });
  return extractData(response, null);
};

const confirmEmailChange = async (token) => {
  const response = await postPublic("/auth/change-email/confirm", { token });
  return extractData(response, null);
};

const forgotPassword = async (email) => {
  const response = await postPublic("/auth/forgot-password", { email });
  return extractData(response, null);
};

const resetPassword = async ({ token, newPassword }) => {
  const response = await postPublic("/auth/reset-password", { token, newPassword });
  return extractData(response, null);
};

export const authApi = {
  getCurrentUser,
  register,
  login,
  logout,
  updateProfile,
  requestEmailChange,
  confirmEmailChange,
  forgotPassword,
  resetPassword
};

export default authApi;
