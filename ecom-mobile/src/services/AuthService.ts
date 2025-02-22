import { fetchWrapper } from "./fetchWrapper";
import { Endpoints } from "@/constants/Endpoints";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData extends LoginCredentials {
  name: string;
  avatar?: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface SignUpResponse {
  name: string;
  email: string;
  avatar: string;
  role: string;
  id: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log("Login request:", credentials);
      return await fetchWrapper.post(Endpoints.AUTH.LOGIN, credentials);
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  }

  static async signup(data: SignupData): Promise<SignUpResponse> {
    try {
      console.log("Signup request:", data);
      return await fetchWrapper.post(Endpoints.AUTH.SIGNUP, {
        ...data,
        avatar:
          data.avatar ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      });
    } catch (error) {
      console.log("Signup error:", error);
      throw error;
    }
  }

  static async logout(token: string): Promise<void> {
    return fetchWrapper.post(Endpoints.AUTH.LOGOUT, {}, { token });
  }

  static async refreshToken(token: string): Promise<AuthResponse> {
    return fetchWrapper.post(Endpoints.AUTH.REFRESH_TOKEN, {}, { token });
  }
}
