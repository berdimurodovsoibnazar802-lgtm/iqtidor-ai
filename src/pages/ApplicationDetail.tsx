import { motion } from 'framer-motion'
import { ArrowLeft, Shield, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { COLORS, iv } from '../lib/constants'
import { APPLICATIONS } from '../data/mockData'

export default function ApplicationDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const app = APPLICATIONS.find(a => a.id === Number(id))

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!app) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter', color: COLORS.textLight }}>Ariza topilmadi</p>
      </div>
    )
  }

  const total = APPLICATIONS.reduce((s, a) => s + a.match, 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '40px' }}
    >
      {/* Header */}
      <div style={{ backgroundColor: COLORS.primary, padding: '52px 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(-1)}
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ArrowLeft size={17} color="#FFFFFF" strokeWidth={2} />
          </motion.button>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>IQTIDOR AI</p>
            <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {app.title}
            </h1>
          </div>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'Inter' }}>{app.org}</p>
      </div>

      <div style={{ padding: '20px' }}>

        {/* Status */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.primary, borderRadius: '16px', padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '4px' }}>Joriy holat</p>
            <p style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }}>{app.statusLabel}</p>
            {app.nextStep && (
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontFamily: 'Inter', marginTop: '4px' }}>{app.nextStep}</p>
            )}
          </div>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={22} color="#FFFFFF" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Info */}
        <motion.div variants={iv}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}
        >
          {[
            { label: 'Moslik', value: `${app.match}%` },
            { label: 'Yuborilgan', value: app.date },
          ].map(info => (
            <div key={info.label} style={{ backgroundColor: COLORS.card, borderRadius: '12px', padding: '14px', border: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '4px' }}>{info.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{info.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}
        >
          <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Jarayon
          </p>
          {app.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: i < app.steps.length - 1 ? '12px' : 0 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: step.done ? COLORS.accentBg : COLORS.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {step.done
                  ? <CheckCircle size={14} color={COLORS.accent} strokeWidth={2} />
                  : <Clock size={14} color={COLORS.textLight} strokeWidth={1.5} />
                }
              </div>
              <span style={{ fontSize: '13px', fontWeight: step.done ? 500 : 400, color: step.done ? COLORS.textDark : COLORS.textLight, fontFamily: 'Inter' }}>
                {step.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Test natijasi */}
        {app.testScore && (
          <motion.div variants={iv}
            style={{ backgroundColor: COLORS.bg, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}
          >
            <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '4px' }}>Test natijasi</p>
            <p style={{ fontSize: '28px', fontWeight: 700, color: COLORS.primary, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
              {app.testScore} ball
            </p>
          </motion.div>
        )}

        {/* Rad etish sababi */}
        {app.rejectReason && (
          <motion.div variants={iv}
            style={{ backgroundColor: COLORS.errorBg, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: '1px solid #FECACA', display: 'flex', gap: '10px' }}
          >
            <AlertCircle size={18} color={COLORS.error} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '1px' }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.error, fontFamily: 'Inter', marginBottom: '4px' }}>Rad etish sababi</p>
              <p style={{ fontSize: '12px', color: COLORS.error, fontFamily: 'Inter', lineHeight: 1.5 }}>{app.rejectReason}</p>
            </div>
          </motion.div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          <Shield size={10} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>Ma'lumotlar shifrlangan va himoyalangan</p>
        </div>

      </div>
    </motion.div>
  )
}
