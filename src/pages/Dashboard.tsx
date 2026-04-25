import { motion } from 'framer-motion'
import { Bell, Shield, FileText, Clock, BookOpen, Award, ChevronRight, Star, Briefcase } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, cv, iv } from '../lib/constants'
import { USER, APPLICATIONS, VACANCIES } from '../data/mockData'

const STATS = [
  { label: 'Jami arizalar', value: USER.totalApplications, icon: FileText, color: COLORS.primary, bg: COLORS.infoBg },
  { label: 'Jarayonda', value: USER.activeApplications, icon: Clock, color: '#D97706', bg: '#FFFBEB' },
  { label: 'Testlar', value: USER.tests, icon: BookOpen, color: COLORS.accent, bg: COLORS.accentBg },
  { label: 'Takliflar', value: USER.offers, icon: Award, color: '#16A34A', bg: '#F0FDF4' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const activeApps = APPLICATIONS.filter(a => a.status !== 'rejected')
  const recommendedVacancies = VACANCIES.filter(v => v.match >= 80).slice(0, 2)

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, paddingBottom: '90px', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'Inter', marginBottom: '4px' }}>
              Assalomu alaykum
            </p>
            <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
              {USER.firstName} 👋
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
              <Shield size={11} color={COLORS.accent} strokeWidth={2} />
              <span style={{ color: COLORS.accent, fontSize: '11px', fontFamily: 'Inter', fontWeight: 500 }}>
                Adolatli tanlov. Shaffof jarayon.
              </span>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/notifications')}
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative' }}>
  <Bell size={18} color="#FFFFFF" strokeWidth={1.5} />
  <div style={{
    position: 'absolute',
    top: '-4px',
    right: '-7px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: '#E53E3E',
    border: '1.5px solid rgba(30,58,138,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <span style={{ color: '#FFFFFF', fontSize: '9px', fontWeight: 700, fontFamily: 'Inter' }}>
      2
    </span>
  </div>
</div>
          </motion.button>
        </div>
      </motion.div>

      <div style={{ padding: '20px' }}>

        {/* Stat kartalar */}
        <motion.div variants={iv} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <stat.icon size={18} color={stat.color} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: '24px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Jarayonim */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px', marginBottom: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 12px rgba(30,58,138,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>Mening jarayonim</h3>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/applications')}
              style={{ background: 'none', border: 'none', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}>
              Barchasi
            </motion.button>
          </div>
          {activeApps.slice(0, 2).map((app) => (
            <motion.div key={app.id} whileTap={{ scale: 0.98 }} onClick={() => navigate('/applications')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: COLORS.bg, borderRadius: '12px', marginBottom: '8px', cursor: 'pointer', border: `1px solid ${COLORS.border}` }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '4px' }}>
                  {app.title}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: app.statusColor, display: 'inline-block' }} />
                  <span style={{ fontSize: '11px', color: app.statusColor, fontFamily: 'Inter', fontWeight: 500 }}>{app.statusLabel}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: COLORS.accent, fontFamily: 'Inter', backgroundColor: COLORS.accentBg, padding: '3px 8px', borderRadius: '20px' }}>
                  {app.match}% mos
                </span>
                <ChevronRight size={14} color={COLORS.textLight} strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tavsiya vakansiyalar */}
        <motion.div variants={iv}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>Siz uchun tavsiya</h3>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/vacancies')}
              style={{ background: 'none', border: 'none', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}>
              Hammasi
            </motion.button>
          </div>
          {recommendedVacancies.map((vac) => (
            <motion.div key={vac.id} whileTap={{ scale: 0.98 }} onClick={() => navigate('/vacancies')}
              style={{ backgroundColor: COLORS.card, borderRadius: '14px', padding: '16px', marginBottom: '10px', border: `1px solid ${COLORS.border}`, boxShadow: '0 1px 6px rgba(30,58,138,0.04)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{vac.title}</p>
                    {vac.isNew && (
                      <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.primary, backgroundColor: COLORS.infoBg, padding: '2px 7px', borderRadius: '20px', fontFamily: 'Inter' }}>Yangi</span>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>{vac.org}</p>
                </div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: COLORS.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={18} color={COLORS.primary} strokeWidth={1.5} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={12} color={COLORS.accent} strokeWidth={2} fill={COLORS.accent} />
                  <span style={{ fontSize: '12px', color: COLORS.accent, fontFamily: 'Inter', fontWeight: 600 }}>{vac.match}% mos</span>
                </div>
                <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>{vac.location} · {vac.type}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Himoya belgisi */}
        <motion.div variants={iv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px', padding: '12px' }}>
          <Shield size={11} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>Barcha ma'lumotlar shifrlangan va himoyalangan</p>
        </motion.div>

      </div>
    </motion.div>
  )
}