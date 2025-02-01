export const getLocalStorageItem = (key: string, defaultValue = null) => {
  if (typeof window === undefined) return;

  const rawData = localStorage?.getItem(key);
  if (rawData) {
    return JSON.parse(rawData);
  }
  return defaultValue;
};

export const isAuthenticated = () => {
  const loginInfo = getLocalStorageItem("loginInfo");

  if (loginInfo) {
    return new Date().getTime() < loginInfo.expiresAt;
  }
  return false;
};
