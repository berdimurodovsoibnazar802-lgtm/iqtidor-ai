import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, CheckCircle, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const JOB_TITLE = 'Pediatr shifokor'
const INTERVIEW_DATE = '20-may, 2026'

const SLOTS = [
  { id: 1, time: '10:00–10:30', disabled: false },
  { id: 2, time: '10:30–11:00', disabled: false },
  { id: 3, time: '11:00–11:30', disabled: false },
  { id: 4, time: '11:30–12:00', disabled: false },
  { id: 5, time: '14:00–14:30', disabled: false },
  { id: 6, time: '14:30–15:00', disabled: false },
  { id: 7, time: '15:00–15:30', disabled: true },
  { id: 8, time: '15:30–16:00', disabled: false },
]

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const iv = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } } }

export default function InterviewSlots() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const selectedSlot = SLOTS.find(s => s.id === selected)

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
          style={{ fontSize: '22px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em', marginBottom: '8px', textAlign: 'center' }}
        >
          Vaqt tasdiqlandi!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter', textAlign: 'center', marginBottom: '28px' }}
        >
          {JOB_TITLE} lavozimi bo'yicha suhbat vaqti belgilandi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid #E8F0FE',
            width: '100%',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'rgba(30,58,138,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={16} color={COLORS.primary} strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '1px' }}>Suhbat sanasi</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{INTERVIEW_DATE}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'rgba(0,173,181,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} color="#00ADB5" strokeWidth={1.5} />
            </div>
            <div>
              <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '1px' }}>Tanlangan vaqt</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{selectedSlot?.time}</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
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
          }}
        >
          Arizaga qaytish
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, paddingBottom: '100px', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div variants={iv} style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 24px' }}>
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
          Vaqt tanlash
        </h1>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Info card */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #E8F0FE',
            boxShadow: '0 2px 8px rgba(30,58,138,0.05)',
            marginBottom: '20px',
          }}
        >
          <InfoRow
            icon={<Calendar size={15} color="#1E3A8A" strokeWidth={1.5} />}
            label="Suhbat sanasi"
            value={INTERVIEW_DATE}
          />
          <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '10px 0' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(30,58,138,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={15} color="#1E3A8A" strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>Tur</span>
            </div>
            <span style={{
              backgroundColor: '#00ADB5',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: 'Inter',
              padding: '3px 10px',
              borderRadius: '20px',
            }}>
              Masofaviy
            </span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '10px 0' }} />
          <InfoRow
            icon={<Clock size={15} color="#1E3A8A" strokeWidth={1.5} />}
            label="Davomiyligi"
            value="30 daqiqa"
          />
        </motion.div>

        {/* Slots */}
        <motion.p
          variants={iv}
          style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '12px', letterSpacing: '-0.01em' }}
        >
          Qulay vaqtni tanlang
        </motion.p>

        <motion.div
          variants={iv}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}
        >
          {SLOTS.map(slot => {
            const isSelected = selected === slot.id
            return (
              <motion.button
                key={slot.id}
                whileTap={slot.disabled ? {} : { scale: 0.95 }}
                onClick={() => !slot.disabled && setSelected(slot.id)}
                style={{
                  padding: '14px 0',
                  borderRadius: '12px',
                  border: isSelected
                    ? 'none'
                    : slot.disabled
                    ? '1px solid #E2E8F0'
                    : '1px solid #E8F0FE',
                  backgroundColor: isSelected ? '#1E3A8A' : slot.disabled ? '#F1F5F9' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : slot.disabled ? '#9CA3AF' : '#212529',
                  fontSize: '13px',
                  fontWeight: isSelected ? 600 : 500,
                  fontFamily: 'Inter',
                  cursor: slot.disabled ? 'not-allowed' : 'pointer',
                  textDecoration: slot.disabled ? 'line-through' : 'none',
                  boxShadow: isSelected ? '0 4px 12px rgba(30,58,138,0.28)' : 'none',
                  transition: 'background-color 0.15s, box-shadow 0.15s',
                }}
              >
                {slot.time}
              </motion.button>
            )
          })}
        </motion.div>

      </div>

      {/* Fixed confirm button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        padding: '12px 20px 28px',
        backgroundColor: COLORS.bg,
        borderTop: '1px solid #E8F0FE',
      }}>
        <motion.button
          whileTap={selected ? { scale: 0.97 } : {}}
          onClick={() => selected && setSubmitted(true)}
          style={{
            width: '100%',
            padding: '15px',
            borderRadius: '14px',
            border: 'none',
            backgroundColor: selected ? '#1E3A8A' : '#D1D9EE',
            color: selected ? '#FFFFFF' : '#8FA0C4',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: 'Inter',
            cursor: selected ? 'pointer' : 'not-allowed',
            letterSpacing: '-0.01em',
            transition: 'background-color 0.2s, color 0.2s',
            boxShadow: selected ? '0 4px 16px rgba(30,58,138,0.3)' : 'none',
          }}
        >
          Vaqtni tasdiqlash
        </motion.button>
      </div>
    </motion.div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(30,58,138,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <span style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>{label}</span>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{value}</span>
    </div>
  )
}
