interface User {
  email: string;
  name: string;
  avatar?: string;
}

export const getAccessToken = () => {
  return localStorage.getItem('mojito_token') || '';
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem('mojito_token', token);
};

export const removeAccessToken = () => {
  return localStorage.removeItem('mojito_token');
};

export const setAccountInfo = (user: User) => {
  return localStorage.setItem('mojito_account_info', JSON.stringify(user));
};

export const getAccountInfo = () => {
  return JSON.parse(localStorage.getItem('mojito_account_info') || '');
};

export const removeAccountInfo = () => {
  return localStorage.removeItem('mojito_account_info');
};
