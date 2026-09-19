const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TOKEN_KEY = "ucd_admin_token";

/** Reads the `exp` claim without verifying the signature — the server still
 *  does the real check. This only stops us rendering the dashboard with a
 *  token we can already tell is stale. */
function isExpired(token) {
  try {
    const [, payload] = token.split(".");
    const { exp } = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof exp === "number" && exp * 1000 <= Date.now();
  } catch {
    return true; // unparseable token is no better than an expired one
  }
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;
  if (isExpired(token)) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
  return token;
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    clearToken();
    // Only bounce if we're actually inside the admin area — a 401 from the
    // login form itself should surface as an error message, not a reload.
    if (!window.location.pathname.startsWith("/admin/login")) {
      window.location.replace("/admin/login");
    }
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Session expired. Please log in again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  me: () => request("/api/auth/me"),
  listBookings: (status) =>
    request(`/api/bookings${status ? `?status=${encodeURIComponent(status)}` : ""}`),
  updateStatus: (id, status) =>
    request(`/api/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  stats: () => request("/api/bookings/stats"),
};
