import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ShieldCheck } from 'lucide-react'

export const metadata = { title: 'Privacy Policy — SimpleMagics' }

export default function PrivacyPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={26} className="text-brand-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-white/50 text-sm">Last updated: [FILL IN DATE BEFORE PUBLISHING]</p>
          </div>

          <div className="glass rounded-2xl p-6 mb-8 border border-amber-500/25 bg-amber-500/[0.04]">
            <p className="text-sm text-amber-200/90 leading-relaxed">
              <strong>Before you publish this:</strong> this draft describes what the product actually
              collects and does today, in plain language. It is not legal advice, and it is not a
              substitute for review by a lawyer — especially for the sections on minors' data,
              because requirements vary by country and by whether a school is enrolling students on
              your platform versus students signing up individually. Replace every{' '}
              <code className="text-amber-300">[bracketed]</code> placeholder before this goes live.
            </p>
          </div>

          <div className="space-y-8 text-white/70 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">1. Who runs this platform</h2>
              <p>
                SimpleMagics ("we", "us") is operated by <strong>[LEGAL ENTITY NAME]</strong>. If you
                have questions about this policy or your data, contact us at{' '}
                <strong>[PRIVACY CONTACT EMAIL]</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">2. What we collect</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Account info:</strong> your email and password (stored as a one-way hash — we never store or see your actual password).</li>
                <li><strong>Profile info:</strong> full name, mobile number, education level, college/university name, graduation year, and current status (student, fresher, job seeker, etc.).</li>
                <li><strong>Assessment data:</strong> every answer you submit on a test, how long you spent on each question, your scores, and the career recommendations generated from your answers.</li>
                <li><strong>Booking info (if you request counseling):</strong> the details you submit in that form, shared with the counselor assigned to you.</li>
              </ul>
              <p className="mt-3">
                We do not knowingly collect more than this. We do not ask for or store payment card
                details, government ID numbers, or biometric data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">3. How we use it</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To run the assessment and generate your career recommendation and results report.</li>
                <li>To let you log back in and see your past results and progress.</li>
                <li>To connect you with a counselor if you request a booking.</li>
                <li>If enabled, to generate a personalized written analysis using an AI model — your assessment answers and results are sent to that AI provider for this purpose only, not for advertising or unrelated profiling.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data, and we do not share it with advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">4. If you're under 18</h2>
              <p>
                A meaningful share of the people using this platform are school students, including
                people under 18. If that's you:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Please get a parent, guardian, or teacher's okay before creating an account, if your school or local law requires it.</li>
                <li>If your school or college is directing you to this platform as part of a program, [SCHOOL/COLLEGE NAME] may receive a summary of aggregate results (e.g. "40% of Class of 2027 showed strong aptitude in X") — <strong>[CONFIRM: does the individual school get per-student results, or only aggregate? Update this line accordingly.]</strong></li>
                <li>A parent or guardian can request that we delete a minor's account and data at any time by contacting <strong>[PRIVACY CONTACT EMAIL]</strong>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">5. Who can see your data</h2>
              <p>
                Your individual results are visible to: you, and platform administrators (for support
                and quality purposes). <strong>[IF UNIVERSITIES/COLLEGES GET DIRECT ACCESS TO THEIR
                STUDENTS' INDIVIDUAL RESULTS, SAY SO EXPLICITLY HERE — this is one of the first things
                a university will ask before recommending this to students.]</strong> We do not share
                individual, identifiable results with employers, advertisers, or any other third party
                without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">6. How long we keep it</h2>
              <p>
                We keep your account and assessment history for as long as your account is active, so
                you can track progress over time. You can request full deletion of your account and
                associated data at any time — see Section 7.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">7. Your choices</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>You can request a copy of everything we hold about you.</li>
                <li>You can request correction of inaccurate profile information.</li>
                <li>You can request deletion of your account and all associated data.</li>
              </ul>
              <p className="mt-3">To do any of the above, email <strong>[PRIVACY CONTACT EMAIL]</strong>.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">8. Security</h2>
              <p>
                Passwords are hashed, not stored in plain text. Access to your account requires your
                credentials. We rate-limit login attempts to reduce automated attacks. No system is
                perfectly secure, and we'll notify affected users if we ever become aware of a breach
                involving their data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">9. Changes to this policy</h2>
              <p>
                If we materially change what we collect or how we use it, we'll update this page and
                change the "Last updated" date above.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
