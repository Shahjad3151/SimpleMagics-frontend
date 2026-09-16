'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/forms/BookingForm'
import { bookingApi } from '@/lib/api'
import { HeartHandshake, Gift, Video, PhoneCall } from 'lucide-react'

const highlights = [
  { icon: Gift, title: 'Completely free', desc: 'No trial period, no upsell — this session is free, full stop.' },
  { icon: Video, title: 'Knows your results', desc: 'If you\u2019ve completed an assessment, your counselor sees it before the call.' },
  { icon: PhoneCall, title: 'Your choice of format', desc: 'Call, video, or chat — whatever you\u2019re most comfortable with.' },
]

export default function FreeCounselingPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 badge-accent mb-5">Popular</div>
            <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
              <HeartHandshake size={26} className="text-brand-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Free expert <span className="gradient-text">counseling</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
              One free session with a real counselor — to talk through your results, your options, or just where you're stuck.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {highlights.map(h => (
              <div key={h.title} className="card text-center">
                <h.icon size={20} className="text-brand-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white mb-1">{h.title}</p>
                <p className="text-xs text-white/50">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <BookingForm
              submitLabel="Book my free session"
              successTitle="Your free session is booked"
              fields={[
                { name: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
                {
                  name: 'preferred_mode', label: 'Preferred format', type: 'select',
                  options: [
                    { value: 'call', label: 'Phone call' },
                    { value: 'video', label: 'Video call' },
                    { value: 'chat', label: 'Chat' },
                  ],
                },
                { name: 'message', label: 'Anything you want your counselor to know?', type: 'textarea', placeholder: 'e.g. I just got my assessment results and want to talk through the top match…' },
              ]}
              onSubmit={(data) => bookingApi.requestFreeCounseling(data)}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
