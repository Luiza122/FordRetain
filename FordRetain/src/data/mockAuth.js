const STORAGE_KEYS = {
  users: 'fordretain:mock-users',
  session: 'fordretain:active-session',
};

function hasWebStorage() {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

function readStorage(key, fallback) {
  if (!hasWebStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (!hasWebStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeStorage(key) {
  if (!hasWebStorage()) return;
  window.localStorage.removeItem(key);
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    name: user.name,
    email: user.email,
    profile: user.profile,
  };
}

let registeredUsers = readStorage(STORAGE_KEYS.users, []);
let activeUser = readStorage(STORAGE_KEYS.session, null);

function persistUsers() {
  writeStorage(STORAGE_KEYS.users, registeredUsers);
}

function persistSession(user) {
  activeUser = sanitizeUser(user);

  if (activeUser) {
    writeStorage(STORAGE_KEYS.session, activeUser);
  } else {
    removeStorage(STORAGE_KEYS.session);
  }
}

export function getMockCredentials() {
  return activeUser;
}

export function getRegisteredUsers() {
  return registeredUsers.map(sanitizeUser);
}

export function registerMockUser({ name, email, password, profile }) {
  const normalizedEmail = normalizeEmail(email);
  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
    profile,
  };

  registeredUsers = [
    ...registeredUsers.filter((user) => user.email !== normalizedEmail),
    newUser,
  ];
  persistUsers();

  return sanitizeUser(newUser);
}

export function authenticateMockUser(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const user = registeredUsers.find(
    (item) => item.email === normalizedEmail && item.password === password,
  );

  if (!user) return null;

  persistSession(user);
  return activeUser;
}

export function logoutMockUser() {
  persistSession(null);
}

export function resetMockCredentials() {
  logoutMockUser();
}
