import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, ChevronLeft, Upload, Link, FileText, CheckCircle, Shield } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { COLORS, iv } from '../lib/constants'
import { VACANCIES } from '../data/mockData'

export default function Apply() {
  const navigate = useNavigate()
  const { id } = useParams()
  const vacancy = VACANCIES.find(v => v.id === Number(id))

  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    bio: '',
    portfolio: '',
    linkedin: '',
    github: '',
    whyMe: '',
    experience: '',
    salary: '',
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }))

  const canNext = () => {
    if (step === 1) return form.firstName && form.lastName && form.phone && form.email
    if (step === 2) return true
    if (step === 3) return form.whyMe && form.experience
    return true
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
          <CheckCircle size={64} color={COLORS.accent} strokeWidth={1.5} />
        </motion.div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginTop: '24px', letterSpacing: '-0.02em' }}>
          Ariza yuborildi!
        </h2>
        <p style={{ fontSize: '14px', color: COLORS.textMid, fontFamily: 'Inter', marginTop: '12px', lineHeight: 1.6 }}>
          Arizangiz xavfsiz tarzda qabul qilindi. Natija haqida xabar beramiz.
        </p>
        <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px', marginTop: '24px', border: `1px solid ${COLORS.border}`, width: '100%', maxWidth: '320px' }}>
          <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter' }}>Kuzatuv raqami</p>
          <p style={{ fontSize: '18px', fontWeight: 700, color: COLORS.primary, fontFamily: 'Inter', marginTop: '4px', letterSpacing: '0.05em' }}>
            #IQ-2025-{Math.floor(Math.random() * 9000) + 1000}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate('/applications')}
          style={{ marginTop: '32px', backgroundColor: COLORS.primary, color: '#FFFFFF', border: 'none', borderRadius: '14px', padding: '16px 40px', fontSize: '15px', fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer' }}
        >
          Arizalarimga o'tish
        </motion.button>
      </motion.div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 14px',
    borderRadius: '12px',
    border: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.card,
    fontSize: '14px',
    fontFamily: 'Inter',
    color: COLORS.textDark,
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '12px',
  }

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 500,
    color: COLORS.textMid,
    fontFamily: 'Inter',
    marginBottom: '6px',
    display: 'block' as const,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '100px' }}
    >
      {/* Header */}
      <div style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ArrowLeft size={17} color="#FFFFFF" strokeWidth={2} />
          </motion.button>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>
              {step} / 4 — {['Shaxsiy ma\'lumotlar', 'CV va hujjatlar', 'Qo\'shimcha savollar', 'Tekshirish'][step - 1]}
            </p>
            <h1 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {vacancy?.title || 'Ariza yuborish'}
            </h1>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{ height: '100%', backgroundColor: COLORS.accent, borderRadius: '2px' }}
          />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <AnimatePresence mode="wait">

          {/* Step 1 — Shaxsiy ma'lumotlar */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <label style={labelStyle}>Ism <span style={{ color: COLORS.error }}>*</span></label>
              <input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Ismingiz" style={inputStyle} />

              <label style={labelStyle}>Familiya <span style={{ color: COLORS.error }}>*</span></label>
              <input value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Familiyangiz" style={inputStyle} />

              <label style={labelStyle}>Telefon <span style={{ color: COLORS.error }}>*</span></label>
              <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+998 90 000 00 00" style={inputStyle} />

              <label style={labelStyle}>Email <span style={{ color: COLORS.error }}>*</span></label>
              <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@gmail.com" style={inputStyle} />

              <label style={labelStyle}>Shahar</label>
              <input value={form.city} onChange={e => update('city', e.target.value)} placeholder="Toshkent" style={inputStyle} />

              <label style={labelStyle}>Qisqacha bio</label>
              <textarea value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="O'zingiz haqida qisqacha..." rows={3}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />
            </motion.div>
          )}

          {/* Step 2 — CV va hujjatlar */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              {/* CV yuklash */}
              <motion.div
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: COLORS.card, borderRadius: '14px', padding: '20px', border: `2px dashed ${COLORS.border}`, textAlign: 'center', cursor: 'pointer', marginBottom: '16px' }}
              >
                <Upload size={28} color={COLORS.textLight} strokeWidth={1.5} style={{ margin: '0 auto 10px' }} />
                <p style={{ fontSize: '14px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter' }}>CV yuklash</p>
                <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '4px' }}>PDF, DOC — max 5MB</p>
              </motion.div>

              <label style={labelStyle}>Portfolio yoki veb-sayt</label>
              <div style={{ position: 'relative' }}>
                <Link size={15} color={COLORS.textLight} strokeWidth={1.5} style={{ position: 'absolute', left: '14px', top: '14px' }} />
                <input value={form.portfolio} onChange={e => update('portfolio', e.target.value)} placeholder="https://..." style={{ ...inputStyle, paddingLeft: '40px' }} />
              </div>

              <label style={labelStyle}>LinkedIn</label>
              <input value={form.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="linkedin.com/in/username" style={inputStyle} />

              <label style={labelStyle}>GitHub</label>
              <input value={form.github} onChange={e => update('github', e.target.value)} placeholder="github.com/username" style={inputStyle} />
            </motion.div>
          )}

          {/* Step 3 — Qo'shimcha savollar */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <label style={labelStyle}>Nega bu lavozimga mosligingizni o'ylaysiz? <span style={{ color: COLORS.error }}>*</span></label>
              <textarea value={form.whyMe} onChange={e => update('whyMe', e.target.value)} placeholder="O'zingizning kuchli tomonlaringiz..." rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />

              <label style={labelStyle}>Tajribangiz haqida <span style={{ color: COLORS.error }}>*</span></label>
              <textarea value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Oldingi ish tajribangiz..." rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} />

              <label style={labelStyle}>Kutilayotgan maosh (so'm)</label>
              <input value={form.salary} onChange={e => update('salary', e.target.value)} placeholder="5,000,000" style={inputStyle} />
            </motion.div>
          )}

          {/* Step 4 — Tekshirish */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <p style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '16px' }}>
                Ma'lumotlaringizni tekshirib, yuborish tugmasini bosing.
              </p>

              {[
                { label: 'Ism familiya', value: `${form.firstName} ${form.lastName}` },
                { label: 'Telefon', value: form.phone },
                { label: 'Email', value: form.email },
                { label: 'Shahar', value: form.city || '—' },
                { label: 'Kutilayotgan maosh', value: form.salary || '—' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${COLORS.borderLight}` }}>
                  <span style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: 'Inter' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter' }}>{item.value}</span>
                </div>
              ))}

              {/* Rozilik */}
              <div style={{ backgroundColor: COLORS.bg, borderRadius: '14px', padding: '16px', marginTop: '20px', border: `1px solid ${COLORS.border}`, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <input type="checkbox" style={{ marginTop: '2px', flexShrink: 0, accentColor: COLORS.primary }} />
                <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.6 }}>
                  Ma'lumotlarim ishga qabul jarayoni uchun ishlatilishiga roziman va maxfiylik siyosati bilan tanishganman.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Tugmalar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', padding: '16px 20px', backgroundColor: COLORS.bg, borderTop: `1px solid ${COLORS.border}`, display: 'flex', gap: '12px' }}>
        {step > 1 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setStep(step - 1)}
            style={{ flex: 1, backgroundColor: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '15px', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', color: COLORS.primary, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Orqaga
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => step < 4 ? setStep(step + 1) : setSubmitted(true)}
          disabled={!canNext()}
          style={{ flex: 2, backgroundColor: canNext() ? COLORS.primary : COLORS.border, border: 'none', borderRadius: '14px', padding: '15px', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', color: canNext() ? '#FFFFFF' : COLORS.textLight, cursor: canNext() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          {step < 4 ? 'Davom etish' : 'Yuborish'}
          {step < 4 && <ChevronRight size={16} strokeWidth={2} />}
        </motion.button>
      </div>
    </motion.div>
  )
}