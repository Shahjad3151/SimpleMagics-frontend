'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '@/lib/store'
import {
  Menu, X, LogOut, LayoutDashboard, Shield, ChevronDown,
  Compass, Users, ClipboardCheck, Sparkles, Brain, Map, HeartHandshake,
} from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const { token, isAdmin, clearAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const clickAway = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', clickAway)
    return () => document.removeEventListener('mousedown', clickAway)
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  // The 7 core SimpleMagics service areas, grouped under one "Services" menu
  // so the top bar stays clean while every section stays reachable.
  const services = [
    { href: '/services/career-counseling', label: 'Career Counseling', desc: '1:1 guided sessions', icon: Compass },
    { href: '/services/student-guidance', label: 'Student Guidance', desc: 'For 10th-pass to postgrad', icon: Users },
    { href: '/assessment/profile', label: 'Career Assessments', desc: 'Find your best-fit track', icon: ClipboardCheck },
    { href: '/services/skill-recommendations', label: 'Skill Recommendations', desc: 'Close the gaps that matter', icon: Sparkles },
    { href: '/services/psychometric-tests', label: 'Psychometric Tests', desc: '150+ weighted questions', icon: Brain },
    { href: '/services/career-roadmaps', label: 'Career Roadmaps', desc: '90-day step-by-step plans', icon: Map },
    { href: '/services/free-counseling', label: 'Free Expert Counseling', desc: 'Talk to a real counselor', icon: HeartHandshake, badge: 'Popular' },
  ]

  const navLinks = [
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#benefits', label: 'Benefits' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/[0.06] py-3' : 'py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image src="/logo.png" alt="SimpleMagics" width={36} height={26} className="group-hover:scale-105 transition-transform" priority />
          <span className="font-display font-bold text-lg text-white hidden sm:inline">
            Simple<span className="text-brand-300">magics</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {!token && (
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(v => !v)}
                className="flex items-center gap-1 text-sm text-white/60 hover:text-white transition-colors"
              >
                Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[560px] glass rounded-2xl p-3 grid grid-cols-2 gap-1 border border-white/10 shadow-2xl">
                  {services.map(s => {
                    const Icon = s.icon
                    return (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-500/10 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-brand-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{s.label}</span>
                            {s.badge && (
                              <span className="badge-accent !py-0.5 !px-2 text-[10px]">{s.badge}</span>
                            )}
                          </div>
                          <p className="text-xs text-white/50 mt-0.5">{s.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )}
          {!token && navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <>
              <Link
                href={isAdmin ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5"
              >
                {isAdmin ? <Shield size={15} /> : <LayoutDashboard size={15} />}
                {isAdmin ? 'Admin Panel' : 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4">
                <LogOut size={15} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
              <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/[0.06] mt-3 px-4 py-4 space-y-1 animate-in max-h-[80vh] overflow-y-auto">
          {!token && (
            <>
              <p className="text-xs uppercase tracking-wide text-white/40 px-1 pt-1 pb-2">Services</p>
              {services.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center justify-between text-sm text-white/80 py-2.5 px-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {s.label}
                  {s.badge && <span className="badge-accent !py-0.5 !px-2 text-[10px]">{s.badge}</span>}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] my-2" />
            </>
          )}
          {!token && navLinks.map(l => (
            <Link key={l.href} href={l.href} className="block text-sm text-white/70 py-2" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-2">
            {token ? (
              <>
                <Link href={isAdmin ? '/admin' : '/dashboard'} className="btn-secondary text-sm justify-center">Dashboard</Link>
                <button onClick={handleLogout} className="btn-secondary text-sm justify-center">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary text-sm justify-center">Sign In</Link>
                <Link href="/auth/register" className="btn-primary text-sm justify-center">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
