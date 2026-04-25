import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Briefcase, FileText, User, Plus, Bell } from 'lucide-react'
import { COLORS } from '../lib/constants'
import { NOTIFICATIONS } from '../data/mockData'

const NAV_ITEMS = [
  { id: 'home', label: 'Asosiy', path: '/', icon: LayoutDashboard },
  { id: 'vacancies', label: 'Vakansiyalar', path: '/vacancies', icon: Briefcase },
  { id: 'apply', label: '', path: null, icon: null },
  { id: 'applications', label: 'Arizalarim', path: '/applications', icon: FileText },
  { id: 'profile', label: 'Profil', path: '/profile', icon: User },
]

const HIDE_NAVBAR = ['/login', '/register']

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length

  if (HIDE_NAVBAR.includes(location.pathname)) return null

  return (
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
                  style={{ position: 'absolute', width: '52px', height: '52px', borderRadius: '50%', backgroundColor: COLORS.accent, zIndex: 0, marginTop: '-4px' }}
                />
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => navigate('/vacancies')}
                  style={{ position: 'relative', zIndex: 1, width: '52px', height: '52px', borderRadius: '50%', background: `linear-gradient(135deg, #00C9D4, ${COLORS.accent})`, border: '2.5px solid rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-4px', boxShadow: '0 4px 20px rgba(0,173,181,0.55)' }}
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
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '6px 12px', border: 'none', background: 'transparent', cursor: 'pointer', position: 'relative' }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '20px', height: '3px', backgroundColor: COLORS.primary, borderRadius: '0 0 3px 3px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div style={{ position: 'relative' }}>
                <Icon size={22} strokeWidth={1.5} color={isActive ? COLORS.primary : COLORS.textLight} />
               {item.id === 'home' && unreadCount > 0 && (
  <div style={{
    position: 'absolute',
    top: '-2px',
    right: '-4px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#E53E3E',
    border: '1.5px solid #FFFFFF',
  }} />
)}
              </div>
              <span style={{ fontSize: '10px', fontWeight: isActive ? 600 : 400, color: isActive ? COLORS.primary : COLORS.textLight, fontFamily: 'Inter, sans-serif' }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
