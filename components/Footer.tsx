import Link from "next/link"

// Inline SVG icons
const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

export default function Footer() {
  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  const services = [
    { href: "/services/stress-check", label: "Stress Check" },
    { href: "/services/music-therapy", label: "Music Therapy" },
    { href: "/services/exercises", label: "Exercises" },
    { href: "/services/chatbot", label: "Chatbot" },
  ]

  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-aqua-400 to-ocean-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-ocean-900">CalmNest</span>
            </div>
            <p className="text-ocean-600 text-sm leading-relaxed">
              Where your mind finds comfort. Accessible mental-wellness resources for students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-ocean-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ocean-600 hover:text-ocean-800 text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-ocean-900 mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-ocean-600 hover:text-ocean-800 text-sm transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-ocean-900 mb-4">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:support@calmnest.com"
                className="flex items-center space-x-2 text-ocean-600 hover:text-ocean-800 text-sm transition-colors"
              >
                <MailIcon />
                <span>support@calmnest.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-ocean-600 text-sm">© 2024 CalmNest. All rights reserved.</p>
          <p className="text-ocean-600 text-sm flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Made with</span>
            <HeartIcon />
            <span>for student wellbeing</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
