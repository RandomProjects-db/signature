"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import BasicImage from "@/components/basic-image"
import { IMAGES } from "@/utils/image-urls"

export default function Storytelling() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [progress, setProgress] = useState(0)
  const isMobile = useIsMobile()
  const [isBrowser, setIsBrowser] = useState(false)

  // Set isBrowser to true once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Calculate scroll position relative to the section
  useEffect(() => {
    if (!isBrowser) return

    const updatePosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setScrollPosition(window.scrollY)

        // Calculate progress through the section (0 to 1)
        const calculatedProgress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        )
        setProgress(calculatedProgress)
      }
    }

    // Initial calculation
    updatePosition()

    // Update on scroll
    window.addEventListener("scroll", updatePosition, { passive: true })

    return () => window.removeEventListener("scroll", updatePosition)
  }, [isBrowser])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-32 lg:py-40 overflow-hidden bg-off-black">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl sm:text-3xl md:text-5xl font-serif text-gold text-center mb-10 md:mb-16"
          >
            Craftsmanship Meets Personal Expression
          </motion.h2>

          <div className="space-y-20 md:space-y-40">
            {/* First Section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center group"
              >
                <div className="md:w-1/2 mb-8 md:mb-0 relative">
                  <div
                    className="relative rounded-lg overflow-hidden border border-gold/30 transition-all duration-500 group-hover:scale-105"
                    style={{
                      transform: isBrowser && !isMobile ? `rotate(${-2 + progress * 4}deg)` : "none",
                    }}
                  >
                    {/* Using standard img tag for better compatibility */}
                    <BasicImage
                      src={IMAGES.signatureRingCloseup}
                      alt="Signature ring"
                      className="w-full h-auto rounded-lg shadow-xl transition-all duration-700 group-hover:scale-110 object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-rich-black/30 to-transparent" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-xl md:text-2xl lg:text-3xl font-serif text-gold mb-4"
                  >
                    Handcrafted with Precision
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-gold/80 text-base md:text-lg lg:text-xl"
                  >
                    Each piece is meticulously crafted by our master jewelers, transforming your unique signature into
                    wearable art that tells your story.
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Second Section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row-reverse items-center group"
              >
                <div className="md:w-1/2 mb-8 md:mb-0 relative">
                  <div
                    className="relative rounded-lg overflow-hidden border border-gold/30 transition-all duration-500 group-hover:scale-105"
                    style={{
                      transform: isBrowser && !isMobile ? `rotate(${2 - progress * 4}deg)` : "none",
                    }}
                  >
                    {/* Using standard img tag for better compatibility */}
                    <BasicImage
                      src={IMAGES.jewelryMaterials}
                      alt="Jewelry materials"
                      className="w-full h-auto rounded-lg shadow-xl transition-all duration-700 group-hover:scale-110 object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-rich-black/30 to-transparent" />
                  </div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
                </div>
                <div className="md:w-1/2 md:pr-12">
                  <motion.h3
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-xl md:text-2xl lg:text-3xl font-serif text-gold mb-4"
                  >
                    Premium Materials
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-gold/80 text-base md:text-lg lg:text-xl"
                  >
                    Choose from ethically sourced gold, silver, and platinum. Each material is selected for its beauty
                    and longevity, ensuring your signature piece remains timeless.
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Third Section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row items-center group"
              >
                <div className="md:w-1/2 mb-8 md:mb-0 relative">
                  <div
                    className="relative rounded-lg overflow-hidden border border-gold/30 transition-all duration-500 group-hover:scale-105"
                    style={{
                      transform: isBrowser && !isMobile ? `rotate(${-1 + progress * 2}deg)` : "none",
                    }}
                  >
                    {/* Using standard img tag for better compatibility */}
                    <BasicImage
                      src={IMAGES.signatureProcess}
                      alt="Custom jewelry process"
                      className="w-full h-auto rounded-lg shadow-xl transition-all duration-700 group-hover:scale-110 object-cover aspect-square"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-rich-black/30 to-transparent" />
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-xl md:text-2xl lg:text-3xl font-serif text-gold mb-4"
                  >
                    From Signature to Masterpiece
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-gold/80 text-base md:text-lg lg:text-xl"
                  >
                    Our proprietary process captures the essence of your signature, preserving every curve and flourish
                    in metal. The result is a piece as unique as your own handwriting.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
