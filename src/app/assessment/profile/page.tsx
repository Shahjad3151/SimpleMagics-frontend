'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { testApi } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'

interface Question {
  id: number
  question_text: string
  question_type: string
  options: string[]
  marks: number
  is_interest_signal?: boolean
}

interface Answer {
  question_id: number
  user_answer: any
  time_spent_seconds: number
}

export default function ProfileAssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 min
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [questionStart, setQuestionStart] = useState(Date.now())
  const router = useRouter()
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    startTest()
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [sessionId])

  const startTest = async () => {
    try {
      const data = await testApi.startTest({ session_type: 'profile_fit' })
      setSessionId(data.session_id)
      setQuestions(data.questions)
      setTimeLeft((data.duration_minutes || 30) * 60)
    } catch (err: any) {
      toast.error(err.message || 'Failed to load test')
    } finally {
      setLoading(false)
    }
  }

  const selectAnswer = (qId: number, answer: any) => {
    const spent = Math.round((Date.now() - questionStart) / 1000)
    setAnswers(prev => ({ ...prev, [qId]: { question_id: qId, user_answer: answer, time_spent_seconds: spent } }))
  }

  const goTo = (i: number) => {
    setQuestionStart(Date.now())
    setCurrent(i)
  }

  const skipQuestion = (qId: number) => {
    // Explicitly leave this question unanswered rather than forcing a pick
    // that doesn't reflect the person — a forced-but-inauthentic answer on
    // an interest question is worse than one fewer data point. The vote
    // tally and "mixed signal" check already handle a variable number of
    // answered questions correctly.
    setAnswers(prev => {
      const next = { ...prev }
      delete next[qId]
      return next
    })
    if (current < questions.length - 1) goTo(current + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    if (!sessionId) return
    setSubmitting(true)
    clearInterval(timerRef.current)
    try {
      const totalTime = 30 * 60 - timeLeft
      const answerList = Object.values(answers)
      const result = await testApi.submitTest({
        test_session_id: sessionId,
        answers: answerList,
        time_taken_seconds: totalTime,
      })
      toast.success('Test submitted!')
      router.push(`/results/${result.result_id}`)
    } catch (err: any) {
      toast.error(err.message || 'Submit failed')
    } finally {
      setSubmitting(false)
    }
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`
  const answeredCount = Object.keys(answers).length
  const q = questions[current]

  if (loading) return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="text-center animate-in">
        <div className="w-12 h-12 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/50">Loading your assessment...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Top bar */}
          <div className="glass rounded-2xl px-5 py-3.5 mb-6 border border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Profile Fit Assessment</p>
                <p className="text-xs text-white/40 sm:hidden">{answeredCount} of {questions.length} answered</p>
              </div>
              {/* Progress — desktop inline */}
              <div className="hidden sm:flex items-center gap-3 flex-1 mx-4 md:mx-8">
                <p className="text-xs text-white/40 whitespace-nowrap">{answeredCount} of {questions.length} answered</p>
                <div className="progress-bar flex-1">
                  <div className="progress-fill" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
                </div>
                <span className="text-xs text-white/40 whitespace-nowrap">{Math.round((answeredCount/questions.length)*100)}%</span>
              </div>
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${timeLeft < 300 ? 'border-red-500/40 bg-red-500/10 text-red-300' : 'border-white/10 bg-white/[0.04] text-white'}`}>
                <Clock size={15} className={timeLeft < 300 ? 'text-red-400' : 'text-brand-400'} />
                <span className="font-mono text-sm font-semibold">{fmt(timeLeft)}</span>
              </div>
            </div>
            {/* Progress — mobile, full width, always visible */}
            <div className="sm:hidden flex items-center gap-2 mt-2.5">
              <div className="progress-bar flex-1">
                <div className="progress-fill" style={{ width: `${(answeredCount / questions.length) * 100}%` }} />
              </div>
              <span className="text-xs text-white/40 whitespace-nowrap">{Math.round((answeredCount/questions.length)*100)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question panel */}
            <div className="lg:col-span-3 space-y-5">
              {q && (
                <div className="glass rounded-2xl p-4 sm:p-7 border border-white/[0.08] animate-in">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="badge-brand mb-3 inline-flex">Question {current + 1} / {questions.length}</span>
                      <p className="text-lg text-white leading-relaxed font-medium">{q.question_text}</p>
                    </div>
                    <span className="ml-4 text-xs text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06] whitespace-nowrap">
                      {q.marks} {q.marks === 1 ? 'mark' : 'marks'}
                    </span>
                  </div>

                  {/* MCQ Options */}
                  {q.options && (
                    <div className="space-y-2.5">
                      {q.options.map((opt, i) => {
                        const isSelected = answers[q.id]?.user_answer === i
                        return (
                          <button
                            key={i}
                            onClick={() => selectAnswer(q.id, i)}
                            className={`option-btn ${isSelected ? 'selected' : ''}`}
                          >
                            <span className={`inline-flex w-6 h-6 rounded-full border text-xs items-center justify-center mr-3 flex-shrink-0 font-medium transition-colors ${
                              isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-white/20 text-white/40'
                            }`}>
                              {String.fromCharCode(65 + i)}
                            </span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {q.is_interest_signal && (
                    <button
                      onClick={() => skipQuestion(q.id)}
                      className="mt-4 text-xs text-white/30 hover:text-white/50 underline underline-offset-4 transition-colors"
                    >
                      None of these quite fit — skip this one
                    </button>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={() => goTo(Math.max(0, current - 1))} disabled={current === 0}
                  className="btn-secondary py-2.5 px-5 disabled:opacity-30">
                  <ChevronLeft size={16} /> Previous
                </button>
                {current < questions.length - 1 ? (
                  <button onClick={() => goTo(current + 1)} className="btn-primary py-2.5 px-5">
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={submitting}
                    className="btn-accent py-2.5 px-6 disabled:opacity-50">
                    <Flag size={16} />
                    {submitting ? 'Submitting...' : 'Submit Test'}
                  </button>
                )}
              </div>
            </div>

            {/* Question navigation sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-5 border border-white/[0.08] lg:sticky lg:top-24">
                <p className="text-sm font-semibold text-white mb-4">Questions</p>
                <div className="grid grid-cols-5 gap-1.5 mb-5">
                  {questions.map((_, i) => {
                    const answered = !!answers[questions[i]?.id]
                    const isActive = i === current
                    return (
                      <button key={i} onClick={() => goTo(i)}
                        className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                          isActive ? 'bg-brand-500 text-white' :
                          answered ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' :
                          'bg-white/[0.04] border border-white/10 text-white/40 hover:border-white/20'
                        }`}>
                        {i + 1}
                      </button>
                    )
                  })}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-white/40">
                    <div className="w-3 h-3 rounded bg-brand-500" /> Current
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/40" /> Answered
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <div className="w-3 h-3 rounded bg-white/[0.04] border border-white/10" /> Not answered
                  </div>
                </div>

                {answeredCount === questions.length && (
                  <button onClick={handleSubmit} disabled={submitting}
                    className="btn-accent w-full justify-center mt-5 py-2.5 text-sm disabled:opacity-50">
                    <Flag size={14} />
                    {submitting ? 'Submitting...' : 'Submit Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
