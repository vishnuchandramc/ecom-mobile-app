export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm extends LoginForm {
  name: string;
  confirmPassword: string;
}

export interface FormErrors {
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
  name?: string | null;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
