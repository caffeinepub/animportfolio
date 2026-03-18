import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function useAuth() {
  const {
    login,
    clear,
    loginStatus,
    identity,
    isInitializing,
    isLoginError,
    isLoggingIn,
  } = useInternetIdentity();

  return {
    isAuthenticated: loginStatus === "success",
    login,
    logout: clear,
    principal: identity?.getPrincipal().toString() ?? null,
    isLoggingIn,
    isLoginError,
    isInitializing,
  };
}
