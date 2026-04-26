import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, CheckCircle, Minus, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const CANDIDATE_NAME = 'Azizbek Toshmatov'
const CANDIDATE_POSITION = 'Pediatr shifokor'
const CANDIDATE_ID = '#IQ-2025-1234'

const CRITERIA = [
  { id: 1, name: 'Bilim darajasi', max: 30 },
  { id: 2, name: 'Tajriba', max: 25 },
  { id: 3, name: 'Muloqot qobiliyati', max: 15 },
  { id: 4, name: 'Muammoni hal qilish', max: 20 },
  { id: 5, name: 'Halollik va etika', max: 10 },
]

const MAX_TOTAL = CRITERIA.reduce((sum, c) => sum + c.max, 0)

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }
const iv = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } }

export default function EvaluationForm() {
  const navigate = useNavigate()

  const [scores, setScores] = useState<Record<number, number>>(
    Object.fromEntries(CRITERIA.map(c => [c.id, 0]))
  )
  const [comments, setComments] = useState<Record<number, string>>(
    Object.fromEntries(CRITERIA.map(c => [c.id, '']))
  )
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0)
  const allCommentsFilled = CRITERIA.every(c => comments[c.id].trim().length > 0)

  const adjustScore = (id: number, delta: number) => {
    const criterion = CRITERIA.find(c => c.id === id)!
    setScores(prev => ({
      ...prev,
      [id]: Math.max(0, Math.min(criterion.max, (prev[id] ?? 0) + delta)),
    }))
  }

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
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,173,181,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <CheckCircle size={52} color="#00ADB5" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: COLORS.textDark,
            fontFamily: 'Inter',
            letterSpacing: '-0.02em',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Baholash yuborildi
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '13px',
            color: COLORS.textMid,
            fontFamily: 'Inter',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '280px',
          }}
        >
          Boshqa a'zolar baholari siz yuborguncha yashirin edi
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px 20px',
            border: '1px solid #E8F0FE',
            width: '100%',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '3px' }}>
              Jami ball
            </p>
            <p style={{ fontSize: '26px', fontWeight: 700, color: '#1E3A8A', fontFamily: 'Inter', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              {totalScore}
              <span style={{ fontSize: '14px', fontWeight: 400, color: COLORS.textLight }}>
                /{MAX_TOTAL}
              </span>
            </p>
          </div>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `conic-gradient(#00ADB5 ${(totalScore / MAX_TOTAL) * 360}deg, #E8F0FE 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#00ADB5', fontFamily: 'Inter' }}>
                {Math.round((totalScore / MAX_TOTAL) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
            letterSpacing: '-0.01em',
            boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
          }}
        >
          Arizalarga qaytish
        </motion.button>
      </motion.div>
    )
  }

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
        paddingBottom: '128px',
      }}
    >
      {/* Header */}
      <motion.div
        variants={iv}
        style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 24px' }}
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
          {CANDIDATE_NAME}
        </p>
        <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
          Baholash varaqa
        </h1>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Candidate info card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E8F0FE',
            boxShadow: '0 2px 8px rgba(30,58,138,0.05)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '3px', letterSpacing: '-0.01em' }}>
                {CANDIDATE_NAME}
              </p>
              <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>
                {CANDIDATE_POSITION}
              </p>
            </div>
            <span style={{
              backgroundColor: 'rgba(30,58,138,0.07)',
              color: '#1E3A8A',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'Inter',
              padding: '4px 10px',
              borderRadius: '20px',
              letterSpacing: '0.02em',
            }}>
              {CANDIDATE_ID}
            </span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#F1F5F9', marginBottom: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Shield size={11} color={COLORS.textLight} strokeWidth={1.5} />
            <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
              Shaxsiy ma'lumotlar yashirilgan
            </span>
          </div>
        </motion.div>

        {/* Criteria cards */}
        {CRITERIA.map(criterion => {
          const score = scores[criterion.id] ?? 0
          const comment = comments[criterion.id] ?? ''
          const ratio = score / criterion.max
          const commentFilled = comment.trim().length > 0

          return (
            <motion.div
              key={criterion.id}
              variants={iv}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px',
                border: `1px solid ${commentFilled ? '#E8F0FE' : '#F1F5F9'}`,
                boxShadow: '0 2px 8px rgba(30,58,138,0.04)',
                marginBottom: '10px',
              }}
            >
              {/* Criterion header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
                  {criterion.name}
                </p>
                <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                  max {criterion.max} ball
                </span>
              </div>

              {/* Score control */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <button
                  onClick={() => adjustScore(criterion.id, -1)}
                  disabled={score === 0}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: '1px solid #E8F0FE',
                    backgroundColor: score === 0 ? '#F8FAFF' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: score === 0 ? 'not-allowed' : 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Minus size={14} color={score === 0 ? '#CBD5E1' : '#1E3A8A'} strokeWidth={2} />
                </button>

                <div style={{ flex: 1 }}>
                  {/* Progress bar */}
                  <div style={{ height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                    <motion.div
                      animate={{ width: `${ratio * 100}%` }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        borderRadius: '3px',
                        backgroundColor: ratio > 0.8 ? '#00ADB5' : ratio > 0.5 ? '#1E3A8A' : '#93C5FD',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#1E3A8A',
                      fontFamily: 'Inter',
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {score}
                      <span style={{ fontSize: '12px', fontWeight: 400, color: COLORS.textLight }}>
                        /{criterion.max}
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => adjustScore(criterion.id, 1)}
                  disabled={score === criterion.max}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    border: '1px solid #E8F0FE',
                    backgroundColor: score === criterion.max ? '#F8FAFF' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: score === criterion.max ? 'not-allowed' : 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <Plus size={14} color={score === criterion.max ? '#CBD5E1' : '#1E3A8A'} strokeWidth={2} />
                </button>
              </div>

              {/* Comment textarea */}
              <textarea
                value={comment}
                onChange={e => setComments(prev => ({ ...prev, [criterion.id]: e.target.value }))}
                placeholder="Izoh yozing..."
                rows={2}
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  border: `1px solid ${commentFilled ? '#00ADB5' : '#E2E8F0'}`,
                  padding: '10px 12px',
                  fontSize: '12px',
                  fontFamily: 'Inter',
                  color: COLORS.textDark,
                  backgroundColor: commentFilled ? 'rgba(0,173,181,0.03)' : '#FAFAFA',
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
              />
            </motion.div>
          )
        })}

        {/* Total score card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#1E3A8A',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '4px' }}>
              Jami ball
            </p>
            <p style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
              {totalScore}
              <span style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', marginLeft: '2px' }}>
                /{MAX_TOTAL}
              </span>
            </p>
          </div>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: `conic-gradient(#00ADB5 ${(totalScore / MAX_TOTAL) * 360}deg, rgba(255,255,255,0.12) 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#00ADB5', fontFamily: 'Inter' }}>
                {Math.round((totalScore / MAX_TOTAL) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>

        {!allCommentsFilled && (
          <motion.p
            variants={iv}
            style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', textAlign: 'center', marginTop: '6px' }}
          >
            Yuborish uchun barcha izohlari to'ldiring
          </motion.p>
        )}

      </div>

      {/* Fixed submit button */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '480px',
          padding: '12px 20px 28px',
          backgroundColor: COLORS.bg,
          borderTop: '1px solid #E8F0FE',
        }}
      >
        <motion.button
          whileTap={allCommentsFilled ? { scale: 0.97 } : {}}
          onClick={() => allCommentsFilled && setShowModal(true)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            border: 'none',
            backgroundColor: allCommentsFilled ? '#1E3A8A' : '#D1D9EE',
            color: allCommentsFilled ? '#FFFFFF' : '#8FA0C4',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: allCommentsFilled ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.01em',
            boxShadow: allCommentsFilled ? '0 4px 16px rgba(30,58,138,0.3)' : 'none',
            transition: 'background-color 0.2s, box-shadow 0.2s',
          }}
        >
          Bahoni yuborish
        </motion.button>
      </div>

      {/* Confirmation modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.45)',
                zIndex: 100,
                backdropFilter: 'blur(6px)',
              }}
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

              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(30,58,138,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckCircle size={28} color="#1E3A8A" strokeWidth={1.5} />
              </div>

              <h3
                style={{
                  color: COLORS.textDark,
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}
              >
                Bahoni yuborish
              </h3>
              <p
                style={{
                  color: COLORS.textMid,
                  fontSize: '13px',
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}
              >
                Baho yuborilgandan keyin o'zgartirib bo'lmaydi
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: `1px solid ${COLORS.border}`,
                    backgroundColor: 'transparent',
                    color: COLORS.textDark,
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => { setShowModal(false); setSubmitted(true) }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#1E3A8A',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(30,58,138,0.3)',
                  }}
                >
                  Yuborish
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
