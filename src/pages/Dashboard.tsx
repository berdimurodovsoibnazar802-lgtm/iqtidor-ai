import { Fragment, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Check, ChevronRight, Star,
  BookOpen, AlertTriangle, Info, CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS, cv, iv } from '../lib/constants'
import { USER, APPLICATIONS, VACANCIES, NOTIFICATIONS } from '../data/mockData'
// ── Horizontal timeline ────────────────────────────────────
const TIMELINE = [
  { label: 'Ariza',   date: '24-apr', done: true,  active: false },
  { label: 'Test',    date: '25-apr', done: false, active: true  },
  { label: 'Intervyu', date: '28-apr', done: false, active: false },
  { label: 'Qaror',   date: '1-may',  done: false, active: false },
]

// ── Stats ──────────────────────────────────────────────────
const STATS = [
  { value: USER.totalApplications, label: 'Arizalar',   color: COLORS.primary },
  { value: USER.tests,             label: 'Testlar',    color: COLORS.accent  },
  { value: 1,                      label: 'Intervyular', color: '#7C3AED'      },
  { value: USER.offers,            label: 'Takliflar',  color: '#16A34A'      },
  { value: '78%',                  label: 'Reyting',    color: '#D97706'      },
]

// ── Notification icon config ───────────────────────────────
type NC = { color: string; bg: string; icon: LucideIcon }
const NC: Record<string, NC> = {
  test:    { color: COLORS.accent,  bg: COLORS.accentBg, icon: BookOpen      },
  success: { color: '#16A34A',      bg: '#F0FDF4',        icon: CheckCircle   },
  warning: { color: '#D97706',      bg: '#FFFBEB',        icon: AlertTriangle },
  info:    { color: COLORS.primary, bg: COLORS.infoBg,    icon: Info          },
  error:   { color: COLORS.error,   bg: COLORS.errorBg,   icon: AlertTriangle },
}

// ── Skills ─────────────────────────────────────────────────
const SKILLS = [
  { name: 'JavaScript', level: 'Senior', percent: 90, color: '#F7DF1E', textColor: '#000' },
  { name: 'Node.js',    level: 'Middle', percent: 70, color: '#339933', textColor: '#fff' },
  { name: 'PostgreSQL', level: 'Middle', percent: 65, color: '#336791', textColor: '#fff' },
  { name: 'React',      level: 'Senior', percent: 85, color: '#61DAFB', textColor: '#000' },
  { name: 'Python',     level: 'Junior', percent: 40, color: '#3776AB', textColor: '#fff' },
]

const LEVEL_STYLES: Record<string, { bg: string; color: string }> = {
  Senior: { bg: COLORS.accent,  color: '#FFFFFF'      },
  Middle: { bg: COLORS.primary, color: '#FFFFFF'      },
  Junior: { bg: '#E8F0FE',      color: COLORS.primary },
}

// ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const unread    = NOTIFICATIONS.filter(n => !n.read).length
  const recentN   = NOTIFICATIONS.slice(0, 3)
  const recVacs   = VACANCIES.filter(v => v.match >= 80)
  const activeApp = APPLICATIONS.find(a => ['test', 'review'].includes(a.status))

  return (
    <motion.div
      variants={cv} initial="hidden" animate="visible"
      style={{
        minHeight: '100vh', backgroundColor: COLORS.bg,
        paddingBottom: '100px', maxWidth: '480px', margin: '0 auto',
      }}
    >

      {/* ─── 1. HEADER ──────────────────────────────────────── */}
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Avatar */}
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.accent}, #0097A7)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0,
            }}>
              <span style={{ color: '#FFF', fontSize: '15px', fontWeight: 700, fontFamily: 'Inter' }}>
                {USER.firstName[0]}{USER.lastName[0]}
              </span>
            </div>

            {/* Name + badge */}
            <div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontFamily: 'Inter', marginBottom: '3px' }}>
                Assalomu alaykum
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ color: '#FFF', fontSize: '16px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                  {USER.firstName} {USER.lastName}
                </span>
                <span style={{
                  fontSize: '10px', fontWeight: 600, color: COLORS.accent, fontFamily: 'Inter',
                  background: 'rgba(0,173,181,0.16)', border: '1px solid rgba(0,173,181,0.3)',
                  borderRadius: '20px', padding: '2px 8px',
                }}>
                  Nomzod
                </span>
              </div>
            </div>
          </div>

          {/* Bell */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/notifications')}
            style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', flexShrink: 0,
            }}
          >
            <Bell size={18} color="#FFF" strokeWidth={1.5} />
            {unread > 0 && (
              <div style={{
                position: 'absolute', top: '7px', right: '7px',
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#EF4444', border: '1.5px solid #1E3A8A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#FFF', fontSize: '8px', fontWeight: 700, fontFamily: 'Inter' }}>
                  {unread}
                </span>
              </div>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* ─── CONTENT ────────────────────────────────────────── */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* ─── 2. STATS ROW ───────────────────────────────────── */}
        <motion.div variants={iv}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
            {STATS.map(s => (
              <div key={s.label} style={{
                background: COLORS.card, borderRadius: '14px',
                padding: '14px', minWidth: '82px', flexShrink: 0,
                border: `1px solid ${COLORS.border}`,
                boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
              }}>
                <p style={{
                  fontSize: '22px', fontWeight: 700, color: s.color,
                  fontFamily: 'Inter', letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {s.value}
                </p>
                <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── 3. JARAYONIM ───────────────────────────────────── */}
        <motion.div variants={iv} style={{
          background: COLORS.card, borderRadius: '16px', padding: '18px',
          border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
              Jarayonim
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/applications')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500 }}>
              Batafsil
            </motion.button>
          </div>

          {/* Active application chip */}
          {activeApp && (
            <div style={{
              background: COLORS.bg, borderRadius: '10px', padding: '10px 12px', marginBottom: '16px',
              border: `1px solid ${COLORS.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter' }}>
                  {activeApp.title}
                </p>
                <p style={{ fontSize: '11px', color: COLORS.textMid, fontFamily: 'Inter', marginTop: '1px' }}>
                  {activeApp.org}
                </p>
              </div>
              <span style={{
                fontSize: '11px', fontWeight: 600, color: COLORS.accent,
                background: COLORS.accentBg, borderRadius: '20px', padding: '3px 9px', fontFamily: 'Inter',
              }}>
                {activeApp.match}%
              </span>
            </div>
          )}

          {/* Timeline */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {TIMELINE.map((step, i) => (
              <Fragment key={step.label}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '64px' }}>
                  {/* Step circle */}
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%',
                    background: step.done ? COLORS.accent : 'transparent',
                    border: step.done ? 'none'
                      : step.active ? `2px solid ${COLORS.accent}`
                      : `2px solid ${COLORS.borderLight}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {step.done   && <Check size={12} color="#FFF" strokeWidth={2.5} />}
                    {step.active && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: COLORS.accent }} />}
                  </div>
                  <p style={{
                    fontSize: '10px', fontWeight: step.active ? 600 : 400,
                    color: step.done || step.active ? COLORS.textDark : COLORS.textLight,
                    fontFamily: 'Inter', textAlign: 'center', marginTop: '5px', lineHeight: 1.3,
                  }}>
                    {step.label}
                  </p>
                  <p style={{ fontSize: '9px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '2px' }}>
                    {step.date}
                  </p>
                </div>

                {/* Connector */}
                {i < TIMELINE.length - 1 && (
                  <div style={{
                    flex: 1, height: '2px', marginTop: '12px', minWidth: '8px',
                    background: step.done ? COLORS.accent : COLORS.borderLight,
                  }} />
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>

        {/* ─── 4. KO'NIKMALARIM ───────────────────────────────── */}
        <motion.div variants={iv} style={{
          background: COLORS.card, borderRadius: '16px', padding: '18px',
          border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
              Ko'nikmalarim
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/profile')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500 }}>
              Barchasi
            </motion.button>
          </div>

          {SKILLS.map((skill, i) => {
            const lvl = LEVEL_STYLES[skill.level]
            return (
              <div key={skill.name} style={{ marginBottom: i < SKILLS.length - 1 ? '14px' : 0 }}>
                {/* Icon + name + badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '7px' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: skill.color, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: skill.textColor, fontFamily: 'Inter' }}>
                      {skill.name[0]}
                    </span>
                  </div>
                  <span style={{ flex: 1, fontSize: '13px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter' }}>
                    {skill.name}
                  </span>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, fontFamily: 'Inter',
                    borderRadius: '20px', padding: '3px 9px',
                    background: lvl.bg, color: lvl.color,
                  }}>
                    {skill.level}
                  </span>
                </div>
                {/* Progress bar */}
                <div style={{ marginLeft: '44px', height: '4px', borderRadius: '2px', background: COLORS.borderLight, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.06 }}
                    style={{ height: '100%', background: COLORS.primary, borderRadius: '2px' }}
                  />
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* ─── 5. BILDIRISHNOMALAR ────────────────────────────── */}
        <motion.div variants={iv} style={{
          background: COLORS.card, borderRadius: '16px', padding: '18px',
          border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
              Bildirishnomalar
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/notifications')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500 }}>
              Barchasi
            </motion.button>
          </div>

          {recentN.map((n, i) => {
            const cfg = NC[n.type] ?? NC.info
            return (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                paddingBottom: i < 2 ? '12px' : 0,
                marginBottom:  i < 2 ? '12px' : 0,
                borderBottom:  i < 2 ? `1px solid ${COLORS.borderLight}` : 'none',
              }}>
                {/* Icon */}
                <div style={{
                  width: '30px', height: '30px', borderRadius: '8px',
                  background: cfg.bg, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <cfg.icon size={14} color={cfg.color} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                    <p style={{
                      fontSize: '13px', fontWeight: n.read ? 400 : 600,
                      color: COLORS.textDark, fontFamily: 'Inter',
                    }}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: COLORS.primary, flexShrink: 0 }} />
                    )}
                  </div>
                  <p style={{
                    fontSize: '11px', color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.4,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {n.body}
                  </p>
                </div>

                {/* Time */}
                <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', flexShrink: 0, paddingTop: '2px' }}>
                  {n.time}
                </p>
              </div>
            )
          })}
        </motion.div>

        {/* ─── 6. VAKANSIYALAR ────────────────────────────────── */}
        <motion.div variants={iv}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
              Tavsiya vakansiyalar
            </p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/vacancies')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500 }}>
              Hammasi
            </motion.button>
          </div>

          {recVacs.map(v => (
            <motion.div
              key={v.id} whileTap={{ scale: 0.985 }}
              onClick={() => navigate(`/vacancies/${v.id}`)}
              style={{
                background: COLORS.card, borderRadius: '14px',
                padding: '15px 16px', marginBottom: '8px', cursor: 'pointer',
                border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
                    {v.title}
                  </p>
                  {v.isNew && (
                    <span style={{
                      fontSize: '9px', fontWeight: 600, color: COLORS.primary,
                      background: COLORS.infoBg, borderRadius: '20px', padding: '2px 7px', fontFamily: 'Inter',
                      flexShrink: 0,
                    }}>
                      Yangi
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '6px' }}>
                  {v.org}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={11} color={COLORS.accent} fill={COLORS.accent} strokeWidth={1} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: COLORS.accent, fontFamily: 'Inter' }}>
                    {v.match}% mos
                  </span>
                  <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginLeft: '6px' }}>
                    {v.location} · {v.type}
                  </span>
                </div>
              </div>
              <ChevronRight size={15} color={COLORS.textLight} strokeWidth={1.5} flexShrink={0} />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', paddingTop: '4px' }}>
          <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: COLORS.borderLight }} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
            Iqtidor AI — Shaffof va adolatli
          </p>
          <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: COLORS.borderLight }} />
        </div>

      </div>
    </motion.div>
  )
}
