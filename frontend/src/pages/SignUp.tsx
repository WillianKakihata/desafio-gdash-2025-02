import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  city?: string;
  general?: string;
}

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const API_URL = `http://localhost:8080`;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar name
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must have atleast 2 characters.";
    }

    // Validar username
    if (!username) {
      newErrors.username = "Username is required.";
    } else if (username.length < 3) {
      newErrors.username = "Username must have atleast 3 characters.";
    }

    // Validar email
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email must be a valid email address";
    }

    // Validar password
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character";
    }

    // Validar confirmPassword
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (!validatePassword(confirmPassword)) {
      newErrors.confirmPassword =
        "Password must be at least 8 characters long and must contain at least one lowercase letter, one uppercase letter, one number and one special character";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Validar city
    if (!city) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            email,
            password,
            confirmPassword,
            city,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message || "Erro ao criar usuário" });
          return;
        }

        if (data?.access_token) {
          localStorage.setItem("token", data.access_token);
        }

        navigate("/dashboard");
      } catch (error) {
        setErrors({ general: "Erro de conexão com o servidor." });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Sign Up</CardTitle>
          <CardDescription className="text-gray-600">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username *
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                  // Limpar erro de confirmPassword se password mudar
                  if (
                    errors.confirmPassword &&
                    e.target.value === confirmPassword
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }
                }}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }
                }}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700">
                City *
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) {
                    setErrors((prev) => ({ ...prev, city: undefined }));
                  }
                }}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
