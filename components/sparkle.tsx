"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

type SparkleProps = {
  color?: string
  size?: number
  duration?: number
  delay?: number
}

const Sparkle = ({ color = "#f5d485", size = 10, duration = 2, delay = 0 }: SparkleProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: [0, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 8,
      }}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill={color} />
      </svg>
    </motion.div>
  )
}

type SparklesProps = {
  count?: number
  colors?: string[]
  className?: string
}

export const Sparkles = ({
  count = 20,
  colors = ["#f5d485", "#ffffff", "#4a90e2", "#6fcf97", "#e6c566", "#a8c7fa"],
  className = "",
}: SparklesProps) => {
  const [sparkles, setSparkles] = useState<
    Array<{ id: number; x: string; y: string; size: number; color: string; delay: number }>
  >([])

  // Memoize the colors array to prevent it from causing re-renders
  const memoizedColors = useRef(colors).current

  // Only generate sparkles on mount or when count actually changes
  useEffect(() => {
    if (typeof window === "undefined") return

    const newSparkles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 5,
      color: memoizedColors[Math.floor(Math.random() * memoizedColors.length)],
      delay: Math.random() * 2,
    }))
    setSparkles(newSparkles)
    // Only re-run when count changes, not on every render
  }, [count, memoizedColors])

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
        >
          <Sparkle color={sparkle.color} size={sparkle.size} delay={sparkle.delay} />
        </div>
      ))}
    </div>
  )
}
