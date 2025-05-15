"use client"

import { useState } from "react"

export default function BasicImage({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  const [error, setError] = useState(false)

  // Handle image loading error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`)
    setError(true)
  }

  // Ensure we have a valid URL string
  const safeImageUrl = (() => {
    try {
      // For absolute URLs, validate them
      if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
        return src
      }
      // For relative URLs or placeholder
      return src || "/placeholder.svg"
    } catch (e) {
      console.error("Invalid image URL:", src, e)
      return "/placeholder.svg"
    }
  })()

  // If there's an error, show a placeholder
  if (error) {
    return (
      <div className={`bg-dark-gray flex items-center justify-center ${className}`}>
        <span className="text-gold/50 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <img
      src={safeImageUrl || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  )
}
