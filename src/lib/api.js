const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("trivlo_token");
}

function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("trivlo_token", token);
}

function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("trivlo_token");
}

async function request(endpoint, options = {}) {
  const { method = "GET", body, headers: customHeaders, auth = true } = options;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...customHeaders,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    method,
    headers,
  };

  if (body && method !== "GET") {
    config.body = JSON.stringify(body);
  }

  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, config);

  if (response.status === 401) {
    removeToken();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    throw new ApiError("Session expired. Please login again.", 401);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || "Something went wrong",
      response.status,
      data
    );
  }

  return data;
}

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "GET" }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    request(endpoint, { ...options, method: "PUT", body }),

  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: "DELETE" }),
};

export const auth = {
  login: (email, password) =>
    api.post("/auth/login", { email, password }, { auth: false }),

  logout: () => api.post("/auth/logout"),

  logoutAll: () => api.post("/auth/logout-all"),

  me: () => api.get("/auth/me"),
};

export const adminApi = {
  users: {
    list: (params = "") => api.get(`/admin/users${params}`),
    get: (id) => api.get(`/admin/users/${id}`),
    create: (data) => api.post("/admin/users", data),
    update: (id, data) => api.put(`/admin/users/${id}`, data),
    delete: (id) => api.delete(`/admin/users/${id}`),
    toggleStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  },
  roles: {
    list: () => api.get("/admin/roles"),
    get: (id) => api.get(`/admin/roles/${id}`),
    create: (data) => api.post("/admin/roles", data),
    update: (id, data) => api.put(`/admin/roles/${id}`, data),
    delete: (id) => api.delete(`/admin/roles/${id}`),
    assignPermissions: (id, permissions) =>
      api.post(`/admin/roles/${id}/permissions`, { permissions }),
  },
  permissions: {
    list: () => api.get("/admin/permissions"),
    get: (id) => api.get(`/admin/permissions/${id}`),
  },
  companies: {
    list: () => api.get("/admin/companies"),
    get: (id) => api.get(`/admin/companies/${id}`),
    create: (data) => api.post("/admin/companies", data),
    update: (id, data) => api.put(`/admin/companies/${id}`, data),
    delete: (id) => api.delete(`/admin/companies/${id}`),
  },
  subscriptionPlans: {
    list: () => api.get("/admin/subscription-plans"),
    get: (id) => api.get(`/admin/subscription-plans/${id}`),
    create: (data) => api.post("/admin/subscription-plans", data),
    update: (id, data) => api.put(`/admin/subscription-plans/${id}`, data),
    delete: (id) => api.delete(`/admin/subscription-plans/${id}`),
  },
  auditLogs: {
    list: () => api.get("/admin/audit-logs"),
    get: (id) => api.get(`/admin/audit-logs/${id}`),
  },
  tenantMonitoring: () => api.get("/admin/tenant-monitoring"),
  securityPolicies: {
    get: () => api.get("/admin/security-policies"),
    update: (data) => api.put("/admin/security-policies", data),
  },
  apiManagement: {
    list: () => api.get("/admin/api-management"),
    create: (data) => api.post("/admin/api-management", data),
    delete: (id) => api.delete(`/admin/api-management/${id}`),
  },
};

export const agencyApi = {
  profile: {
    get: () => api.get("/agency/profile"),
    update: (data) => api.put("/agency/profile", data),
  },
  branches: {
    list: () => api.get("/agency/branches"),
    get: (id) => api.get(`/agency/branches/${id}`),
    create: (data) => api.post("/agency/branches", data),
    update: (id, data) => api.put(`/agency/branches/${id}`, data),
    delete: (id) => api.delete(`/agency/branches/${id}`),
  },
  users: {
    list: (params = "") => api.get(`/agency/users${params}`),
    get: (id) => api.get(`/agency/users/${id}`),
    create: (data) => api.post("/agency/users", data),
    update: (id, data) => api.put(`/agency/users/${id}`, data),
    delete: (id) => api.delete(`/agency/users/${id}`),
  },
  roles: {
    list: () => api.get("/agency/roles"),
  },
  revenueDashboard: () => api.get("/agency/revenue-dashboard"),
  businessReports: () => api.get("/agency/business-reports"),
  approvals: {
    list: () => api.get("/agency/approvals"),
    action: (id, data) => api.post(`/agency/approvals/${id}/action`, data),
  },
  branding: {
    get: () => api.get("/agency/branding"),
    update: (data) => api.put("/agency/branding", data),
  },
  settings: {
    get: () => api.get("/agency/settings"),
    update: (data) => api.put("/agency/settings", data),
  },
};

export { getToken, setToken, removeToken, ApiError };
