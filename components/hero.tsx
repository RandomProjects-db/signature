"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sparkles } from "@/components/sparkle"
import { IMAGES } from "@/utils/image-urls"

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useIsMobile()
  const [isBrowser, setIsBrowser] = useState(false)

  // Set isBrowser to true once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Simple parallax effect that works on both mobile and desktop
  useEffect(() => {
    if (!isBrowser) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isBrowser])

  const scrollToCustomize = () => {
    const element = document.getElementById("customize")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Use mobile image on mobile devices - using ImageKit URLs
  const heroImageUrl = isMobile ? IMAGES.heroBackgroundMobile : IMAGES.heroBackground

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background - optimized for mobile */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
          transform: isBrowser && !isMobile ? `translateY(${scrollY * 0.4}px)` : "none",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          objectFit: "cover",
        }}
      />

      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black/70 via-rich-black/50 to-rich-black z-10" />

      {/* Sparkles with updated colors including green */}
      {isBrowser && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Sparkles
            count={isMobile ? 15 : 25}
            colors={["#f5d485", "#ffffff", "#4a90e2", "#6fcf97", "#e6c566", "#a8c7fa"]}
          />
        </div>
      )}

      {/* Light Reflection Effect - simplified for mobile */}
      {isBrowser && !isMobile && (
        <div className="absolute inset-0 z-5 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-gold/10 blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] rounded-full bg-gold/10 blur-3xl animate-float"
            style={{ animationDelay: "-2s" }}
          />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-30 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gold mb-4 md:mb-6 text-shadow-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Signature, Immortalized in Jewelry
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gold/90 mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Handcrafted pieces as unique as your own signature
          </motion.p>
          <motion.button
            onClick={scrollToCustomize}
            className="bg-gold hover:bg-gold/90 text-rich-black font-medium py-3 px-6 md:px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212,175,55,0.7)" }}
            whileTap={{ scale: 0.98 }}
          >
            Design Your Piece
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <ChevronDown className="text-gold h-8 w-8" />
      </motion.div>
    </section>
  )
}
