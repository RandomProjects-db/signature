// Utility to detect older browsers and devices
export function isOlderBrowser(): boolean {
  if (typeof window === "undefined") return false

  // Check for older Android (Android 6 and below)
  const userAgent = window.navigator.userAgent
  const isOldAndroid = /Android\s*([0-6])\./.test(userAgent)

  // Check for older browsers based on feature detection
  const hasIntersectionObserver = "IntersectionObserver" in window
  const hasPromise = "Promise" in window
  const hasLocalStorage = "localStorage" in window

  // If missing modern features or is old Android, consider it an older browser
  return isOldAndroid || !hasIntersectionObserver || !hasPromise || !hasLocalStorage
}

// Check if device is likely low-powered
export function isLowPoweredDevice(): boolean {
  if (typeof window === "undefined") return false

  // Check for older Android devices
  const userAgent = window.navigator.userAgent
  const isOldAndroid = /Android\s*([0-6])\./.test(userAgent)

  // Check for low memory (not always available)
  const hasLowMemory = "deviceMemory" in navigator && (navigator as any).deviceMemory < 2

  return isOldAndroid || hasLowMemory
}

// Get appropriate image quality based on device capabilities
export function getImageQuality(): "low" | "medium" | "high" {
  if (typeof window === "undefined") return "medium"

  if (isOlderBrowser() || isLowPoweredDevice()) {
    return "low"
  }

  // Check connection type if available
  if ("connection" in navigator && (navigator as any).connection) {
    const connection = (navigator as any).connection
    if (connection.saveData || connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
      return "low"
    }
    if (connection.effectiveType === "3g") {
      return "medium"
    }
  }

  return "high"
}
