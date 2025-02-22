import { API_BASE_URL } from "@/constants/Endpoints";

interface FetchOptions extends RequestInit {
  token?: string;
}

class FetchWrapper {
  private static instance: FetchWrapper;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = API_BASE_URL;
  }

  public static getInstance(): FetchWrapper {
    if (!FetchWrapper.instance) {
      FetchWrapper.instance = new FetchWrapper();
    }
    return FetchWrapper.instance;
  }

  private async handleResponse(response: Response) {
    try {
      const data = await response.json();

      if (!response.ok) {
        console.log("API Error Response:", {
          status: response.status,
          data,
        });

        throw {
          status: response.status,
          message: data.message || "An error occurred",
          data,
        };
      }

      return data;
    } catch (error) {
      console.log("Fetch Error:", error);
      throw error;
    }
  }

  private getHeaders(options?: FetchOptions): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    if (options?.token) {
      headers.append("Authorization", `Bearer ${options.token}`);
    }

    return headers;
  }

  async get(endpoint: string, options?: FetchOptions) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(options),
      ...options,
    });
    return this.handleResponse(response);
  }

  async post(endpoint: string, body: any, options?: FetchOptions) {
    console.log("Making POST request to:", `${this.baseUrl}${endpoint}`);
    console.log("Request body:", body);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(options),
      body: JSON.stringify(body),
      ...options,
    });
    return this.handleResponse(response);
  }
}

export const fetchWrapper = FetchWrapper.getInstance();
