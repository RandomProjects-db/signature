"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"
import BasicImage from "@/components/basic-image"
import { IMAGES } from "@/utils/image-urls"

type Product = {
  id: number
  type: string
  material: string
  image: string
}

export default function ProductGallery() {
  const [filter, setFilter] = useState("all")
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const [isBrowser, setIsBrowser] = useState(false)

  // Set isBrowser to true once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Products with ImageKit URLs
  const products: Product[] = [
    {
      id: 1,
      type: "ring",
      material: "Rose Gold",
      image: IMAGES.signatureRingRoseGold,
    },
    {
      id: 2,
      type: "necklace",
      material: "Yellow Gold",
      image: IMAGES.signatureNecklaceYellowGold,
    },
    {
      id: 3,
      type: "bracelet",
      material: "Sterling Silver",
      image: IMAGES.signatureBraceletSilver,
    },
    {
      id: 4,
      type: "ring",
      material: "Platinum",
      image: IMAGES.signatureRingPlatinum,
    },
    {
      id: 5,
      type: "earrings",
      material: "White Gold",
      image: IMAGES.signatureEarringsWhiteGold,
    },
    {
      id: 6,
      type: "necklace",
      material: "Rose Gold",
      image: IMAGES.signatureNecklaceRoseGold,
    },
  ]

  const filteredProducts = filter === "all" ? products : products.filter((product) => product.type === filter)

  return (
    <section ref={sectionRef} id="gallery" className="py-16 md:py-24 bg-rich-black relative">
      {/* Background Elements - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        {isBrowser && !isMobile && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif text-gold text-center mb-3 md:mb-4"
          >
            Signature Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-sm md:text-base text-gold/70 text-center mb-8 md:mb-12 max-w-2xl mx-auto"
          >
            Browse our gallery of custom signature pieces. Each design tells a unique story and showcases our
            craftsmanship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center mb-6 md:mb-10 relative z-20 overflow-x-auto pb-2"
          >
            <div className="inline-flex bg-dark-gray rounded-full p-1 shadow-md border border-gold/30">
              {["all", "ring", "necklace", "bracelet", "earrings"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    filter === type
                      ? "bg-gold text-rich-black shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                      : "text-gold hover:bg-dark-gray/80"
                  }`}
                >
                  {type === "all" ? "All Pieces" : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                viewport={{ once: true, margin: "-50px" }}
                layout
                className="group relative z-20"
              >
                <motion.div
                  className="relative overflow-hidden rounded-xl bg-dark-gray border border-gold/30"
                  whileHover={{
                    scale: isBrowser && !isMobile ? 1.03 : 1,
                    boxShadow: "0 10px 30px -10px rgba(212,175,55,0.3)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    {/* Using our basic image component */}
                    <BasicImage
                      src={product.image}
                      alt={`${product.material} ${product.type}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Shimmer overlay - simplified for mobile */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer transition-opacity duration-300 pointer-events-none" />

                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/90 via-rich-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                      <div className="p-4 md:p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-gold font-serif text-lg md:text-xl mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          Signature {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                        </h3>
                        <p className="text-gold/80 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                          {product.material}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
