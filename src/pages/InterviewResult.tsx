import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Shield, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const JOB_TITLE = 'Pediatr shifokor'
const SCORE = 78
const MAX_SCORE = 100

const FAIRNESS_CHECKS = [
  'Savollar teng darajada berilgan',
  'Baholar mantiqan mos',
  'Suhbat davomiyligi yetarli',
  'Shubhali holat aniqlanmadi',
]

const CRITERIA = [
  { name: 'Bilim darajasi', score: 24, max: 30 },
  { name: 'Tajriba', score: 20, max: 25 },
  { name: 'Muloqot qobiliyati', score: 12, max: 15 },
  { name: 'Muammoni hal qilish', score: 15, max: 20 },
  { name: 'Halollik va etika', score: 7, max: 10 },
]

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const iv = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } } }

export default function InterviewResult() {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg,
        maxWidth: '480px',
        margin: '0 auto',
        paddingBottom: '48px',
      }}
    >
      {/* Header */}
      <motion.div
        variants={iv}
        style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 28px' }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: '10px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" strokeWidth={2} />
        </motion.button>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {JOB_TITLE}
        </p>
        <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
          Suhbat natijasi
        </h1>
      </motion.div>

      <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Score card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#1E3A8A',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(30,58,138,0.28)',
          }}
        >
          <div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Umumiy ball
            </p>
            <p style={{ color: '#FFFFFF', fontSize: '44px', fontWeight: 800, fontFamily: 'Inter', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px', fontVariantNumeric: 'tabular-nums' }}>
              {SCORE}
              <span style={{ fontSize: '20px', fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>
                /{MAX_SCORE}
              </span>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'Inter' }}>
              Komissiya o'rtacha bahosi
            </p>
          </div>

          {/* Conic ring */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `conic-gradient(#00ADB5 ${(SCORE / MAX_SCORE) * 360}deg, rgba(255,255,255,0.1) 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#00ADB5', fontFamily: 'Inter' }}>
                {SCORE}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* AI Fairness card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #E8F0FE',
            boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            AI adolat tekshiruvi
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {FAIRNESS_CHECKS.map((check, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34,197,94,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle size={13} color="#22C55E" strokeWidth={2.5} />
                </div>
                <span style={{ fontSize: '13px', color: COLORS.textDark, fontFamily: 'Inter' }}>
                  {check}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                backgroundColor: 'rgba(34,197,94,0.1)',
                color: '#16A34A',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: 'Inter',
                padding: '6px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(34,197,94,0.2)',
                letterSpacing: '0.02em',
              }}
            >
              ✓ Adolatli
            </span>
          </div>
        </motion.div>

        {/* Criteria breakdown */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '18px',
            border: '1px solid #E8F0FE',
            boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '14px', letterSpacing: '-0.01em' }}>
            Batafsil baholash
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CRITERIA.map((c, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', fontVariantNumeric: 'tabular-nums' }}>
                    {c.score}/{c.max}
                  </span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.score / c.max) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 * i }}
                    style={{
                      height: '100%',
                      borderRadius: '2px',
                      backgroundColor: '#1E3A8A',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Next step card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#00ADB5',
            borderRadius: '16px',
            padding: '18px 20px',
            boxShadow: '0 4px 16px rgba(0,173,181,0.25)',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '10px', fontFamily: 'Inter', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Keyingi bosqich
          </p>
          <p style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter', marginBottom: '6px', letterSpacing: '-0.01em' }}>
            Yakuniy qaror kutilmoqda
          </p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: 'Inter', lineHeight: 1.55 }}>
            Barcha nomzodlar baholangandan so'ng qaror e'lon qilinadi
          </p>
        </motion.div>

        {/* Full report button */}
        <motion.div variants={iv}>
          <button
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              border: '1.5px solid #1E3A8A',
              backgroundColor: 'transparent',
              color: '#1E3A8A',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Inter',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              letterSpacing: '-0.01em',
            }}
          >
            To'liq hisobotni ko'rish
            <ChevronRight size={16} strokeWidth={2} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '14px' }}>
            <Shield size={11} color={COLORS.textLight} strokeWidth={1.5} />
            <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
              Ma'lumotlar shifrlangan
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}
