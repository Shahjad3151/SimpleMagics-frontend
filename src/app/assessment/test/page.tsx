'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Clock, ChevronLeft, ChevronRight, Flag, Code2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { testApi } from '@/lib/api'
import { getMockTestData } from '@/lib/mockQuestions'
import Navbar from '@/components/layout/Navbar'

interface Question {
  id: number
  question_text: string
  question_type: string
  options: string[] | null
  marks: number
  coding_template: string | null
}

function TestPageInner() {
  const searchParams = useSearchParams()
  const sessionType = searchParams.get('type') || 'technical'
  const domain = searchParams.get('domain') || ''
  const technology = searchParams.get('technology') || ''
  const router = useRouter()

  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [codeAnswers, setCodeAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [questionStart, setQuestionStart] = useState(Date.now())
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    startTest()
  }, [])

  useEffect(() => {
    if (sessionId) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0 }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [sessionId])

  const loadMockTest = (reason?: string) => {
    const mock = getMockTestData(domain, technology)
    setSessionId(mock.session_id)
    setQuestions(mock.questions)
    setTimeLeft(mock.duration_minutes * 60)
    setUsingMockData(true)
    if (reason) toast(reason, { icon: '⚠️' })
  }

  const startTest = async () => {
    // If technical assessment, always have a per-domain fallback ready
    try {
      const data = await testApi.startTest({ session_type: sessionType, domain, technology })
      if (!data || !data.questions || data.questions.length === 0) {
        // Backend responded but had no questions for this domain -> use dummy set
        loadMockTest('Using sample questions for this domain')
      } else {
        setSessionId(data.session_id)
        setQuestions(data.questions)
        setTimeLeft((data.duration_minutes || 30) * 60)
      }
    } catch (err: any) {
      // API failed / backend down / domain not seeded -> never show a hard error,
      // silently fall back to dummy questions for the selected domain
      loadMockTest(sessionType === 'technical' ? 'Using sample questions for this domain' : undefined)
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (qId: number, answer: any) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }))
  }

  const goTo = (i: number) => {
    setQuestionStart(Date.now())
    setCurrent(i)
  }

  const handleSubmit = async () => {
    if (!sessionId) return
    setSubmitting(true)
    clearInterval(timerRef.current)

    const answerList = questions.map(q => ({
      question_id: q.id,
      user_answer: q.question_type === 'coding' ? codeAnswers[q.id] : answers[q.id],
      time_spent_seconds: 0,
    })).filter(a => a.user_answer !== undefined)

    // If we're on mock/dummy data, there's no real backend session to submit to —
    // just compute a simple local result and route to a mock results view.
    if (usingMockData) {
      const answeredCount = answerList.length
      toast.success('Test submitted!')
      router.push(`/results/mock?domain=${encodeURIComponent(domain)}&answered=${answeredCount}&total=${questions.length}`)
      return
    }

    try {
      const result = await testApi.submitTest({
        test_session_id: sessionId,
        answers: answerList,
        time_taken_seconds: 30 * 60 - timeLeft,
      })
      toast.success('Test submitted!')
      router.push(`/results/${result.result_id}`)
    } catch (err: any) {
      // Even if submit fails, don't dead-end the user
      toast.error(err.message || 'Submit failed — showing local summary instead')
      const answeredCount = answerList.length
      router.push(`/results/mock?domain=${encodeURIComponent(domain)}&answered=${answeredCount}&total=${questions.length}`)
    } finally {
      setSubmitting(false)
    }
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  const answeredCount = questions.filter(q =>
    q.question_type === 'coding' ? !!codeAnswers[q.id] : answers[q.id] !== undefined
  ).length
  const q = questions[current]

  const testLabel: Record<string, string> = {
    technical: `Technical Assessment${domain ? ` · ${domain}` : ''}${technology ? ` · ${technology}` : ''}`,
    non_it: 'Non-IT Aptitude Assessment',
    management: 'Management Assessment',
  }

  if (loading) return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/50">Preparing your test...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header bar */}
          <div className="glass rounded-2xl px-5 py-3.5 mb-6 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{testLabel[sessionType]}</p>
                <p className="text-xs text-white/40 sm:hidden">{answeredCount}/{questions.length} answered</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 flex-1 mx-4 md:mx-8">
                <p className="text-xs text-white/40 whitespace-nowrap">{answeredCount}/{questions.length} answered</p>
                <div className="progress-bar flex-1">
                  <div className="progress-fill" style={{ width: `${questions.length ? (answeredCount/questions.length)*100 : 0}%` }} />
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${timeLeft < 300 ? 'border-red-500/40 bg-red-500/10 text-red-300' : 'border-white/10 bg-white/[0.04] text-white'}`}>
                <Clock size={15} className={timeLeft < 300 ? 'text-red-400' : 'text-brand-400'} />
                <span className="font-mono text-sm font-semibold">{fmt(timeLeft)}</span>
              </div>
            </div>
            <div className="sm:hidden flex items-center gap-2 mt-2.5">
              <div className="progress-bar flex-1">
                <div className="progress-fill" style={{ width: `${questions.length ? (answeredCount/questions.length)*100 : 0}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main question */}
            <div className="lg:col-span-3 space-y-5">
              {q && (
                <div className="glass rounded-2xl p-4 sm:p-7 border border-white/[0.08] animate-in">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge-brand">Q{current + 1}/{questions.length}</span>
                        {q.question_type === 'coding' && (
                          <span className="badge bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            <Code2 size={10} /> Coding
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-white leading-relaxed font-medium">{q.question_text}</p>
                    </div>
                    <span className="ml-4 text-xs text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] whitespace-nowrap">
                      {q.marks} {q.marks === 1 ? 'mark' : 'marks'}
                    </span>
                  </div>

                  {/* MCQ */}
                  {(q.question_type === 'MCQ' || q.question_type === 'aptitude') && q.options && (
                    <div className="space-y-2.5">
                      {q.options.map((opt, i) => {
                        const sel = answers[q.id] === i
                        return (
                          <button key={i} onClick={() => selectAnswer(q.id, i)}
                            className={`option-btn ${sel ? 'selected' : ''}`}>
                            <span className={`inline-flex w-6 h-6 rounded-full border text-xs items-center justify-center mr-3 flex-shrink-0 font-medium transition-colors ${
                              sel ? 'bg-brand-500 border-brand-500 text-white' : 'border-white/20 text-white/40'
                            }`}>{String.fromCharCode(65+i)}</span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Multi-select */}
                  {q.question_type === 'multi_select' && q.options && (
                    <div className="space-y-2.5">
                      <p className="text-xs text-white/40 mb-3">Select all that apply</p>
                      {q.options.map((opt, i) => {
                        const selected = Array.isArray(answers[q.id]) && answers[q.id].includes(i)
                        return (
                          <button key={i} onClick={() => {
                            const cur = Array.isArray(answers[q.id]) ? [...answers[q.id]] : []
                            const updated = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]
                            selectAnswer(q.id, updated)
                          }} className={`option-btn ${selected ? 'selected' : ''}`}>
                            <span className={`inline-flex w-5 h-5 rounded border text-xs items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                              selected ? 'bg-brand-500 border-brand-500 text-white' : 'border-white/20'
                            }`}>{selected ? '✓' : ''}</span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* Coding */}
                  {q.question_type === 'coding' && (
                    <div>
                      {q.coding_template && (
                        <div className="mb-3 p-3 bg-black/30 rounded-xl border border-white/[0.06]">
                          <p className="text-xs text-white/40 mb-1">Template:</p>
                          <pre className="text-xs text-brand-300 font-mono">{q.coding_template}</pre>
                        </div>
                      )}
                      <textarea
                        value={codeAnswers[q.id] || ''}
                        onChange={e => setCodeAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                        className="code-area w-full p-4"
                        rows={12}
                        placeholder="// Write your solution here..."
                      />
                    </div>
                  )}

                  {/* Descriptive */}
                  {q.question_type === 'descriptive' && (
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={e => selectAnswer(q.id, e.target.value)}
                      className="input w-full"
                      rows={6}
                      placeholder="Write your answer here..."
                    />
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={() => goTo(Math.max(0, current-1))} disabled={current===0} className="btn-secondary py-2.5 px-5 disabled:opacity-30">
                  <ChevronLeft size={16} /> Previous
                </button>
                {current < questions.length - 1 ? (
                  <button onClick={() => goTo(current+1)} className="btn-primary py-2.5 px-5">
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting} className="btn-accent py-2.5 px-6 disabled:opacity-50">
                    <Flag size={16} /> {submitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-5 border border-white/[0.08] lg:sticky lg:top-24">
                <p className="text-sm font-semibold text-white mb-4">Questions</p>
                <div className="grid grid-cols-5 gap-1.5 mb-5">
                  {questions.map((qi, i) => {
                    const isAnswered = qi.question_type === 'coding' ? !!codeAnswers[qi.id] : answers[qi.id] !== undefined
                    return (
                      <button key={i} onClick={() => goTo(i)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          i === current ? 'bg-brand-500 text-white' :
                          isAnswered ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' :
                          'bg-white/[0.04] border border-white/10 text-white/40 hover:border-white/20'
                        }`}>
                        {i+1}
                      </button>
                    )
                  })}
                </div>
                <div className="space-y-1.5 text-xs text-white/40">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-brand-500"/> Current</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/40"/> Answered</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-white/[0.04] border border-white/10"/> Unanswered</div>
                </div>
                <button onClick={handleSubmit} disabled={submitting} className="btn-accent w-full justify-center mt-5 py-2.5 text-sm disabled:opacity-50">
                  <Flag size={14}/> {submitting ? 'Submitting...' : 'Submit Test'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestPage() {
  return <Suspense fallback={<div className="min-h-screen mesh-bg flex items-center justify-center"><div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"/></div>}><TestPageInner /></Suspense>
}