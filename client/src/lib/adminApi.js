const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function getToken() {
  return localStorage.getItem("ucd_admin_token");
}
export function setToken(token) {
  localStorage.setItem("ucd_admin_token", token);
}
export function clearToken() {
  localStorage.removeItem("ucd_admin_token");
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
    window.location.href = "/admin/login";
    throw new Error("Session expired. Please log in again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed.");
  return data;
}

export const api = {
  login: (email, password) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  me: () => request("/api/auth/me"),
  listBookings: (status) => request(`/api/bookings${status ? `?status=${status}` : ""}`),
  updateStatus: (id, status) =>
    request(`/api/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  stats: () => request("/api/bookings/stats"),
};
