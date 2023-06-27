export const getAccessToken = () => {
  return localStorage.getItem('mojito_token') || '';
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem('mojito_token', token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('mojito_token');
};
