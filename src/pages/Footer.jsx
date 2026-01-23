import { Heart, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-red-600 fill-red-600" />
              <span className="text-2xl font-bold">BloodConnect</span>
            </div>
            <p className="text-sm font-semibold text-red-600">Life-saving Connections</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner in emergency blood assistance, connecting donors, hospitals, and patients with
              real-time availability and verified support.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-red-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-red-600 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-red-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-red-600 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Blood Services</h3>
            <ul className="space-y-3">
              {[
                "Emergency Blood Requests",
                "Nearby Donor Search",
                "Blood Bank Directory",
                "Plasma & Platelet Support",
                "AI-Based Matching System",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">User Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors block">
                  Donor Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-red-500 font-semibold transition-colors block">
                  Request Blood
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors block">
                  Blood Donation Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors block">
                  Safety & Verification
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors block">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact & Hours</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-gray-400">
                  123 Healthcare Avenue
                  <br />
                  Medical District, MD 12345
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 mt-0.5" />
                <a href="tel:1-800-BLOOD-HELP" className="text-sm text-gray-400 hover:text-white transition-colors">
                  1-800-BLOOD-HELP
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 mt-0.5" />
                <a href="mailto:support@bloodconnect.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  support@bloodconnect.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <div>Mon–Fri: 8:00 AM – 8:00 PM</div>
                  <div>Sat–Sun: 9:00 AM – 5:00 PM</div>
                  <div className="text-red-600 font-semibold mt-1">Emergency: 24/7</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 BloodConnect. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-red-600/20 via-red-500/20 to-red-600/20 border-t border-red-600/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-red-100 font-medium">
            Always Connected for Your Emergency Needs
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
