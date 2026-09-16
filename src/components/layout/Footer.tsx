import Image from 'next/image'
import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
]

const services = [
  { href: '/services/career-counseling', label: 'Career Counseling' },
  { href: '/services/student-guidance', label: 'Student Guidance' },
  { href: '/assessment/profile', label: 'Career Assessments' },
  { href: '/services/skill-recommendations', label: 'Skill Recommendations' },
  { href: '/services/psychometric-tests', label: 'Psychometric Tests' },
  { href: '/services/career-roadmaps', label: 'Career Roadmaps' },
  { href: '/services/free-counseling', label: 'Free Expert Counseling' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-950/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="SimpleMagics" width={32} height={23} />
              <span className="font-display font-bold text-white">Simple<span className="text-brand-300">magics</span></span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Guiding every person — student, fresher, career-breaker, or homemaker — to discover their true calling and build a concrete path forward.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Services</p>
            <div className="space-y-2.5">
              {services.map(l => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/50 hover:text-white/80 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Legal</p>
            <div className="space-y-2.5">
              {legalLinks.map(l => (
                <Link key={l.label} href={l.href} className="block text-sm text-white/50 hover:text-white/80 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© 2026 SimpleMagics. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Github, Twitter, Linkedin].map((Icon, i) => (
              <Link key={i} href="#" className="text-white/30 hover:text-white/70 transition-colors">
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
