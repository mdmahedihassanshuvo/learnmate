const AUTH_STORAGE_KEY = "learnmate_auth";

export const saveAuth = ({ access, refresh, user }) => {
    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ access, refresh, user })
    );
};

export const getAuth = () => {
    try {
        const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
        return auth?.access && auth?.user ? auth : null;
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return null;
    }
};

export const clearAuth = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};
