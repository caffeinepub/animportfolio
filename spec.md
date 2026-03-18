# AnimPortfolio

## Current State
Admin login uses Internet Identity (ICP blockchain wallet). AdminGuard checks `isCallerAdmin()` via backend authorization. Users cannot log in without a blockchain wallet, making the admin panel inaccessible.

## Requested Changes (Diff)

### Add
- Backend: `verifyAdminCredentials(username, password)` query for simple username/password auth
- Backend: mutable `adminUsername` and `adminPassword` fields with defaults (admin / admin123)
- Frontend: `AdminLoginForm` with username/password inputs replacing Internet Identity button
- Frontend: `adminAuth` localStorage key to persist admin session
- Frontend: `useAdminAuth` hook for local session management

### Modify
- `AdminLogin.tsx`: replace Internet Identity button with username/password form
- `AdminGuard.tsx`: check localStorage `adminAuth` token instead of `isCallerAdmin()`
- `lib/auth.tsx`: add local admin session helpers
- Backend mutations: remove caller-based admin checks (portfolio use case - frontend auth sufficient)

### Remove
- Internet Identity dependency from admin login flow
- `useIsAdmin` dependency in AdminGuard (replaced by localStorage check)

## Implementation Plan
1. Regenerate backend with `verifyAdminCredentials` and open admin mutations
2. Update `AdminLogin.tsx` with username/password form
3. Update `AdminGuard.tsx` to use localStorage session
4. Update `lib/auth.tsx` with local admin auth helpers
