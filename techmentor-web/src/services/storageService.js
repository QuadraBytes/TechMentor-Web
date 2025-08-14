const StorageService = {
  save(key, value) {
    localStorage.setItem(key, value);
  },

  get(key) {
    return localStorage.getItem(key);
  },

  delete(key) {
    localStorage.removeItem(key);
  },

  clearAll() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  },
};

export default StorageService;
