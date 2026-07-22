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

export const updateAuthUser = (user) => {
    const auth = getAuth();

    if (!auth) {
        return null;
    }

    const updatedAuth = { ...auth, user };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedAuth));

    return updatedAuth;
};

const getRoleName = (role) => {
    if (typeof role === "string") {
        return role;
    }

    return role?.name || role?.codename || role?.permission || "";
};

export const hasTeacherAccess = (user) => {
    if (!user) {
        return false;
    }

    if (user.is_teacher === true) {
        return true;
    }

    const groups = user.groups || user.group || [];
    const permissions = user.permissions || user.user_permissions || [];

    const hasTeacherGroup = groups.some(
        (group) => getRoleName(group) === "is_teacher"
    );
    const hasTeacherPermission = permissions.some((permission) =>
        getRoleName(permission).split(".").pop() === "is_teacher"
    );

    return hasTeacherGroup || hasTeacherPermission;
};
