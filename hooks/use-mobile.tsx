"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  // Default to false for server-side rendering
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}
