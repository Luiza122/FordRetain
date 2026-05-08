const DEFAULT_CREDENTIALS = {
  email: 'gerente@fordretain.com',
  password: '123456',
  name: 'Gerente FordRetain',
  profile: 'Gerente',
};

let activeCredentials = { ...DEFAULT_CREDENTIALS };

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
  activeCredentials = { ...DEFAULT_CREDENTIALS };
}
