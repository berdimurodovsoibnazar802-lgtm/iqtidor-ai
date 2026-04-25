import { motion } from 'framer-motion'
import { Shield, Bell, Moon, ChevronRight, Lock, LogOut, FileText, Eye, User } from 'lucide-react'
import { useEffect } from 'react'
import { COLORS, cv, iv } from '../lib/constants'
import { USER } from '../data/mockData'

const MENU_ITEMS = [
  {
    section: 'Mening faoliyatim',
    items: [
      { icon: FileText, label: 'Mening arizalarim', value: `${USER.totalApplications} ta`, color: COLORS.primary },
      { icon: Eye, label: 'Saqlangan vakansiyalar', value: '3 ta', color: COLORS.primary },
    ],
  },
  {
    section: 'Xavfsizlik',
    items: [
      { icon: Shield, label: 'Anonim rejim', value: 'Yoqilgan', color: COLORS.accent },
      { icon: Lock, label: 'Shifrlash', value: 'Faol', color: COLORS.accent },
    ],
  },
  {
    section: 'Sozlamalar',
    items: [
      { icon: Bell, label: 'Bildirishnomalar', value: 'Yoqilgan', color: COLORS.primary },
      { icon: Moon, label: 'Tungi rejim', value: "O'chirilgan", color: COLORS.primary },
    ],
  },
]

export default function Profile() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, paddingBottom: '90px', maxWidth: '480px', margin: '0 auto' }}
    >
      {/* Header */}
      <motion.div variants={iv} style={{ backgroundColor: COLORS.primary, padding: '52px 20px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.accent}, #0097A7)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.3)',
            flexShrink: 0,
          }}>
            <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter' }}>
              {USER.firstName[0]}
            </span>
          </div>
          <div>
            <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
              {USER.firstName} {USER.lastName}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
              <Shield size={11} color={COLORS.accent} strokeWidth={2} />
              <span style={{ color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter' }}>
                Anonim foydalanuvchi
              </span>
            </div>
          </div>
        </div>

        {/* Statistika */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '20px' }}>
          {[
            { label: 'Arizalar', value: USER.totalApplications },
            { label: 'Jarayonda', value: USER.activeApplications },
            { label: 'Takliflar', value: USER.offers },
          ].map(s => (
            <div key={s.label} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '12px 8px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              <p style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', fontVariantNumeric: 'tabular-nums' }}>
                {s.value}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontFamily: 'Inter', marginTop: '2px' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ padding: '20px' }}>

        {/* Profil ma'lumotlari */}
        <motion.div variants={iv} style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '16px 20px', marginBottom: '16px', border: `1px solid ${COLORS.border}`, boxShadow: '0 2px 8px rgba(30,58,138,0.05)' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Shaxsiy ma'lumotlar
          </p>
          {[
            { label: 'Email', value: USER.email },
            { label: 'Telefon', value: USER.phone },
            { label: 'Shahar', value: USER.city },
          ].map((info, i) => (
            <div key={info.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: i < 2 ? '10px' : 0,
              marginBottom: i < 2 ? '10px' : 0,
              borderBottom: i < 2 ? `1px solid ${COLORS.borderLight}` : 'none',
            }}>
              <span style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: 'Inter' }}>{info.label}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: COLORS.textDark, fontFamily: 'Inter' }}>{info.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Menu bo'limlari */}
        {MENU_ITEMS.map((section) => (
          <motion.div key={section.section} variants={iv} style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {section.section}
            </p>
            <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', border: `1px solid ${COLORS.border}`, overflow: 'hidden', boxShadow: '0 2px 8px rgba(30,58,138,0.04)' }}>
              {section.items.map((item, i) => (
                <motion.div
                  key={item.label}
                  whileTap={{ scale: 0.99 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 16px',
                    borderBottom: i < section.items.length - 1 ? `1px solid ${COLORS.borderLight}` : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '10px',
                    backgroundColor: COLORS.infoBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <item.icon size={17} color={item.color} strokeWidth={1.5} />
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', color: COLORS.textDark, fontFamily: 'Inter' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '12px', color: item.color, fontFamily: 'Inter', fontWeight: 500 }}>
                    {item.value}
                  </span>
                  <ChevronRight size={14} color={COLORS.textLight} strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Chiqish */}
        <motion.div variants={iv}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              backgroundColor: COLORS.errorBg,
              border: '1px solid #FECACA',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer',
            }}
          >
            <LogOut size={17} color={COLORS.error} strokeWidth={1.5} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: COLORS.error, fontFamily: 'Inter' }}>
              Chiqish
            </span>
          </motion.button>
        </motion.div>

        {/* Himoya belgisi */}
        <motion.div variants={iv} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
          <Lock size={11} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
            Barcha ma'lumotlar shifrlangan
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}