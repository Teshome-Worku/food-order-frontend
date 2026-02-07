const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              ማሚ Food
            </h2>
            <p className="text-sm text-gray-400">
              Delicious food made with love and delivered fast.
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold text-white mb-2">
              Address
            </h3>
            <p className="text-sm text-gray-400">
              Adama, Ethiopia <br />
              Bole Sub City
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold text-white mb-2">
              Contact
            </h3>
            <p className="text-sm text-gray-400">
              Phone: +251 9XX XXX XXX <br />
              Email: info@mamifood.com
            </p>
          </div>
  
        </div>
  
        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} ማሚ Food. All rights reserved.
        </div>
      </footer>
    )
  }
  
  export default Footer
  