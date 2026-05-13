export const toQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value
        .filter((item) => item !== undefined && item !== null && String(item).trim() !== "")
        .forEach((item) => {
          searchParams.append(key, String(item));
        });
      return;
    }

    if (typeof value === "string" && value.trim() === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams.toString();
};

export const withQuery = (path, params = {}) => {
  const query = toQueryString(params);
  return query ? `${path}?${query}` : path;
};
