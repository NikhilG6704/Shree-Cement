export const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "admin";
};

export const isViewer = () => {
  const user = getCurrentUser();
  return user?.role === "viewer";
};
