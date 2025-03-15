"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function DarkModeScript() {
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Check if user has a preference in localStorage
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [setTheme, resolvedTheme])

  return null
}

