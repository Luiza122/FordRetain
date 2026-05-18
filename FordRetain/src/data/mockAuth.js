let activeCredentials = null;

export function getMockCredentials() {
  return activeCredentials;
}

export function registerMockUser({ name, email, password, profile }) {
  activeCredentials = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    profile,
  };
}

export function resetMockCredentials() {
  activeCredentials = null;
}
