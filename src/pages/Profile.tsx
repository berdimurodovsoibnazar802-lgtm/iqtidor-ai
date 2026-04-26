import { motion } from 'framer-motion'
import {
  Camera, User, FileText, Zap, Bookmark,
  Shield, Bell, HelpCircle, Info,
  MapPin, LogOut, ChevronRight, Lock,
  type LucideIcon,
} from 'lucide-react'
import { useEffect } from 'react'
import { COLORS, cv, iv } from '../lib/constants'
import { USER } from '../data/mockData'

const STATS = [
  { label: 'Jami arizalar', value: 12 },
  { label: 'Jarayonda', value: 5 },
  { label: 'Taklif olingan', value: 3 },
  { label: 'Rad etilgan', value: 2 },
]

type MenuItem = {
  icon: LucideIcon
  color: string
  bg: string
  label: string
  sub: string
}

const SECTION_1: MenuItem[] = [
  {
    icon: User,
    color: COLORS.primary,
    bg: COLORS.infoBg,
    label: "Shaxsiy ma'lumotlar",
    sub: 'Ism, telefon, manzil',
  },
  {
    icon: FileText,
    color: COLORS.accent,
    bg: COLORS.accentBg,
    label: 'CV va portfolio',
    sub: 'Yuklangan rezyume',
  },
  {
    icon: Zap,
    color: '#7C3AED',
    bg: '#EDE9FE',
    label: "Ko'nikmalarim",
    sub: "Texnik va soft ko'nikmalar",
  },
  {
    icon: Bookmark,
    color: '#D97706',
    bg: '#FFFBEB',
    label: 'Saqlangan vakansiyalar',
    sub: '3 ta saqlangan',
  },
]

const SECTION_2: MenuItem[] = [
  {
    icon: Shield,
    color: COLORS.primary,
    bg: COLORS.infoBg,
    label: 'Xavfsizlik',
    sub: 'Parol va akkaunt',
  },
  {
    icon: Bell,
    color: '#D97706',
    bg: '#FFFBEB',
    label: 'Bildirishnomalar',
    sub: 'Sozlamalar',
  },
  {
    icon: HelpCircle,
    color: '#16A34A',
    bg: '#F0FDF4',
    label: "Yordam va qo'llab-quvvatlash",
    sub: 'Savollar va javoblar',
  },
  {
    icon: Info,
    color: '#6B7280',
    bg: '#F3F4F6',
    label: 'Ilova haqida',
    sub: 'Versiya 1.0.0',
  },
]

function MenuCard({ items }: { items: MenuItem[] }) {
  return (
    <div style={{
      backgroundColor: COLORS.card,
      borderRadius: '16px',
      border: `1px solid ${COLORS.border}`,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(30,58,138,0.05)',
    }}>
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          whileTap={{ scale: 0.99 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '14px 16px',
            borderBottom: i < items.length - 1 ? `1px solid ${COLORS.borderLight}` : 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: item.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <item.icon size={18} color={item.color} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '14px',
              fontWeight: 500,
              color: COLORS.textDark,
              fontFamily: 'Inter',
            }}>
              {item.label}
            </p>
            <p style={{
              fontSize: '12px',
              color: COLORS.textLight,
              fontFamily: 'Inter',
              marginTop: '2px',
            }}>
              {item.sub}
            </p>
          </div>
          <ChevronRight size={15} color={COLORS.textLight} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  )
}

export default function Profile() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      variants={cv}
      initial="hidden"
      animate="visible"
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg,
        paddingBottom: '100px',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        variants={iv}
        style={{
          backgroundColor: COLORS.primary,
          padding: '52px 20px 32px',
          textAlign: 'center',
        }}
      >
        {/* Avatar + camera overlay */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
          <div style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${COLORS.accent}, #0097A7)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid rgba(255,255,255,0.28)',
          }}>
            <span style={{
              color: '#FFFFFF',
              fontSize: '26px',
              fontWeight: 700,
              fontFamily: 'Inter',
              letterSpacing: '-0.02em',
            }}>
              {USER.firstName[0]}{USER.lastName[0]}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: COLORS.accent,
              border: '2.5px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Camera size={11} color="#FFFFFF" strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Name */}
        <h1 style={{
          color: '#FFFFFF',
          fontSize: '22px',
          fontWeight: 700,
          fontFamily: 'Inter',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
        }}>
          {USER.firstName} {USER.lastName}
        </h1>

        {/* Nomzod badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          backgroundColor: 'rgba(0,173,181,0.18)',
          border: '1px solid rgba(0,173,181,0.32)',
          borderRadius: '20px',
          padding: '4px 12px',
          marginBottom: '12px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
          }} />
          <span style={{
            color: COLORS.accent,
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'Inter',
          }}>
            Nomzod
          </span>
        </div>

        {/* Email */}
        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '13px',
          fontFamily: 'Inter',
          marginBottom: '6px',
        }}>
          {USER.email}
        </p>

        {/* Location */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}>
          <MapPin size={12} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '12px',
            fontFamily: 'Inter',
          }}>
            {USER.city}, O'zbekiston
          </span>
        </div>
      </motion.div>

      <div style={{ padding: '20px' }}>

        {/* ── Stats (4 columns with dividers) ───────────────────── */}
        <motion.div
          variants={iv}
          style={{
            backgroundColor: COLORS.card,
            borderRadius: '16px',
            border: `1px solid ${COLORS.border}`,
            display: 'flex',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '0 2px 10px rgba(30,58,138,0.07)',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                padding: '16px 4px',
                textAlign: 'center',
                borderRight: i < STATS.length - 1 ? `1px solid ${COLORS.borderLight}` : 'none',
              }}
            >
              <p style={{
                fontSize: '20px',
                fontWeight: 700,
                color: COLORS.textDark,
                fontFamily: 'Inter',
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '10px',
                color: COLORS.textLight,
                fontFamily: 'Inter',
                marginTop: '4px',
                lineHeight: 1.35,
                padding: '0 2px',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Menu Section 1 ────────────────────────────────────── */}
        <motion.div variants={iv} style={{ marginBottom: '12px' }}>
          <MenuCard items={SECTION_1} />
        </motion.div>

        {/* ── Menu Section 2 ────────────────────────────────────── */}
        <motion.div variants={iv} style={{ marginBottom: '20px' }}>
          <MenuCard items={SECTION_2} />
        </motion.div>

        {/* ── Logout ────────────────────────────────────────────── */}
        <motion.div variants={iv} style={{ marginBottom: '16px' }}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              backgroundColor: COLORS.errorBg,
              border: '1px solid #FECACA',
              borderRadius: '14px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
            }}
          >
            <LogOut size={17} color={COLORS.error} strokeWidth={1.5} />
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: COLORS.error,
              fontFamily: 'Inter',
            }}>
              Chiqish
            </span>
          </motion.button>
        </motion.div>

        {/* ── Footer ────────────────────────────────────────────── */}
        <motion.div
          variants={iv}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Lock size={10} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
            Barcha ma'lumotlar shifrlangan
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}
