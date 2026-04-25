import { motion } from 'framer-motion'
import { Bell, CheckCircle, AlertTriangle, Info, ChevronRight, Check, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLORS, cv, iv } from '../lib/constants'
import { NOTIFICATIONS } from '../data/mockData'

const TYPE_CONFIG = {
  test: { icon: FileText, color: COLORS.accent, bg: COLORS.accentBg },
  success: { icon: CheckCircle, color: '#16A34A', bg: '#F0FDF4' },
  warning: { icon: AlertTriangle, color: '#D97706', bg: '#FFFBEB' },
  info: { icon: Info, color: COLORS.primary, bg: COLORS.infoBg },
  error: { icon: AlertTriangle, color: COLORS.error, bg: COLORS.errorBg },
}

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, paddingBottom: '90px', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'Inter' }}>IQTIDOR AI</p>
            <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '4px' }}>
              Bildirishnomalar
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {unreadCount > 0 && (
              <div style={{ backgroundColor: COLORS.accent, borderRadius: '20px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={12} color="#FFFFFF" strokeWidth={2} />
                <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600, fontFamily: 'Inter' }}>
                  {unreadCount} yangi
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Hammasini o'qildi */}
        {unreadCount > 0 && (
          <motion.div variants={iv} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={markAllRead}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: 'none', color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 500, cursor: 'pointer' }}
            >
              <Check size={14} strokeWidth={2} />
              Hammasini o'qildi deb belgilash
            </motion.button>
          </motion.div>
        )}

        {/* Yangi bildirishnomalar */}
        {notifications.filter(n => !n.read).length > 0 && (
          <motion.div variants={iv}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Yangi
            </p>
            {notifications.filter(n => !n.read).map((notif) => {
              const config = TYPE_CONFIG[notif.type as keyof typeof TYPE_CONFIG]
              return (
                <motion.div
                  key={notif.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => markRead(notif.id)}
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    marginBottom: '8px',
                    border: `1.5px solid ${config.color}22`,
                    boxShadow: '0 2px 8px rgba(30,58,138,0.06)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <config.icon size={18} color={config.color} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', lineHeight: 1.4 }}>
                        {notif.title}
                      </p>
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: COLORS.accent, flexShrink: 0, marginTop: '3px', marginLeft: '8px' }} />
                    </div>
                    <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', marginTop: '3px', lineHeight: 1.5 }}>
                      {notif.body}
                    </p>
                    <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '6px' }}>
                      {notif.time}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Oldingi bildirishnomalar */}
        {notifications.filter(n => n.read).length > 0 && (
          <motion.div variants={iv}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px', marginTop: '16px' }}>
              Oldingi
            </p>
            {notifications.filter(n => n.read).map((notif) => {
              const config = TYPE_CONFIG[notif.type as keyof typeof TYPE_CONFIG]
              return (
                <motion.div
                  key={notif.id}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    marginBottom: '8px',
                    border: `1px solid ${COLORS.border}`,
                    boxShadow: '0 1px 4px rgba(30,58,138,0.04)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    opacity: 0.7,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: COLORS.borderLight, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <config.icon size={18} color={COLORS.textLight} strokeWidth={1.5} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.4 }}>
                      {notif.title}
                    </p>
                    <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '3px', lineHeight: 1.5 }}>
                      {notif.body}
                    </p>
                    <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '6px' }}>
                      {notif.time}
                    </p>
                  </div>
                  <ChevronRight size={14} color={COLORS.textLight} strokeWidth={1.5} />
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Bell size={40} color={COLORS.textLight} strokeWidth={1} style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '14px', color: COLORS.textLight, fontFamily: 'Inter' }}>
              Bildirishnomalar yo'q
            </p>
          </div>
        )}

      </div>
    </motion.div>
  )
}