"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 로컬 스토리지에서 사용자 데이터 로드
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("사용자 데이터를 불러오는 중 오류가 발생했습니다:", error)
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // 실제로는 API 호출을 통해 인증을 처리하겠지만, 여기서는 간단한 검증만 수행
    if (email === "test@test.com" && password === "test") {
      const userData: User = {
        id: "u1",
        email: "test@test.com",
        name: "테스트 사용자",
        isAdmin: true,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

