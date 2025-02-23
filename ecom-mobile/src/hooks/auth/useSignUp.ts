import { useState, useCallback, useMemo } from "react";
import { router } from "expo-router";
import { AuthService } from "@/services/AuthService";
import { debounce } from "lodash";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/Utils";
import { FormErrors, SignUpForm } from "@/models/AuthModels";

export const useSignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormErrors = useCallback(
    (name: keyof SignUpForm, value: string) => {
      setFormErrors((prev) => ({
        ...prev,
        [name]:
          name === "email"
            ? validateEmail(value)
            : name === "password"
            ? validatePassword(value)
            : name === "name"
            ? validateName(value)
            : validateConfirmPassword(form.password, value),
      }));
    },
    [form.password]
  );

  const debouncedValidation = useMemo(
    () => debounce(updateFormErrors, 300),
    [updateFormErrors]
  );

  const handleChange = (name: keyof SignUpForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    debouncedValidation(name, value);
  };

  const validateForm = () => {
    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(
      form.password,
      form.confirmPassword
    );

    setFormErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return !nameError && !emailError && !passwordError && !confirmPasswordError;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await AuthService.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (response.id) {
        router.replace("/(auth)/screens/Login");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
