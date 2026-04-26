import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mic, MicOff, Video, VideoOff, MessageSquare, PhoneOff, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const QUESTIONS = [
  '5 yillik tajribangiz haqida gapirib bering',
  'Eng qiyin kliniq holatni qanday hal qildingiz?',
  'Jamoada ishlash bo\'yicha yondashuvingiz qanday?',
  'Nega aynan bizning klinikaga ishga kelmoqchisiz?',
]

export default function InterviewRoom() {
  const navigate = useNavigate()
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(1425)
  const [questionIndex, setQuestionIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setTimerSeconds(s => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div
      style={{
        minHeight: '95vh',
        backgroundColor: '#0F172A',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          backgroundColor: '#0F172A',
          padding: '52px 16px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Recording badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(239,68,68,0.12)',
            padding: '5px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(239,68,68,0.28)',
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444', flexShrink: 0 }}
          />
          <span style={{ color: '#EF4444', fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>
            Yozib olinmoqda
          </span>
        </div>

        {/* Timer */}
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: 700,
            fontFamily: 'Inter',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
          }}
        >
          {formatTime(timerSeconds)}
        </span>

        {/* Exit button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.28)',
            borderRadius: '8px',
            padding: '6px 10px',
            color: '#EF4444',
            fontSize: '12px',
            fontFamily: 'Inter',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={13} strokeWidth={2.5} />
          Chiqish
        </button>
      </div>

      {/* Video area */}
      <div style={{ flex: 1, padding: '4px 16px 8px', position: 'relative' }}>
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: '20px',
            width: '100%',
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #334155',
          }}
        >
          {/* Remote participant */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#293548',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #334155',
              }}
            >
              <User size={38} color="#4B5A6E" strokeWidth={1.2} />
            </div>
            <span style={{ color: '#4B5A6E', fontSize: '12px', fontFamily: 'Inter' }}>
              Komissiya a'zosi
            </span>
          </div>

          {/* Self-video (bottom-right) */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              width: '70px',
              height: '90px',
              backgroundColor: '#0F172A',
              borderRadius: '12px',
              border: '2px solid #475569',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              overflow: 'hidden',
            }}
          >
            {cameraOff ? (
              <VideoOff size={18} color="#4B5A6E" strokeWidth={1.5} />
            ) : (
              <User size={22} color="#4B5A6E" strokeWidth={1.5} />
            )}
            <span style={{ color: '#4B5A6E', fontSize: '9px', fontFamily: 'Inter' }}>Siz</span>
          </div>

          {/* Muted indicator */}
          {muted && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <MicOff size={11} color="#EF4444" strokeWidth={2} />
              <span style={{ color: '#EF4444', fontSize: '10px', fontFamily: 'Inter', fontWeight: 600 }}>
                Ovoz o'chiq
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Questions panel */}
      <div style={{ padding: '0 16px 10px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 16px',
            border: '1px solid #E8F0FE',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                color: COLORS.textLight,
                fontFamily: 'Inter',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Savol {questionIndex + 1} / {QUESTIONS.length}
            </p>
            <span
              style={{
                backgroundColor: 'rgba(0,173,181,0.1)',
                color: '#00ADB5',
                fontSize: '10px',
                fontWeight: 600,
                fontFamily: 'Inter',
                padding: '2px 8px',
                borderRadius: '20px',
              }}
            >
              {Math.round(((questionIndex + 1) / QUESTIONS.length) * 100)}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              height: '2px',
              backgroundColor: '#F1F5F9',
              borderRadius: '2px',
              marginBottom: '10px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ width: `${((questionIndex + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{ height: '100%', backgroundColor: '#00ADB5', borderRadius: '2px' }}
            />
          </div>

          <p
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: COLORS.textDark,
              fontFamily: 'Inter',
              lineHeight: 1.55,
              marginBottom: '12px',
              minHeight: '40px',
            }}
          >
            {QUESTIONS[questionIndex]}
          </p>

          <button
            onClick={() =>
              setQuestionIndex(i => (i < QUESTIONS.length - 1 ? i + 1 : i))
            }
            disabled={questionIndex >= QUESTIONS.length - 1}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor:
                questionIndex < QUESTIONS.length - 1 ? COLORS.primary : '#E2E8F0',
              color:
                questionIndex < QUESTIONS.length - 1 ? '#FFFFFF' : '#9CA3AF',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Inter',
              cursor:
                questionIndex < QUESTIONS.length - 1 ? 'pointer' : 'default',
            }}
          >
            {questionIndex < QUESTIONS.length - 1
              ? 'Keyingi savol →'
              : 'Barcha savollar tugadi'}
          </button>
        </div>
      </div>

      {/* Controls row */}
      <div
        style={{
          padding: '0 16px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <ControlBtn
          icon={
            muted ? (
              <MicOff size={20} color="#EF4444" strokeWidth={1.5} />
            ) : (
              <Mic size={20} color="#FFFFFF" strokeWidth={1.5} />
            )
          }
          label={muted ? "O'chiq" : 'Mikrofon'}
          bg={muted ? 'rgba(239,68,68,0.15)' : '#1E293B'}
          border={muted ? '1px solid rgba(239,68,68,0.3)' : '1px solid #334155'}
          onClick={() => setMuted(m => !m)}
        />
        <ControlBtn
          icon={
            cameraOff ? (
              <VideoOff size={20} color="#EF4444" strokeWidth={1.5} />
            ) : (
              <Video size={20} color="#FFFFFF" strokeWidth={1.5} />
            )
          }
          label={cameraOff ? "O'chiq" : 'Kamera'}
          bg={cameraOff ? 'rgba(239,68,68,0.15)' : '#1E293B'}
          border={cameraOff ? '1px solid rgba(239,68,68,0.3)' : '1px solid #334155'}
          onClick={() => setCameraOff(c => !c)}
        />
        <ControlBtn
          icon={<MessageSquare size={20} color="#FFFFFF" strokeWidth={1.5} />}
          label="Chat"
          bg="#1E293B"
          border="1px solid #334155"
          onClick={() => {}}
        />
        <ControlBtn
          icon={<PhoneOff size={20} color="#FFFFFF" strokeWidth={1.5} />}
          label="Tugatish"
          bg="#EF4444"
          border="none"
          onClick={() => setShowModal(true)}
          wide
        />
      </div>

      {/* Exit confirmation modal */}
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
                backgroundColor: 'rgba(0,0,0,0.65)',
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
                backgroundColor: '#1E293B',
                borderRadius: '24px 24px 0 0',
                padding: '16px 20px 40px',
                zIndex: 101,
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '4px',
                  backgroundColor: '#334155',
                  borderRadius: '2px',
                  margin: '0 auto 20px',
                }}
              />

              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <PhoneOff size={26} color="#EF4444" strokeWidth={1.5} />
              </div>

              <h3
                style={{
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}
              >
                Suhbatni yakunlash?
              </h3>
              <p
                style={{
                  color: '#94A3B8',
                  fontSize: '13px',
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  marginBottom: '24px',
                  lineHeight: 1.55,
                }}
              >
                Suhbat yozuvda saqlanadi. Qaytib kira olmaysiz.
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  onClick={() => navigate('/applications')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
                  }}
                >
                  Yakunlash
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function ControlBtn({
  icon,
  label,
  bg,
  border,
  onClick,
  wide,
}: {
  icon: React.ReactNode
  label: string
  bg: string
  border: string
  onClick: () => void
  wide?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: wide ? 1.4 : 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: bg,
        border,
        borderRadius: '14px',
        padding: '12px 0',
        cursor: 'pointer',
        transition: 'opacity 0.15s',
      }}
    >
      {icon}
      <span
        style={{
          color: '#94A3B8',
          fontSize: '10px',
          fontFamily: 'Inter',
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </button>
  )
}
