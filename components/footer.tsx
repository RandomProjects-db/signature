import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-rich-black text-gold py-10 md:py-12 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute -top-40 right-20 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl md:text-2xl font-serif">
              <span className="font-bold">Signature</span> Jewelry
            </Link>
            <p className="mt-3 md:mt-4 text-gold/70 max-w-md text-sm md:text-base">
              Transforming personal signatures into timeless jewelry pieces. Each creation tells a unique story and
              celebrates individual expression.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-6">
              <Link href="#" className="text-gold/70 hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gold/70 hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gold/70 hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#home"
                  className="text-gold/70 hover:text-gold transition-colors relative group text-sm md:text-base"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-gold/70 hover:text-gold transition-colors relative group text-sm md:text-base"
                >
                  Gallery
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#customize"
                  className="text-gold/70 hover:text-gold transition-colors relative group text-sm md:text-base"
                >
                  Customize
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gold/70 hover:text-gold transition-colors relative group text-sm md:text-base"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Contact</h3>
            <address className="not-italic text-gold/70 text-sm md:text-base">
              <p>123 Jewelry Lane</p>
              <p>New York, NY 10001</p>
              <p className="mt-2">contact@signaturejewelry.com</p>
              <p>+1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gold/10 mt-8 md:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gold/60 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Signature Jewelry. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gold/60 hover:text-gold text-xs md:text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gold/60 hover:text-gold text-xs md:text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
