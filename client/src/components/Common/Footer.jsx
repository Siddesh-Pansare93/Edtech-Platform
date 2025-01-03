import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'About Us',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Contact Us',
      content: [
        'Email: info@skillvulture.com',
        'Phone: +1 (123) 456-7890',
        'Address: 123 Learn St, Education City, 12345',
      ],
    },
  ]

  const socialIcons = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: Instagram, href: '#' },
  ]

  return (
    (<footer className="bg-gray-100 py-12 bg-gradient-to-r  dark:from-gray-900 dark:to-gray-800 border-t-2 border-gray-300 border-opacity-50 dark:border-gray-700 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              {section.links ? (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-2">
                  {section.content.map((item, index) => (
                    <li key={index} className="text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Skill Vulture. All rights reserved.</p>
        </div>
      </div>
    </footer>)
  );
}

export default Footer

