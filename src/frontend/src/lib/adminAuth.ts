const ADMIN_SESSION_KEY = "animportfolio_admin_session";

export function setAdminSession() {
  localStorage.setItem(ADMIN_SESSION_KEY, "authenticated");
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminSessionActive(): boolean {
  return localStorage.getItem(ADMIN_SESSION_KEY) === "authenticated";
}
