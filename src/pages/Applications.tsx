import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight, X, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useEffect } from 'react'
import { COLORS, cv, iv } from '../lib/constants'
import { APPLICATIONS } from '../data/mockData'
import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { key: 'all', label: 'Barchasi' },
  { key: 'active', label: 'Jarayonda' },
  { key: 'completed', label: 'Yakunlangan' },
  { key: 'rejected', label: 'Rad etildi' },
]

export default function Applications() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all')
  const [selected, setSelected] = useState<typeof APPLICATIONS[0] | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = APPLICATIONS.filter(a => {
    if (tab === 'all') return true
    if (tab === 'active') return ['test', 'review', 'interview'].includes(a.status)
    if (tab === 'completed') return a.status === 'completed'
    if (tab === 'rejected') return a.status === 'rejected'
    return true
  })

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, paddingBottom: '90px', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'Inter' }}>IQTIDOR AI</p>
        <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '4px' }}>
          Mening arizalarim
        </h1>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Tablar */}
        <motion.div variants={iv} style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {TABS.map(t => (
            <motion.button
              key={t.key}
              whileTap={{ scale: 0.94 }}
              onClick={() => setTab(t.key)}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                border: tab === t.key ? 'none' : `1px solid ${COLORS.border}`,
                backgroundColor: tab === t.key ? COLORS.primary : COLORS.card,
                color: tab === t.key ? '#FFFFFF' : COLORS.textMid,
                fontSize: '12px',
                fontFamily: 'Inter',
                fontWeight: tab === t.key ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: tab === t.key ? '0 2px 8px rgba(30,58,138,0.25)' : 'none',
              }}
            >
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Arizalar ro'yxati */}
        {filtered.map((app, i) => (
          <motion.div
            key={app.id}
            variants={iv}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/applications/${app.id}`)}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '10px',
              border: `1px solid ${COLORS.border}`,
              boxShadow: '0 2px 8px rgba(30,58,138,0.05)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '3px' }}>
                  {app.title}
                </p>
                <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>
                  {app.org}
                </p>
              </div>
              <ChevronRight size={16} color={COLORS.textLight} strokeWidth={1.5} />
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
              {app.steps.map((step, si) => (
                <div
                  key={si}
                  style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    backgroundColor: step.done ? COLORS.accent : COLORS.borderLight,
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: app.statusColor, display: 'inline-block' }} />
                <span style={{ fontSize: '11px', color: app.statusColor, fontFamily: 'Inter', fontWeight: 500 }}>
                  {app.statusLabel}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                {app.date}
              </span>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <FileText size={40} color={COLORS.textLight} strokeWidth={1} style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: COLORS.textLight, fontFamily: 'Inter' }}>
              Arizalar yo'q
            </p>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 100, backdropFilter: 'blur(6px)' }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed', bottom: 0,
               left: 0, right: 0,
                width: '100%', maxWidth: '480px',
                backgroundColor: COLORS.card,
                borderRadius: '24px 24px 0 0',
                zIndex: 101,
                maxHeight: '85vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ width: '36px', height: '4px', backgroundColor: COLORS.border, borderRadius: '2px', margin: '12px auto 0' }} />

              <div style={{ overflowY: 'auto', padding: '20px', paddingBottom: '40px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                      {selected.title}
                    </h3>
                    <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', marginTop: '3px' }}>
                      {selected.org}
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setSelected(null)}
                    style={{ backgroundColor: COLORS.borderLight, border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={15} color={COLORS.textMid} strokeWidth={2} />
                  </motion.button>
                </div>

                {/* Status */}
                <div style={{ backgroundColor: COLORS.primary, borderRadius: '14px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '4px' }}>Joriy holat</p>
                    <p style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter' }}>
                      {selected.statusLabel}
                    </p>
                    {selected.nextStep && (
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontFamily: 'Inter', marginTop: '4px' }}>
                        {selected.nextStep}
                      </p>
                    )}
                  </div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={22} color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Timeline */}
                <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  Jarayon
                </p>
                {selected.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      backgroundColor: step.done ? COLORS.accentBg : COLORS.borderLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {step.done
                        ? <CheckCircle size={14} color={COLORS.accent} strokeWidth={2} />
                        : <Clock size={14} color={COLORS.textLight} strokeWidth={1.5} />
                      }
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: step.done ? 500 : 400,
                      color: step.done ? COLORS.textDark : COLORS.textLight,
                      fontFamily: 'Inter',
                    }}>
                      {step.label}
                    </span>
                  </div>
                ))}

                {/* Test natijasi */}
                {selected.testScore && (
                  <div style={{ backgroundColor: COLORS.bg, borderRadius: '14px', padding: '16px', marginTop: '16px', border: `1px solid ${COLORS.border}` }}>
                    <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '4px' }}>Test natijasi</p>
                    <p style={{ fontSize: '28px', fontWeight: 700, color: COLORS.primary, fontFamily: 'Inter', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                      {selected.testScore} ball
                    </p>
                  </div>
                )}

                {/* Rad etish sababi */}
                {selected.rejectReason && (
                  <div style={{ backgroundColor: '#FEF2F2', borderRadius: '14px', padding: '16px', marginTop: '16px', border: '1px solid #FECACA', display: 'flex', gap: '10px' }}>
                    <AlertCircle size={18} color={COLORS.error} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '1px' }} />
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.error, fontFamily: 'Inter', marginBottom: '4px' }}>
                        Rad etish sababi
                      </p>
                      <p style={{ fontSize: '12px', color: COLORS.error, fontFamily: 'Inter', lineHeight: 1.5 }}>
                        {selected.rejectReason}
                      </p>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '20px' }}>
                  <Shield size={10} color={COLORS.textLight} strokeWidth={1.5} />
                  <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                    Ma'lumotlar shifrlangan va himoyalangan
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}