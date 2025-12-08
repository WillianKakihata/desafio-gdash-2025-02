import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface FormErrors {
  username?: string
  email?: string
  password?: string
  general?: string
}

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const navigate = useNavigate()

  const API_URL = `http://localhost:8080`

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!username && !email) {
      newErrors.general = 'Please provide either username or email.'
      setErrors(newErrors)
      return false
    }

    if (username && username.length < 3) {
      newErrors.username = 'Username must have atleast 3 characters.'
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Please provide valid Email.'
    }

    if (!password) {
      newErrors.password = 'Password is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username || undefined,
          email: email || undefined,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ general: data.message || 'Invalid credentials' })
        return
      }

      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
      }

      console.log("Token saved:", localStorage.getItem("token"))

      navigate('/dashboard')

    } catch (error) {
      setErrors({ general: 'Server connection error.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <Card className="w-full max-w-md bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Sign In</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {errors.general}
              </div>
            )}

            {/* USERNAME */}
            <div className="space-y-2">
              <Label htmlFor="username">Username (optional)</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) {
                    setErrors((prev) => ({ ...prev, username: undefined }))
                  }
                }}
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }
                }}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
