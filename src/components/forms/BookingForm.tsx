'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, Loader2 } from 'lucide-react'

export interface BookingFieldOption {
  value: string
  label: string
}

export interface BookingField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required?: boolean
  placeholder?: string
  options?: BookingFieldOption[]
}

interface BookingFormProps {
  fields: BookingField[]
  onSubmit: (data: Record<string, string>) => Promise<any>
  submitLabel?: string
  successTitle?: string
  successMessage?: string
}

export default function BookingForm({
  fields,
  onSubmit,
  submitLabel = 'Submit request',
  successTitle = "You're on the list",
  successMessage = "A counselor will reach out to the contact details you shared, usually within one business day.",
}: BookingFormProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [assignedName, setAssignedName] = useState<string | null>(null)

  const handleChange = (name: string, value: string) => {
    setValues(v => ({ ...v, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    for (const f of fields) {
      if (f.required && !values[f.name]) {
        toast.error(`Please fill in ${f.label.toLowerCase()}`)
        return
      }
    }
    setLoading(true)
    try {
      const result = await onSubmit(values)
      setAssignedName(result?.counselor?.full_name || null)
      setDone(true)
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong — please try again')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="glass rounded-3xl p-8 border border-white/[0.08] text-center">
        <div className="w-14 h-14 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={26} className="text-accent-400" />
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">{successTitle}</h3>
        <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed">
          {assignedName
            ? `${assignedName} has been assigned to your request. ${successMessage}`
            : successMessage}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/[0.08] space-y-5">
      {fields.map(f => (
        <div key={f.name}>
          <label className="label">{f.label}{f.required && <span className="text-brand-400"> *</span>}</label>
          {f.type === 'textarea' ? (
            <textarea
              className="input min-h-[100px] resize-none"
              placeholder={f.placeholder}
              value={values[f.name] || ''}
              onChange={e => handleChange(f.name, e.target.value)}
            />
          ) : f.type === 'select' ? (
            <select
              className="input"
              value={values[f.name] || ''}
              onChange={e => handleChange(f.name, e.target.value)}
            >
              <option value="">Select an option</option>
              {f.options?.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type}
              className="input"
              placeholder={f.placeholder}
              value={values[f.name] || ''}
              onChange={e => handleChange(f.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60">
        {loading ? <Loader2 size={18} className="animate-spin" /> : null}
        {loading ? 'Submitting…' : submitLabel}
      </button>
    </form>
  )
}
