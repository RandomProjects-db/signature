"use client"

import { useState, useEffect } from "react"
import { isOlderBrowser, getImageQuality } from "@/utils/device-detection"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  width?: number
  height?: number
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  fallbackSrc,
  width,
  height,
  priority = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    const quality = getImageQuality()
    const isOlder = isOlderBrowser()

    // Use fallback for older browsers if provided
    if (isOlder && fallbackSrc) {
      setImgSrc(fallbackSrc)
      return
    }

    // Otherwise use the regular source
    setImgSrc(src)
  }, [src, fallbackSrc])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    // If original source fails and we have a fallback, try that
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  // Show placeholder while loading
  if (!imgSrc || (!isLoaded && !error)) {
    return (
      <div
        className={`bg-dark-gray/50 ${className}`}
        style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gold/30 text-sm">Loading...</div>
        </div>
      </div>
    )
  }

  // Show image once loaded
  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
    />
  )
}
