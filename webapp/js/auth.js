// Auth & access control (localStorage-based for frontend-only)

const STORAGE_KEYS = {
  user: 'quiz_user',
  passed: 'quiz_passed',
  attempt: 'quiz_current_attempt'
};

function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.user);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  localStorage.removeItem(STORAGE_KEYS.attempt);
  window.location.href = 'login.html';
}

function hasPassed() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.passed);
    return data === 'true';
  } catch {
    return false;
  }
}

function setPassed(value) {
  localStorage.setItem(STORAGE_KEYS.passed, value ? 'true' : 'false');
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function requirePassed() {
  if (!requireAuth()) return false;
  if (!hasPassed()) {
    window.location.href = 'locked.html';
    return false;
  }
  return true;
}
