import { motion } from 'framer-motion'
import { Bell, Shield, FileText, Clock, Users, Award, ChevronRight, Star, Briefcase, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, cv, iv } from '../lib/constants'
import { USER, APPLICATIONS, VACANCIES, NOTIFICATIONS } from '../data/mockData'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const STATS = [
  { label: 'Arizalar', value: USER.totalApplications, icon: FileText, color: COLORS.primary, bg: COLORS.infoBg },
  { label: 'Testlar', value: USER.tests, icon: Clock, color: COLORS.accent, bg: COLORS.accentBg },
  { label: 'Intervyular', value: 1, icon: Users, color: '#D97706', bg: '#FFFBEB' },
  { label: 'Takliflar', value: USER.offers, icon: Award, color: '#16A34A', bg: '#F0FDF4' },
  { label: 'Reyting', value: '78%', icon: TrendingUp, color: COLORS.primary, bg: COLORS.infoBg },
]

const RATING_DATA = [
  { date: '20 Apr', value: 45 },
  { date: '27 Apr', value: 52 },
  { date: '4 May', value: 61 },
  { date: '11 May', value: 70 },
  { date: '18 May', value: 78 },
]

const PROCESS_STEPS = [
  { label: 'Ariza yuborildi', date: '12.05.2024', done: true },
  { label: 'Test bosqichi', date: '14.05.2024', done: true },
  { label: 'Intervyu', date: 'Jarayonda', done: false, active: true },
  { label: 'Yakuniy qaror', date: 'Kutilmoqda', done: false },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length
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
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `linear-gradient(135deg, ${COLORS.accent}, #0097A7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>
              <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'Inter' }}>{USER.firstName[0]}</span>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>Assalomu alaykum 👋</p>
              <h1 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '2px' }}>
                {USER.firstName} {USER.lastName}
              </h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '20px', padding: '2px 10px', marginTop: '4px' }}>
                <span style={{ color: COLORS.accent, fontSize: '11px', fontFamily: 'Inter', fontWeight: 500 }}>Nomzod</span>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/notifications')}
            style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Bell size={18} color="#FFFFFF" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#E53E3E', border: '1.5px solid #1E3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#FFFFFF', fontSize: '8px', fontWeight: 700, fontFamily: 'Inter' }}>{unreadCount}</span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Banner */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, borderRadius: '20px', padding: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: 'Inter', marginBottom: '6px' }}>IQTIDOR AI</p>
            <h2 style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '12px' }}>
              Bizda har bir qaror<br />
              <span style={{ color: COLORS.accent }}>SHAFFOF</span> va ADOLATLI
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'Inter', lineHeight: 1.5 }}>
              Tizim har bir bosqichni nazorat qiladi va sizning mehnatingizni baholaydi.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginLeft: '16px', flexShrink: 0 }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <path d="M36 6L12 18v18c0 16.5 10.2 31.8 24 36 13.8-4.2 24-19.5 24-36V18L36 6z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <path d="M36 14L18 24v14c0 12.5 7.8 24.2 18 27.4 10.2-3.2 18-14.9 18-27.4V24L36 14z" fill="rgba(0,173,181,0.2)" stroke={COLORS.accent} strokeWidth="1.5"/>
              <path d="M28 36l5 5 11-11" stroke={COLORS.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Statistika */}
        <motion.div variants={iv} style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ backgroundColor: COLORS.card, borderRadius: '14px', padding: '14px 12px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)', flexShrink: 0, minWidth: '90px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <stat.icon size={16} color={stat.color} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Jarayonim */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>Jarayonim</h3>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/applications')}
              style={{ background: 'none', border: 'none', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}>
              Batafsil
            </motion.button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {i < PROCESS_STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: '14px', left: '50%', width: '100%', height: '2px', backgroundColor: step.done ? COLORS.accent : COLORS.borderLight, zIndex: 0 }} />
                )}
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: step.done ? COLORS.accent : step.active ? 'transparent' : COLORS.borderLight, border: step.active ? `2px solid ${COLORS.accent}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, flexShrink: 0 }}>
                  {step.done
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                    : step.active
                    ? <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS.accent }} />
                    : <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.textLight }} />
                  }
                </div>
                <p style={{ fontSize: '9px', fontWeight: step.done || step.active ? 600 : 400, color: step.done || step.active ? COLORS.textDark : COLORS.textLight, fontFamily: 'Inter', marginTop: '6px', textAlign: 'center', lineHeight: 1.3 }}>
                  {step.label}
                </p>
                <p style={{ fontSize: '8px', color: step.done ? COLORS.accent : COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>
                  {step.date}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reyting dinamikasi */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>Reyting dinamikasi</h3>
            <span style={{ fontSize: '11px', color: COLORS.accent, fontFamily: 'Inter', fontWeight: 600 }}>78%</span>
          </div>
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '12px' }}>So'nggi 30 kun</p>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={RATING_DATA}>
              <defs>
                <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fontFamily: 'Inter', fill: COLORS.textLight }} axisLine={false} tickLine={false} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.border}`, borderRadius: '10px', fontFamily: 'Inter', fontSize: '12px' }} cursor={{ stroke: COLORS.border }} />
              <Area type="monotone" dataKey="value" stroke={COLORS.primary} strokeWidth={2} fill="url(#ratingGrad)" dot={{ fill: COLORS.primary, r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: COLORS.primary }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* So'nggi bildirishnomalar */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>So'nggi bildirishnomalar</h3>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/notifications')}
              style={{ background: 'none', border: 'none', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}>
              Barchasi
            </motion.button>
          </div>
          {NOTIFICATIONS.slice(0, 3).map((notif, i) => (
            <div key={notif.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingBottom: i < 2 ? '12px' : 0, marginBottom: i < 2 ? '12px' : 0, borderBottom: i < 2 ? `1px solid ${COLORS.borderLight}` : 'none' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: notif.read ? COLORS.borderLight : COLORS.accent, flexShrink: 0, marginTop: '4px' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: notif.read ? 400 : 600, color: COLORS.textDark, fontFamily: 'Inter', lineHeight: 1.4 }}>{notif.title}</p>
                <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>{notif.time}</p>
              </div>
            </div>
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
            <motion.div key={vac.id} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/vacancies/${vac.id}`)}
              style={{ backgroundColor: COLORS.card, borderRadius: '14px', padding: '16px', marginBottom: '10px', border: `1px solid ${COLORS.border}`, boxShadow: '0 1px 6px rgba(30,58,138,0.04)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{vac.title}</p>
                    {vac.isNew && <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.primary, backgroundColor: COLORS.infoBg, padding: '2px 7px', borderRadius: '20px', fontFamily: 'Inter' }}>Yangi</span>}
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

      </div>
    </motion.div>
  )
}
