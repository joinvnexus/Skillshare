import { apiRequest } from "@/lib/api";
import { withQuery } from "@/shared/utils/query";

const fallbackMeta = (items = []) => ({
  page: 1,
  totalPages: 1,
  total: Array.isArray(items) ? items.length : 0
});

export const resolveErrorMessage = (error, fallback = "Request failed.") => {
  if (!error) {
    return fallback;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

export const extractData = (response, fallback = null) => response?.data ?? fallback;

export const extractCollection = (response, fallback = []) => {
  const data = Array.isArray(response?.data) ? response.data : fallback;

  return {
    data,
    meta: response?.meta || fallbackMeta(data)
  };
};

export const request = (path, options = {}) => apiRequest(path, options);

export const getPublic = (path, options = {}) =>
  request(path, {
    ...options,
    method: "GET"
  });

export const getAuthed = (path, options = {}) =>
  request(path, {
    ...options,
    method: "GET",
    auth: true
  });

export const postPublic = (path, body, options = {}) =>
  request(path, {
    ...options,
    method: "POST",
    body
  });

export const postAuthed = (path, body, options = {}) =>
  request(path, {
    ...options,
    method: "POST",
    auth: true,
    body
  });

export const patchAuthed = (path, body, options = {}) =>
  request(path, {
    ...options,
    method: "PATCH",
    auth: true,
    body
  });

export const deleteAuthed = (path, options = {}) =>
  request(path, {
    ...options,
    method: "DELETE",
    auth: true
  });

export { withQuery };
