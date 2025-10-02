export default function Footer() {
  return (
    <footer className="text-gray-200 py-8 mt-10">
      
      <div className="mt-8 border-t border-grey-100 pt-8 container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Blood Bank Near Me</h3>
          <p className="text-sm leading-relaxed">
            A platform to help you quickly locate nearby blood banks, ensuring
            timely access to life-saving resources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/home" className="hover:underline">Home</a></li>
            <li><a href="/home/modules" className="hover:underline">Modules</a></li>
            <li><a href="/home/alerts" className="hover:underline">Alerts</a></li>
            <li><a href="/home/help" className="hover:underline">Help & Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@bloodbank.com" className="hover:underline">support@bloodbank.com</a></li>
            <li>Phone: <a href="tel:+911234567890" className="hover:underline">+91 12345 67890</a></li>
            <li>Address: 123 Health Street, New Delhi, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 pt-4  text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Blood Bank Near Me. All rights reserved.
      </div>
    </footer>
  );
}
