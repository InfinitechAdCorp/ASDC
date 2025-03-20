// utils/auth.ts

export const isUserLoggedIn = (): boolean => {
  const userId = localStorage.getItem('id');

  return Boolean(userId);
};
