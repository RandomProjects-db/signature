import Hero from "@/components/hero"
import Storytelling from "@/components/storytelling"
import SignatureCustomization from "@/components/signature-customization"
import ProductGallery from "@/components/product-gallery"
import ContactFaq from "@/components/contact-faq"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory">
      <Navigation />
      <Hero />
      <Storytelling />
      <SignatureCustomization />
      <ProductGallery />
      <ContactFaq />
      <Footer />
    </main>
  )
}
