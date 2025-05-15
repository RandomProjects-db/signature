"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, Trash2, RefreshCw } from "lucide-react"
import SignatureCanvas from "react-signature-canvas"
import { useDropzone } from "react-dropzone"

export default function SignatureCustomization() {
  // Changed default to "upload" instead of "draw"
  const [signatureMethod, setSignatureMethod] = useState("upload")
  const [signatureImage, setSignatureImage] = useState<string | null>(null)
  const [jewelryType, setJewelryType] = useState("")
  const [material, setMaterial] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(180)
  const [isBrowser, setIsBrowser] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const sigCanvas = useRef<SignatureCanvas>(null)

  // Set isBrowser to true once component mounts
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  // Handle responsive canvas sizing
  useEffect(() => {
    if (!isBrowser || !canvasContainerRef.current) return

    const updateCanvasSize = () => {
      if (canvasContainerRef.current) {
        const container = canvasContainerRef.current
        const width = container.clientWidth
        const height = 180 // Fixed height for better control

        setCanvasWidth(width)
        setCanvasHeight(height)

        // If the canvas exists, update its dimensions
        if (sigCanvas.current) {
          const canvas = sigCanvas.current.getCanvas()
          canvas.width = width
          canvas.height = height

          // Clear and redraw if needed
          sigCanvas.current.clear()
        }
      }
    }

    // Initial size
    updateCanvasSize()

    // Update on resize
    const resizeObserver = new ResizeObserver(updateCanvasSize)
    resizeObserver.observe(canvasContainerRef.current)

    return () => {
      if (canvasContainerRef.current) {
        resizeObserver.unobserve(canvasContainerRef.current)
      }
    }
  }, [isBrowser, signatureMethod])

  // Completely prevent scrolling when the signature pad is active
  useEffect(() => {
    if (!isBrowser || signatureMethod !== "draw") return

    const preventScroll = (e: TouchEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        e.preventDefault()
      }
    }

    // Add event listeners to prevent scrolling
    document.addEventListener("touchstart", preventScroll, { passive: false })
    document.addEventListener("touchmove", preventScroll, { passive: false })
    document.addEventListener("touchend", preventScroll, { passive: false })

    return () => {
      document.removeEventListener("touchstart", preventScroll)
      document.removeEventListener("touchmove", preventScroll)
      document.removeEventListener("touchend", preventScroll)
    }
  }, [isBrowser, signatureMethod])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
    },
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = () => {
        setSignatureImage(reader.result as string)
      }

      reader.readAsDataURL(file)
    },
  })

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear()
      setSignatureImage(null)
    }
  }

  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL("image/png")
      setSignatureImage(dataURL)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signatureImage) {
      alert("Please provide your signature before submitting")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        clearSignature()
        setJewelryType("")
        setMaterial("")
      }, 3000)
    }, 1500)
  }

  return (
    <section ref={sectionRef} id="customize" className="py-12 md:py-24 bg-dark-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-serif text-gold text-center mb-3 md:mb-4">
            Create Your Signature Piece
          </h2>
          <p className="text-sm md:text-base text-gold/70 text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            Upload or draw your signature and select your preferences. Our artisans will transform your unique
            handwriting into a wearable masterpiece.
          </p>

          <div className="bg-rich-black rounded-xl shadow-xl p-4 md:p-10 border border-gold/30">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 md:mb-10">
                <h3 className="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6">1. Provide Your Signature</h3>

                {/* Mobile-friendly tabs */}
                <div className="mb-4 md:mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSignatureMethod("draw")}
                      className={`py-3 px-4 rounded-md transition-colors text-base ${
                        signatureMethod === "draw"
                          ? "bg-gold text-rich-black"
                          : "bg-dark-gray text-gold border border-gold/30"
                      }`}
                    >
                      Draw Signature
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignatureMethod("upload")}
                      className={`py-3 px-4 rounded-md transition-colors text-base ${
                        signatureMethod === "upload"
                          ? "bg-gold text-rich-black"
                          : "bg-dark-gray text-gold border border-gold/30"
                      }`}
                    >
                      Upload Signature
                    </button>
                  </div>
                </div>

                {/* Draw signature content - completely revamped for mobile */}
                {signatureMethod === "draw" && (
                  <div>
                    <div className="border-2 border-dashed border-gold/30 rounded-lg p-2 bg-rich-black/50">
                      <div
                        ref={canvasContainerRef}
                        className="bg-dark-gray/50 rounded-md relative overflow-hidden"
                        style={{ height: `${canvasHeight}px` }}
                      >
                        {/* Guide line to help with signature placement */}
                        <div className="absolute bottom-1/3 left-0 right-0 border-b border-gold/20 z-0"></div>

                        {/* Instruction text */}
                        <div className="text-gold/50 text-xs text-center absolute top-2 left-0 right-0 pointer-events-none">
                          Draw your signature below
                        </div>

                        {isBrowser && (
                          <div className="absolute inset-0">
                            <SignatureCanvas
                              ref={sigCanvas}
                              canvasProps={{
                                className: "absolute inset-0 touch-none",
                                style: {
                                  width: "100%",
                                  height: "100%",
                                  touchAction: "none",
                                  background: "transparent",
                                  cursor: "crosshair",
                                },
                              }}
                              backgroundColor="transparent"
                              penColor="#f5d485"
                              dotSize={0.5} // Very small dot size for precision
                              minWidth={0.5} // Thinner minimum width
                              maxWidth={1.2} // Thinner maximum width
                              velocityFilterWeight={0.2} // Lower value for more precise tracking
                              throttle={16} // 60fps for smoother drawing
                            />
                          </div>
                        )}

                        {!isBrowser && (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gold/50">Signature pad loading...</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Helpful instruction for mobile users */}
                    <p className="text-gold/60 text-xs mt-2 text-center">
                      Sign with your finger as you would on paper. Draw slowly for best results.
                    </p>

                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="flex items-center justify-center gap-2 py-3 px-4 border border-gold/30 rounded-md text-gold hover:bg-gold/10 min-w-[100px] text-base"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Clear</span>
                      </button>
                      <button
                        type="button"
                        onClick={saveSignature}
                        className="py-3 px-6 bg-gold text-rich-black rounded-md hover:bg-gold/90 min-w-[140px] text-base"
                      >
                        Save Signature
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload signature content - optimized for mobile */}
                {signatureMethod === "upload" && (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gold/30 rounded-lg p-4 md:p-6 cursor-pointer text-center h-48 md:h-64 flex flex-col items-center justify-center bg-dark-gray/50"
                  >
                    <input {...getInputProps()} />
                    {signatureImage ? (
                      <div className="w-full h-full flex flex-col items-center">
                        <img
                          src={signatureImage || "/placeholder.svg"}
                          alt="Uploaded signature"
                          className="max-h-32 md:max-h-40 max-w-full object-contain mb-4"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSignatureImage(null)
                          }}
                          className="flex items-center gap-2 py-2 px-4 border border-gold/30 rounded-md text-gold hover:bg-gold/10 text-sm md:text-base"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span>Upload Different Image</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 md:h-10 md:w-10 text-gold/40 mb-3 md:mb-4" />
                        <p className="text-gold/70 mb-1 md:mb-2 text-sm md:text-base">Tap to upload your signature</p>
                        <p className="text-gold/50 text-xs md:text-sm">Supports: JPG, PNG, SVG (Max 5MB)</p>
                      </>
                    )}
                  </div>
                )}

                {signatureImage && (
                  <div className="mt-4 p-3 md:p-4 bg-gold/10 text-gold rounded-md border border-gold/20 text-sm md:text-base">
                    Signature saved successfully! You can proceed with your design.
                  </div>
                )}
              </div>

              <div className="mb-8 md:mb-10">
                <h3 className="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6">2. Design Preferences</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="jewelry-type" className="block text-gold/90 mb-1 text-sm md:text-base">
                      Jewelry Type
                    </label>
                    <select
                      id="jewelry-type"
                      value={jewelryType}
                      onChange={(e) => setJewelryType(e.target.value)}
                      className="w-full bg-dark-gray border border-gold/30 text-gold rounded-md p-3 focus:border-gold focus:ring-1 focus:ring-gold/30 text-base appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1rem",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="" disabled>
                        Select jewelry type
                      </option>
                      <option value="ring">Ring</option>
                      <option value="necklace">Necklace</option>
                      <option value="bracelet">Bracelet</option>
                      <option value="earrings">Earrings</option>
                      <option value="cufflinks">Cufflinks</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="material" className="block text-gold/90 mb-1 text-sm md:text-base">
                      Material
                    </label>
                    <select
                      id="material"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-dark-gray border border-gold/30 text-gold rounded-md p-3 focus:border-gold focus:ring-1 focus:ring-gold/30 text-base appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4af37'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1rem",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="" disabled>
                        Select material
                      </option>
                      <option value="yellow-gold">Yellow Gold</option>
                      <option value="white-gold">White Gold</option>
                      <option value="rose-gold">Rose Gold</option>
                      <option value="silver">Sterling Silver</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 space-y-2">
                  <label htmlFor="special-requests" className="block text-gold/90 mb-1 text-sm md:text-base">
                    Special Requests
                  </label>
                  <textarea
                    id="special-requests"
                    placeholder="Any special instructions or details about your design..."
                    className="w-full resize-none bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-base"
                    rows={3}
                  />
                </div>
              </div>

              <div className="mb-8 md:mb-10">
                <h3 className="text-lg md:text-xl font-serif text-gold mb-4 md:mb-6">3. Contact Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-gold/90 mb-1 text-sm md:text-base">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-gold/90 mb-1 text-sm md:text-base">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      required
                      className="w-full bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-base"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="phone" className="block text-gold/90 mb-1 text-sm md:text-base">
                      Phone (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="w-full bg-dark-gray border border-gold/30 text-gold placeholder:text-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-md p-3 text-base"
                    />
                  </div>
                </div>

                <div className="mt-4 text-gold/60 text-xs md:text-sm">
                  By submitting this form, you agree to our privacy policy. Your signature will only be used for
                  creating your custom jewelry.
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold/90 text-rich-black font-medium py-3 px-8 rounded-full text-base md:text-lg w-full md:w-auto min-w-[200px] transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  disabled={isSubmitting || isSuccess || !signatureImage}
                >
                  {isSubmitting ? "Processing..." : isSuccess ? "Request Submitted!" : "Craft My Masterpiece"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
