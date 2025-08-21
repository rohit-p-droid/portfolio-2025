export const AUTH_TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  set: (token: string): void => {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.warn('Failed to save token to localStorage:', error);
    }
  },

  get: (): string | null => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.warn('Failed to read token from localStorage:', error);
      return null;
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.warn('Failed to remove token from localStorage:', error);
    }
  },

  exists: (): boolean => {
    return !!tokenStorage.get();
  }
};
