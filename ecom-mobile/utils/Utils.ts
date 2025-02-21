export const validateEmail = (email: string) => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (!/^[A-Za-z0-9]+$/.test(password)) {
    return "Password must contain only letters and numbers";
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return null;
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return "Name is required";
  }
  return null;
};
