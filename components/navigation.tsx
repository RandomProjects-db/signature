"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when scrolling
  useEffect(() => {
    const closeMenuOnScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("scroll", closeMenuOnScroll, { passive: true })
    return () => window.removeEventListener("scroll", closeMenuOnScroll)
  }, [isMenuOpen])

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)

    // Add a small delay to ensure the menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        // Get the element's position relative to the viewport
        const rect = element.getBoundingClientRect()

        // Calculate the absolute position by adding the current scroll position
        const absoluteTop = rect.top + window.pageYOffset

        // Scroll to the element with a small offset for the header
        window.scrollTo({
          top: absoluteTop - 80, // Adjust this offset as needed
          behavior: "smooth",
        })
      }
    }, 100)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-rich-black/90 backdrop-blur-md py-2 md:py-3 shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          : "bg-transparent py-3 md:py-5",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-serif text-gold relative group">
          <span className="font-bold">Signature</span> Jewelry
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["Home", "Gallery", "Customize", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-gold hover:text-gold/80 transition-colors font-medium relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gold p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-rich-black/95 backdrop-blur-md shadow-lg border-t border-gold/10"
          >
            <div className="flex flex-col py-2">
              {["Home", "Gallery", "Customize", "Contact"].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="py-4 px-6 text-gold hover:bg-gold/10 transition-colors text-left text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
