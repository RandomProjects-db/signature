"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

type FaqItem = {
  question: string
  answer: string
}

export default function ContactFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  const faqs: FaqItem[] = [
    {
      question: "How long does the customization process take?",
      answer:
        "From the time we receive your signature and design preferences, the process typically takes 2-3 weeks. This includes design approval, crafting, and quality control. Rush orders may be available for special occasions.",
    },
    {
      question: "Can I use someone else's signature for a gift?",
      answer:
        "Many customers create signature jewelry as gifts using their loved one's handwriting. Just make sure you have permission to use their signature.",
    },
    {
      question: "What materials do you offer?",
      answer:
        "We offer a range of precious metals including yellow gold, white gold, rose gold, sterling silver, and platinum. All our materials are ethically sourced and of the highest quality.",
    },
    {
      question: "How do you ensure the signature looks authentic?",
      answer:
        "Our proprietary process captures every nuance of your signature. We use precision technology to transfer the exact curves and lines to the metal, ensuring the final piece perfectly represents your unique handwriting.",
    },
    {
      question: "Can I make changes after submitting my design?",
      answer:
        "Yes, you'll receive a digital proof before production begins. At this stage, you can request adjustments to ensure the design meets your expectations.",
    },
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message. We'll get back to you soon!")
  }

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 bg-off-black relative">
      {/* Background Elements - Simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        {!isMobile && (
          <>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4 md:mb-6">Contact Us</h2>
              <p className="text-gold/70 mb-6 md:mb-8 text-sm md:text-base">
                Have questions about our signature jewelry? Reach out to our team for personalized assistance.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-gold/90 text-sm md:text-base">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-gold/90 text-sm md:text-base">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-gold/90 text-sm md:text-base">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Your message..."
                    className="w-full resize-none bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-sm md:text-base"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-rich-black font-medium py-3 px-6 rounded-full text-sm md:text-base transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-2xl md:text-3xl font-serif text-gold mb-4 md:mb-6">Frequently Asked Questions</h2>
              <p className="text-gold/70 mb-6 md:mb-8 text-sm md:text-base">
                Find answers to common questions about our signature jewelry process.
              </p>

              <div className="space-y-3 md:space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border border-gold/20 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ boxShadow: "0 0 15px rgba(212,175,55,0.15)" }}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full p-4 text-left bg-dark-gray hover:bg-dark-gray/80 transition-colors"
                    >
                      <span className="font-medium text-gold text-sm md:text-base pr-2">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-gold/60 transition-transform duration-300 flex-shrink-0 ${
                          openFaq === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? "auto" : 0,
                        opacity: openFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-dark-gray/50"
                    >
                      <div className="p-4">
                        <p className="text-gold/70 text-sm md:text-base">{faq.answer}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
