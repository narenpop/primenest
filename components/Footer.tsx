export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Prime<span className="text-yellow-400">Nest</span>
            </h3>
            <p className="text-sm">Find your perfect home with India's leading real estate platform.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-yellow-300 transition-colors">Home</a></li>
              <li><a href="/listings" className="hover:text-yellow-300 transition-colors">Properties</a></li>
              <li><a href="/about" className="hover:text-yellow-300 transition-colors">About Us</a></li>
              <li><a href="/about#contact" className="hover:text-yellow-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: +91 9876543210</li>
              <li>Email: info@primenest.com</li>
              <li>Address: Chennai, India</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-300 transition-colors">Facebook</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Instagram</a>
              <a href="#" className="hover:text-yellow-300 transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 PrimeNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
