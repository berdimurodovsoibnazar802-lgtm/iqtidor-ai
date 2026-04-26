import { motion } from 'framer-motion'
import { ArrowLeft, Shield, BookOpen, Video, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS, cv, iv } from '../lib/constants'

export default function QuickActions() {
  const navigate = useNavigate()

  const ACTIONS = [
   { 
  icon: Shield, 
  label: 'Korrupsiyani xabar qilish', 
  sub: "Shaffof bo'lmagan holatni bildiring", 
  bg: '#FEF2F2', 
  color: '#C0392B', 
  path: '/report' 
},
    { icon: BookOpen, label: 'Testga kirish', sub: "Bilimingizni sinab ko'ring", bg: COLORS.accentBg, color: COLORS.accent, path: '/test/1' },
    { icon: Video, label: 'Intervyuga kirish', sub: 'Suhbat xonasiga o\'ting', bg: '#FFFBEB', color: '#D97706', path: '/interview-room/1' },
  ]

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '90px' }}
    >
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(-1)}
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowLeft size={17} color="#FFFFFF" strokeWidth={2} />
          </motion.button>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>IQTIDOR AI</p>
            <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '2px' }}>
              Nima qilmoqchisiz?
            </h1>
          </div>
        </div>
      </motion.div>

      <div style={{ padding: '20px' }}>
        {ACTIONS.map((action, i) => (
          <motion.div
            key={i}
            variants={iv}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '12px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.06)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', backgroundColor: action.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <action.icon size={22} color={action.color} strokeWidth={1.5} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{action.label}</p>
              <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '3px' }}>{action.sub}</p>
            </div>
            <ChevronRight size={18} color={COLORS.textLight} strokeWidth={1.5} />
          </motion.div>
        ))}

        <motion.div variants={iv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          <Shield size={11} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>Barcha ma'lumotlar xavfsiz</p>
        </motion.div>
      </div>
    </motion.div>
  )
}