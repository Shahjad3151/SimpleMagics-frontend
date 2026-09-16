'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/forms/BookingForm'
import { bookingApi } from '@/lib/api'
import { Users, GraduationCap, HeartHandshake, BookOpen } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, title: 'Every stage covered', desc: '10th, 12th, undergrad, postgrad, or no degree at all.' },
  { icon: BookOpen, title: 'Stream & subject clarity', desc: 'Science, commerce, arts, or vocational — mapped to real careers.' },
  { icon: HeartHandshake, title: 'No judgment, ever', desc: "Confused is normal. We're here to help, not to grade you." },
]

export default function StudentGuidancePage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
              <Users size={26} className="text-brand-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Student <span className="gradient-text">guidance</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
              Picking a stream, a course, or a college is a big decision made with too little information. Tell us where you are — a guidance counselor will follow up.
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
              submitLabel="Request student guidance"
              fields={[
                { name: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
                {
                  name: 'education_level', label: 'Current education level', type: 'select',
                  options: [
                    { value: '10th', label: '10th grade' },
                    { value: '12th', label: '12th grade' },
                    { value: 'undergrad', label: 'Undergraduate' },
                    { value: 'postgrad', label: 'Postgraduate' },
                    { value: 'dropout', label: 'Not currently in school/college' },
                  ],
                },
                { name: 'stream', label: 'Stream / subject (if any)', type: 'text', placeholder: 'e.g. Science (PCM), Commerce, Arts' },
                { name: 'guidance_topic', label: "What's on your mind?", type: 'textarea', placeholder: 'e.g. Which stream to pick after 10th, which course after 12th, confused between two degrees…' },
              ]}
              onSubmit={(data) => bookingApi.requestStudentGuidance(data)}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
