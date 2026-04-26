import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Shield, AlertTriangle, CheckCircle,
  Building2, MapPin, Upload, Briefcase, FileText,
  Users, AlertCircle, ChevronRight, Lock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const CATEGORIES = [
  { id: 1, label: 'Ishga qabul jarayoni', icon: Briefcase, color: '#1E3A8A', bg: '#EFF6FF' },
  { id: 2, label: 'Test manipulyatsiyasi', icon: FileText, color: '#7C3AED', bg: '#F5F3FF' },
  { id: 3, label: 'Suhbat natijasi soxtalashtirish', icon: Users, color: '#D97706', bg: '#FFFBEB' },
  { id: 4, label: 'Boshqa', icon: AlertCircle, color: '#C0392B', bg: '#FEF2F2' },
]

const STEPS = ['Kategoriya', 'Tafsilotlar', 'Yuborish']

const sv = {
  enter: (d: number) => ({ opacity: 0, x: d * 48 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: (d: number) => ({ opacity: 0, x: d * -48, transition: { duration: 0.2, ease: 'easeIn' } }),
}

function genCode() {
  return `#KX-2025-${Math.floor(1000 + Math.random() * 9000)}`
}

export default function Report() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [trackingCode] = useState(genCode)
  const [focused, setFocused] = useState('')

  const [category, setCategory] = useState<number | null>(null)
  const [org, setOrg] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  const step1Valid = category !== null
  const step2Valid = org.trim().length > 0 && region.trim().length > 0 && description.trim().length >= 50
  const step3Valid = anonymous

  const goNext = () => { setDir(1); setStep(s => s + 1) }
  const goBack = () => {
    if (step === 1) navigate(-1)
    else { setDir(-1); setStep(s => s - 1) }
  }

  const selectedCat = CATEGORIES.find(c => c.id === category)

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          minHeight: '100vh',
          backgroundColor: COLORS.bg,
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          style={{
            width: '96px', height: '96px', borderRadius: '50%',
            backgroundColor: 'rgba(0,173,181,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Shield size={48} color="#00ADB5" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
          style={{ fontSize: '22px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '8px' }}
        >
          Xabaringiz qabul qilindi!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
          style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter', textAlign: 'center', lineHeight: 1.6, marginBottom: '28px', maxWidth: '280px' }}
        >
          Xabaringiz shifrlangan holda yuborildi. Javob anonim kanal orqali keladi.
        </motion.p>

        {/* Tracking code card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #E8F0FE',
            width: '100%',
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Kuzatuv kodi
          </p>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#1E3A8A', fontFamily: 'Inter', letterSpacing: '0.04em', marginBottom: '8px' }}>
            {trackingCode}
          </p>
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', lineHeight: 1.5 }}>
            Ushbu kodni saqlang — holatingizni tekshirishda kerak bo'ladi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '28px' }}
        >
          <Lock size={11} color={COLORS.textLight} strokeWidth={1.5} />
          <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
            Xabar 256-bit shifrlash bilan himoyalangan
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          style={{
            width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
            backgroundColor: '#1E3A8A', color: '#FFFFFF',
            fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
          }}
        >
          Bosh sahifaga qaytish
        </motion.button>
      </motion.div>
    )
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '100px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 24px' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goBack}
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)', border: 'none',
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: '16px',
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" strokeWidth={2} />
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Korrupsiyani xabar qilish
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontFamily: 'Inter' }}>
              Anonim va xavfsiz
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            backgroundColor: 'rgba(0,173,181,0.2)',
            border: '1px solid rgba(0,173,181,0.35)',
            borderRadius: '20px', padding: '5px 10px', flexShrink: 0,
          }}>
            <Shield size={12} color="#00ADB5" strokeWidth={2} />
            <span style={{ color: '#00ADB5', fontSize: '11px', fontWeight: 600, fontFamily: 'Inter' }}>
              Himoyalangan
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 0' }}>

        {/* Anonymity info card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#FEF2F2',
            borderRadius: '16px',
            padding: '14px 16px',
            border: '1px solid #FECACA',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            backgroundColor: 'rgba(192,57,43,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Shield size={17} color="#C0392B" strokeWidth={1.5} />
          </div>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#C0392B', fontFamily: 'Inter', marginBottom: '3px' }}>
              Xabaringiz anonim saqlanadi
            </p>
            <p style={{ fontSize: '12px', color: '#9B1C1C', fontFamily: 'Inter', lineHeight: 1.5 }}>
              Shaxsiy ma'lumotlaringiz hech kimga ko'rsatilmaydi
            </p>
          </div>
        </motion.div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
          {STEPS.map((label, i) => {
            const n = i + 1
            const done = step > n
            const active = step === n
            return (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    backgroundColor: done ? '#00ADB5' : active ? '#1E3A8A' : '#F1F5F9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: active ? '0 3px 10px rgba(30,58,138,0.28)' : 'none',
                    transition: 'background-color 0.25s',
                  }}>
                    {done
                      ? <CheckCircle size={14} color="#FFFFFF" strokeWidth={2.5} />
                      : <span style={{ fontSize: '12px', fontWeight: 700, color: active ? '#FFFFFF' : '#9CA3AF', fontFamily: 'Inter' }}>{n}</span>
                    }
                  </div>
                  <span style={{ fontSize: '10px', fontFamily: 'Inter', fontWeight: active ? 600 : 400, color: active ? '#1E3A8A' : done ? '#00ADB5' : COLORS.textLight, whiteSpace: 'nowrap' }}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: '2px', marginTop: '13px', backgroundColor: done ? '#00ADB5' : '#E2E8F0', transition: 'background-color 0.3s' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Animated step content */}
        <div style={{ overflow: 'hidden' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={sv} initial="enter" animate="center" exit="exit">

              {/* ── STEP 1: Category ── */}
              {step === 1 && (
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                    Qaysi soha?
                  </p>
                  <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '16px' }}>
                    Muammo yuzaga kelgan sohani tanlang
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {CATEGORIES.map(cat => {
                      const Icon = cat.icon
                      const sel = category === cat.id
                      return (
                        <motion.div
                          key={cat.id}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCategory(cat.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '14px',
                            padding: '14px 16px',
                            borderRadius: '14px',
                            border: `1.5px solid ${sel ? '#1E3A8A' : COLORS.border}`,
                            backgroundColor: sel ? 'rgba(30,58,138,0.04)' : '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s, background-color 0.15s',
                            boxShadow: sel ? '0 2px 10px rgba(30,58,138,0.1)' : 'none',
                          }}
                        >
                          <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            backgroundColor: sel ? 'rgba(30,58,138,0.08)' : cat.bg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <Icon size={20} color={sel ? '#1E3A8A' : cat.color} strokeWidth={1.5} />
                          </div>
                          <span style={{ fontSize: '13px', fontWeight: sel ? 600 : 400, color: sel ? '#1E3A8A' : COLORS.textDark, fontFamily: 'Inter', flex: 1 }}>
                            {cat.label}
                          </span>
                          {sel && <CheckCircle size={16} color="#1E3A8A" strokeWidth={2} />}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Details ── */}
              {step === 2 && (
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    Tafsilotlar
                  </p>

                  {/* Org input */}
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '7px' }}>
                      Tashkilot nomi
                    </p>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <Building2 size={16} color={focused === 'org' ? '#1E3A8A' : COLORS.textLight} strokeWidth={1.5} />
                      </div>
                      <input
                        value={org}
                        onChange={e => setOrg(e.target.value)}
                        onFocus={() => setFocused('org')}
                        onBlur={() => setFocused('')}
                        placeholder="Tashkilot yoki idora nomi"
                        style={{
                          width: '100%', padding: '13px 14px 13px 42px',
                          borderRadius: '14px',
                          border: `1.5px solid ${focused === 'org' ? '#1E3A8A' : COLORS.border}`,
                          backgroundColor: focused === 'org' ? 'rgba(30,58,138,0.025)' : COLORS.card,
                          fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark,
                          outline: 'none', boxSizing: 'border-box',
                          boxShadow: focused === 'org' ? '0 0 0 3px rgba(30,58,138,0.09)' : 'none',
                          transition: 'border-color 0.15s, box-shadow 0.15s',
                        }}
                      />
                    </div>
                  </div>

                  {/* Region input */}
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '7px' }}>
                      Hudud
                    </p>
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <MapPin size={16} color={focused === 'region' ? '#1E3A8A' : COLORS.textLight} strokeWidth={1.5} />
                      </div>
                      <input
                        value={region}
                        onChange={e => setRegion(e.target.value)}
                        onFocus={() => setFocused('region')}
                        onBlur={() => setFocused('')}
                        placeholder="Viloyat yoki shahar"
                        style={{
                          width: '100%', padding: '13px 14px 13px 42px',
                          borderRadius: '14px',
                          border: `1.5px solid ${focused === 'region' ? '#1E3A8A' : COLORS.border}`,
                          backgroundColor: focused === 'region' ? 'rgba(30,58,138,0.025)' : COLORS.card,
                          fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark,
                          outline: 'none', boxSizing: 'border-box',
                          boxShadow: focused === 'region' ? '0 0 0 3px rgba(30,58,138,0.09)' : 'none',
                          transition: 'border-color 0.15s, box-shadow 0.15s',
                        }}
                      />
                    </div>
                  </div>

                  {/* Description textarea */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter' }}>
                        Voqea haqida batafsil yozing
                      </p>
                      <span style={{ fontSize: '11px', color: description.length >= 50 ? '#22C55E' : COLORS.textLight, fontFamily: 'Inter' }}>
                        {description.length}/50+
                      </span>
                    </div>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      onFocus={() => setFocused('desc')}
                      onBlur={() => setFocused('')}
                      placeholder="Voqea qachon va qanday sodir bo'lganini batafsil yozing..."
                      rows={5}
                      style={{
                        width: '100%', padding: '13px 14px',
                        borderRadius: '14px',
                        border: `1.5px solid ${focused === 'desc' ? '#1E3A8A' : description.length >= 50 ? '#22C55E' : COLORS.border}`,
                        backgroundColor: focused === 'desc' ? 'rgba(30,58,138,0.025)' : COLORS.card,
                        fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark,
                        outline: 'none', boxSizing: 'border-box', resize: 'none', lineHeight: 1.55,
                        boxShadow: focused === 'desc' ? '0 0 0 3px rgba(30,58,138,0.09)' : 'none',
                        transition: 'border-color 0.15s, box-shadow 0.15s',
                      }}
                    />
                    {description.length > 0 && description.length < 50 && (
                      <p style={{ fontSize: '11px', color: '#F59E0B', fontFamily: 'Inter', marginTop: '5px' }}>
                        Kamida {50 - description.length} ta belgi qo'shing
                      </p>
                    )}
                  </div>

                  {/* File upload */}
                  <div style={{ marginBottom: '8px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '7px' }}>
                      Dalillar <span style={{ fontWeight: 400, color: COLORS.textLight }}>(ixtiyoriy)</span>
                    </p>
                    <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={e => setFileName(e.target.files?.[0]?.name ?? '')} />
                    <div
                      onClick={() => fileRef.current?.click()}
                      style={{
                        borderRadius: '14px',
                        border: `1.5px dashed ${fileName ? '#00ADB5' : COLORS.border}`,
                        backgroundColor: fileName ? 'rgba(0,173,181,0.03)' : '#FAFAFA',
                        padding: '18px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                        cursor: 'pointer',
                        transition: 'border-color 0.15s',
                      }}
                    >
                      {fileName ? (
                        <>
                          <CheckCircle size={22} color="#00ADB5" strokeWidth={1.5} />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#00ADB5', fontFamily: 'Inter' }}>{fileName}</span>
                        </>
                      ) : (
                        <>
                          <Upload size={22} color={COLORS.textLight} strokeWidth={1.5} />
                          <span style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', textAlign: 'center' }}>
                            Rasm yoki hujjat yuklash
                          </span>
                          <span style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                            JPG, PNG, PDF · Max 10MB
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Review & Submit ── */}
              {step === 3 && (
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    Yuborish
                  </p>

                  {/* Summary card */}
                  <div style={{
                    backgroundColor: '#FFFFFF', borderRadius: '16px',
                    border: '1px solid #E8F0FE', overflow: 'hidden', marginBottom: '16px',
                  }}>
                    <div style={{ backgroundColor: 'rgba(30,58,138,0.04)', padding: '12px 16px', borderBottom: '1px solid #E8F0FE' }}>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Xabar xulosasi
                      </p>
                    </div>

                    {[
                      { label: 'Kategoriya', value: selectedCat?.label ?? '—' },
                      { label: 'Tashkilot', value: org || '—' },
                      { label: 'Hudud', value: region || '—' },
                      { label: 'Dalil', value: fileName || 'Yuklanmagan' },
                    ].map((row, i, arr) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                        padding: '12px 16px',
                        borderBottom: i < arr.length - 1 ? '1px solid #F8FAFF' : 'none',
                      }}>
                        <span style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', minWidth: '80px' }}>{row.label}</span>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter', textAlign: 'right', flex: 1, marginLeft: '12px' }}>{row.value}</span>
                      </div>
                    ))}

                    {/* Description preview */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #F8FAFF' }}>
                      <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '5px' }}>Tavsif</p>
                      <p style={{ fontSize: '12px', color: COLORS.textDark, fontFamily: 'Inter', lineHeight: 1.55 }}>
                        {description.length > 120 ? description.slice(0, 120) + '…' : description}
                      </p>
                    </div>
                  </div>

                  {/* Anonymous warning */}
                  <div style={{
                    backgroundColor: '#FEF2F2', borderRadius: '14px',
                    padding: '14px 16px', border: '1px solid #FECACA',
                    display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '16px',
                  }}>
                    <AlertTriangle size={16} color="#C0392B" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontSize: '12px', color: '#9B1C1C', fontFamily: 'Inter', lineHeight: 1.55 }}>
                      Yuborilgandan keyin xabarni o'zgartirish mumkin emas. Ma'lumotlar to'g'ri ekanligini tasdiqlang.
                    </p>
                  </div>

                  {/* Anonymous checkbox */}
                  <div
                    onClick={() => setAnonymous(v => !v)}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginBottom: '8px' }}
                  >
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '7px', flexShrink: 0, marginTop: '1px',
                      border: `2px solid ${anonymous ? '#1E3A8A' : COLORS.border}`,
                      backgroundColor: anonymous ? '#1E3A8A' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}>
                      {anonymous && <CheckCircle size={13} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                    <p style={{ fontSize: '13px', color: COLORS.textDark, fontFamily: 'Inter', lineHeight: 1.6 }}>
                      Ushbu xabar <span style={{ fontWeight: 600 }}>anonim</span> tarzda yuborilishini va shaxsiy ma'lumotlarim himoyalanishini tasdiqlaman
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed bottom button */}
      <div style={{
        position: 'fixed', bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px',
        padding: '12px 20px 28px',
        backgroundColor: COLORS.bg,
        borderTop: `1px solid ${COLORS.border}`,
      }}>
        {step < 3 ? (
          <motion.button
            whileTap={(step === 1 ? step1Valid : step2Valid) ? { scale: 0.97 } : {}}
            onClick={() => (step === 1 ? step1Valid : step2Valid) && goNext()}
            style={{
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
              backgroundColor: (step === 1 ? step1Valid : step2Valid) ? '#1E3A8A' : '#D1D9EE',
              color: (step === 1 ? step1Valid : step2Valid) ? '#FFFFFF' : '#8FA0C4',
              fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
              cursor: (step === 1 ? step1Valid : step2Valid) ? 'pointer' : 'not-allowed',
              letterSpacing: '-0.01em',
              boxShadow: (step === 1 ? step1Valid : step2Valid) ? '0 4px 16px rgba(30,58,138,0.3)' : 'none',
              transition: 'background-color 0.2s, box-shadow 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}
          >
            Davom etish
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        ) : (
          <motion.button
            whileTap={step3Valid ? { scale: 0.97 } : {}}
            onClick={() => step3Valid && setSubmitted(true)}
            style={{
              width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
              backgroundColor: step3Valid ? '#C0392B' : '#D1D9EE',
              color: step3Valid ? '#FFFFFF' : '#8FA0C4',
              fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
              cursor: step3Valid ? 'pointer' : 'not-allowed',
              letterSpacing: '-0.01em',
              boxShadow: step3Valid ? '0 4px 16px rgba(192,57,43,0.35)' : 'none',
              transition: 'background-color 0.2s, box-shadow 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            }}
          >
            <Shield size={16} strokeWidth={2} />
            Xabar yuborish
          </motion.button>
        )}
      </div>
    </div>
  )
}
