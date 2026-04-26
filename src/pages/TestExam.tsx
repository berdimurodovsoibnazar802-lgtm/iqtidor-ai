import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const QUESTIONS = [
  {
    id: 1,
    text: "JavaScript da closure nima?",
    options: ["Funksiya ichidagi funksiya", "Global o'zgaruvchi", "Array metodi", "Object kalit"],
  },
  {
    id: 2,
    text: "REST API da PUT va PATCH farqi?",
    options: ["Farqi yo'q", "PUT to'liq, PATCH qisman", "PUT qisman, PATCH to'liq", "Ikkalasi o'chiradi"],
  },
  {
    id: 3,
    text: "SQL da JOIN turlari?",
    options: ["INNER, LEFT, RIGHT, FULL", "Faqat INNER", "TOP, BOTTOM", "SELECT, INSERT"],
  },
]

const CORRECT: Record<number, number> = { 1: 0, 2: 1, 3: 0 }
const LABELS = ['A', 'B', 'C', 'D']
const INITIAL_TIME = 1785 // 29:45

const qVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 44 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.26, ease: 'easeOut' } },
  exit: (d: number) => ({ opacity: 0, x: d * -44, transition: { duration: 0.18, ease: 'easeIn' } }),
}

export default function TestExam() {
  const navigate = useNavigate()

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [submitted, setSubmitted] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [dir, setDir] = useState(1)

  const dotRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (submitted) return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setSubmitted(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [submitted])

  // Scroll current dot into view
  useEffect(() => {
    dotRefs.current[currentQ]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [currentQ])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const total = QUESTIONS.length
  const question = QUESTIONS[currentQ]
  const isFirst = currentQ === 0
  const isLast = currentQ === total - 1
  const timerRed = timeLeft < 300

  const select = (idx: number) =>
    setAnswers(prev => ({ ...prev, [question.id]: idx }))

  const goNext = () => {
    if (isLast) { setSubmitted(true) }
    else { setDir(1); setCurrentQ(q => q + 1) }
  }

  const goPrev = () => {
    if (!isFirst) { setDir(-1); setCurrentQ(q => q - 1) }
  }

  const correct = QUESTIONS.filter(q => answers[q.id] === CORRECT[q.id]).length
  const wrong = total - correct
  const pct = Math.round((correct / total) * 100)
  const passed = pct >= 60

  // ── Result screen ──────────────────────────────────────────────────────────
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
        {/* Circular indicator */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: `conic-gradient(${passed ? '#00ADB5' : '#EF4444'} ${pct * 3.6}deg, #E8F0FE 0deg)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <div style={{
            width: '94px',
            height: '94px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: '#1E3A8A', fontFamily: 'Inter', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {pct}%
            </span>
          </div>
        </motion.div>

        {/* Score */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          style={{ fontSize: '40px', fontWeight: 800, color: '#1E3A8A', fontFamily: 'Inter', letterSpacing: '-0.04em', marginBottom: '4px', fontVariantNumeric: 'tabular-nums' }}
        >
          {correct}/{total}
        </motion.p>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          style={{
            backgroundColor: passed ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${passed ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
            borderRadius: '20px',
            padding: '5px 16px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: passed ? '#16A34A' : '#DC2626', fontFamily: 'Inter' }}>
            {passed ? "✓ O'tdingiz!" : "✗ O'tmadingiz"}
          </span>
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E8F0FE',
            width: '100%',
            marginBottom: '28px',
            display: 'flex',
            gap: '0',
          }}
        >
          <StatCell
            icon={<CheckCircle size={18} color="#22C55E" strokeWidth={2} />}
            label="To'g'ri"
            value={String(correct)}
            color="#22C55E"
          />
          <div style={{ width: '1px', backgroundColor: '#F1F5F9' }} />
          <StatCell
            icon={<XCircle size={18} color="#EF4444" strokeWidth={2} />}
            label="Noto'g'ri"
            value={String(wrong)}
            color="#EF4444"
          />
          <div style={{ width: '1px', backgroundColor: '#F1F5F9' }} />
          <StatCell
            icon={<Clock size={18} color={COLORS.textLight} strokeWidth={1.5} />}
            label="Savol"
            value={String(total)}
            color={COLORS.textMid}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/applications')}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            border: 'none',
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
          }}
        >
          Natijani ko'rish
        </motion.button>
      </motion.div>
    )
  }

  // ── Exam screen ────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.bg,
      maxWidth: '480px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          {/* Exit button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowExitModal(true)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: 'none',
              borderRadius: '10px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="#FFFFFF" strokeWidth={2.5} />
          </motion.button>

          {/* Title */}
          <p style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', letterSpacing: '-0.01em' }}>
            Backend Developer testi
          </p>

          {/* Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: timerRed ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.12)',
            border: timerRed ? '1px solid rgba(239,68,68,0.35)' : 'none',
            padding: '5px 10px',
            borderRadius: '20px',
            transition: 'background-color 0.3s',
          }}>
            <Clock size={11} color={timerRed ? '#FCA5A5' : 'rgba(255,255,255,0.7)'} strokeWidth={2} />
            <span style={{
              color: timerRed ? '#FCA5A5' : '#FFFFFF',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'Inter',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.01em',
            }}>
              {fmt(timeLeft)}
            </span>
          </div>
        </div>

        {/* Progress label */}
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontFamily: 'Inter', textAlign: 'center' }}>
          {currentQ + 1}/{total} savol · {Object.keys(answers).length} javob berildi
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', backgroundColor: 'rgba(30,58,138,0.12)', flexShrink: 0 }}>
        <motion.div
          animate={{ width: `${((currentQ + 1) / total) * 100}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ height: '100%', backgroundColor: '#00ADB5' }}
        />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 0' }}>

        {/* Question card */}
        <div style={{ overflow: 'hidden', marginBottom: '16px' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={currentQ}
              custom={dir}
              variants={qVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: '1px solid #E8F0FE',
                boxShadow: '0 2px 12px rgba(30,58,138,0.06)',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                Savol {currentQ + 1}
              </p>
              <p style={{ fontSize: '15px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', lineHeight: 1.55, marginBottom: '18px', letterSpacing: '-0.01em' }}>
                {question.text}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {question.options.map((opt, idx) => {
                  const isSelected = answers[question.id] === idx
                  return (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => select(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '14px',
                        border: `1.5px solid ${isSelected ? '#1E3A8A' : '#E8F0FE'}`,
                        backgroundColor: isSelected ? '#1E3A8A' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.15s, border-color 0.15s',
                        boxShadow: isSelected ? '0 4px 12px rgba(30,58,138,0.2)' : 'none',
                      }}
                    >
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : '#F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: isSelected ? '#FFFFFF' : COLORS.textMid,
                        fontFamily: 'Inter',
                        flexShrink: 0,
                      }}>
                        {LABELS[idx]}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? '#FFFFFF' : COLORS.textDark,
                        fontFamily: 'Inter',
                        lineHeight: 1.4,
                      }}>
                        {opt}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Question dots */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px', paddingTop: '4px' }}>
          {QUESTIONS.map((q, i) => {
            const isCurrent = i === currentQ
            const isAnswered = answers[q.id] !== undefined
            return (
              <div
                key={q.id}
                ref={el => { dotRefs.current[i] = el }}
                onClick={() => { setDir(i > currentQ ? 1 : -1); setCurrentQ(i) }}
                style={{
                  width: isCurrent ? '24px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: isCurrent ? '#1E3A8A' : isAnswered ? '#00ADB5' : '#CBD5E1',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'width 0.25s, background-color 0.2s',
                }}
              />
            )
          })}
        </div>

        <div style={{ height: '96px' }} />
      </div>

      {/* Fixed navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        padding: '12px 20px 28px',
        backgroundColor: COLORS.bg,
        borderTop: `1px solid ${COLORS.border}`,
        display: 'flex',
        gap: '10px',
      }}>
        <motion.button
          whileTap={!isFirst ? { scale: 0.96 } : {}}
          onClick={goPrev}
          disabled={isFirst}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '14px',
            border: `1.5px solid ${isFirst ? COLORS.borderLight : COLORS.border}`,
            backgroundColor: 'transparent',
            color: isFirst ? COLORS.textLight : COLORS.textDark,
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
          Oldingi
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={goNext}
          style={{
            flex: 1.6,
            padding: '14px',
            borderRadius: '14px',
            border: 'none',
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            boxShadow: '0 4px 14px rgba(30,58,138,0.28)',
          }}
        >
          {isLast ? 'Yakunlash' : 'Keyingi'}
          {!isLast && <ChevronRight size={16} strokeWidth={2.5} />}
        </motion.button>
      </div>

      {/* Exit warning modal */}
      <AnimatePresence>
        {showExitModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitModal(false)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 100, backdropFilter: 'blur(6px)' }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: '480px',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px 24px 0 0',
                padding: '16px 20px 40px',
                zIndex: 101,
              }}
            >
              <div style={{ width: '36px', height: '4px', backgroundColor: '#E2E8F0', borderRadius: '2px', margin: '0 auto 20px' }} />

              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                backgroundColor: 'rgba(239,68,68,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <XCircle size={28} color="#EF4444" strokeWidth={1.5} />
              </div>

              <h3 style={{ color: COLORS.textDark, fontSize: '18px', fontWeight: 700, fontFamily: 'Inter', textAlign: 'center', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                Test yakunlanmagan!
              </h3>
              <p style={{ color: COLORS.textMid, fontSize: '13px', fontFamily: 'Inter', textAlign: 'center', lineHeight: 1.6, marginBottom: '24px' }}>
                Chiqsangiz natijalaringiz saqlanmaydi. Davom etishni tavsiya etamiz.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate('/applications')}
                  style={{
                    flex: 1, padding: '14px', borderRadius: '12px',
                    border: `1px solid ${COLORS.border}`,
                    backgroundColor: 'transparent',
                    color: '#EF4444',
                    fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer',
                  }}
                >
                  Chiqish
                </button>
                <button
                  onClick={() => setShowExitModal(false)}
                  style={{
                    flex: 1.4, padding: '14px', borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#1E3A8A',
                    color: '#FFFFFF',
                    fontSize: '14px', fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(30,58,138,0.28)',
                  }}
                >
                  Davom etish
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatCell({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 0' }}>
      {icon}
      <span style={{ fontSize: '20px', fontWeight: 700, color, fontFamily: 'Inter', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>
      <span style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter' }}>
        {label}
      </span>
    </div>
  )
}
