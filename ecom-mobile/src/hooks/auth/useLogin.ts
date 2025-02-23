import { useState, useCallback, useMemo } from "react";
import { router } from "expo-router";
import { AuthService } from "@/services/AuthService";
import { useAuthStore } from "@/store/auth";
import { debounce } from "lodash";
import { FormErrors, LoginForm } from "@/models/AuthModels";
import { validateEmail, validatePassword } from "@/utils/Utils";
import { fetchWrapper } from "@/services/fetchWrapper";
import { Endpoints } from "@/constants/Endpoints";

export const useLogin = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, setUserData } = useAuthStore((state) => state);

  const updateFormErrors = useCallback(
    (name: keyof LoginForm, value: string) => {
      setFormErrors((prev) => ({
        ...prev,
        [name]:
          name === "email" ? validateEmail(value) : validatePassword(value),
      }));
    },
    []
  );

  const debouncedValidation = useMemo(
    () => debounce(updateFormErrors, 300),
    [updateFormErrors]
  );

  const handleChange = (name: keyof LoginForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    debouncedValidation(name, value);
  };

  const validateForm = () => {
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setFormErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.login({
        email: form.email,
        password: form.password,
      });
      console.log("access token", response.access_token);

      if (response.access_token) {
        const userData = await fetchWrapper.get(Endpoints.AUTH.PROFILE, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        setUserData(userData);
        setAuth(response);
        router.replace("/(tabs)/screens");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.log("Login failed", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    formErrors,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
