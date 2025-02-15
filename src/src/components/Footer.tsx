import Link from "next/link"
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Zomo</h3>
            <p className="mb-4">Delicious food delivered to your doorstep.Welcome to our online order website! Here, you can browse our wide selection of products and place orders from the comfort of your own home.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block hover:text-white">About Us</Link>
              <Link href="/contact" className="block hover:text-white">Contact</Link>
              <Link href="/restaurants" className="block hover:text-white">Restaurants</Link>
              <Link href="/faq" className="block hover:text-white">FAQ</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-white">Terms & Conditions</Link>
              <Link href="/refund" className="block hover:text-white">Refund Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2">
              <p>Email: support@zomo.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Food Street, Foodville, FK 12345</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Zomo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

