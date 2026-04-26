import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Briefcase, FileText, User, Plus, Bell, BookOpen, Video, ChevronRight, Shield } from 'lucide-react'
import { COLORS } from '../lib/constants'

const NAV_ITEMS = [
  { id: 'home', label: 'Asosiy', path: '/', icon: LayoutDashboard },
  { id: 'vacancies', label: 'Vakansiyalar', path: '/vacancies', icon: Briefcase },
  { id: 'apply', label: '', path: null, icon: null },
  { id: 'applications', label: 'Arizalarim', path: '/applications', icon: FileText },
  { id: 'profile', label: 'Profil', path: '/profile', icon: User },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
    <nav style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      backgroundColor: '#FFFFFF',
      borderTop: `1px solid ${COLORS.border}`,
      paddingBottom: 'env(safe-area-inset-bottom)',
      zIndex: 50,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: '8px',
        paddingBottom: '8px',
        maxWidth: '480px',
        margin: '0 auto',
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path

          if (item.id === 'apply') {
            return (
              <div key={item.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    width: '52px', height: '52px',
                    borderRadius: '50%',
                    backgroundColor: COLORS.accent,
                    zIndex: 0,
                    marginTop: '-4px',
                  }}
                />
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setShowModal(true)}
                  style={{
                    position: 'relative', zIndex: 1,
                    width: '52px', height: '52px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, #00C9D4, ${COLORS.accent})`,
                    border: '2.5px solid rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '-4px',
                    boxShadow: '0 4px 20px rgba(0,173,181,0.55)',
                  }}
                >
                  <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
                </motion.button>
              </div>
            )
          }

          const Icon = item.icon!
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path!)}
              whileTap={{ scale: 0.92 }}
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '4px',
                padding: '6px 12px',
                border: 'none', background: 'transparent',
                cursor: 'pointer', position: 'relative',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute', top: 0,
                    left: '50%', transform: 'translateX(-50%)',
                    width: '20px', height: '3px',
                    backgroundColor: COLORS.primary,
                    borderRadius: '0 0 3px 3px',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon size={22} strokeWidth={1.5} color={isActive ? COLORS.primary : COLORS.textLight} />
              <span style={{
                fontSize: '10px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? COLORS.primary : COLORS.textLight,
                fontFamily: 'Inter, sans-serif',
              }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>

    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
            }}
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '80px',
              left: 0,
              right: 0,
              maxWidth: '480px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              zIndex: 101,
              overflow: 'hidden',
            }}
          >
            {/* Handle bar */}
            <div style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#E2E8F0',
              borderRadius: '2px',
              margin: '12px auto',
            }} />

            {/* Title */}
            <p style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#212529',
              fontFamily: 'Inter',
              textAlign: 'center',
              padding: '8px 20px 16px',
              letterSpacing: '-0.01em',
            }}>
              Nima qilmoqchisiz?
            </p>

            {/* Action items */}
            {[
              {
                icon: <Briefcase size={22} color="#1E3A8A" strokeWidth={1.5} />,
                iconBg: '#EFF6FF',
                label: 'Vakansiyaga ariza yuborish',
                sub: "Yangi ish o'rni toping",
                onClick: () => { navigate('/quick-action') },
              },
              {
                icon: <BookOpen size={22} color="#00ADB5" strokeWidth={1.5} />,
                iconBg: '#F0FDFA',
                label: 'Testga kirish',
                sub: "Bilimingizni sinab ko'ring",
                onClick: () => { navigate('/test/1'); setShowModal(false) },
              },
              {
                icon: <Video size={22} color="#D97706" strokeWidth={1.5} />,
                iconBg: '#FFFBEB',
                label: 'Intervyuga kirish',
                sub: "Suhbat xonasiga o'ting",
                onClick: () => { navigate('/interview-room/1'); setShowModal(false) },
              },
            ].map((item, i, arr) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 20px',
                  borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  backgroundColor: item.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#212529', fontFamily: 'Inter', marginBottom: '2px' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'Inter' }}>
                    {item.sub}
                  </p>
                </div>
                <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
              </motion.div>
            ))}

            {/* Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '16px',
            }}>
              <Shield size={11} color="#9CA3AF" strokeWidth={1.5} />
              <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'Inter' }}>
                Barcha ma'lumotlar xavfsiz
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  )
}