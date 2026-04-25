import { useState } from 'react'
import { Search, Briefcase, MapPin, Clock, Star, ChevronRight, X, Shield } from 'lucide-react'
import { useEffect } from 'react'
import { COLORS, cv, iv } from '../lib/constants'
import { VACANCIES } from '../data/mockData'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['Barchasi', 'Tibbiyot', "Ta'lim", 'IT', 'Moliya']

export default function Vacancies() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Barchasi')
  const [selected, setSelected] = useState<typeof VACANCIES[0] | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])
  const navigate = useNavigate()
  const filtered = VACANCIES.filter(v => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.org.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'Barchasi' || v.category === category
    return matchSearch && matchCat
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
          Vakansiyalar
        </h1>
      </motion.div>

      <div style={{ padding: '16px 20px' }}>

        {/* Qidiruv */}
        <motion.div variants={iv} style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={16} color={COLORS.textLight} strokeWidth={1.5}
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Lavozim yoki tashkilot..."
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              borderRadius: '12px',
              border: `1px solid ${COLORS.border}`,
              backgroundColor: COLORS.card,
              fontSize: '14px',
              fontFamily: 'Inter',
              color: COLORS.textDark,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </motion.div>

        {/* Kategoriyalar */}
        <motion.div variants={iv} style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.94 }}
              onClick={() => setCategory(cat)}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                border: category === cat ? 'none' : `1px solid ${COLORS.border}`,
                backgroundColor: category === cat ? COLORS.primary : COLORS.card,
                color: category === cat ? '#FFFFFF' : COLORS.textMid,
                fontSize: '12px',
                fontFamily: 'Inter',
                fontWeight: category === cat ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: category === cat ? '0 2px 8px rgba(30,58,138,0.25)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Vakansiyalar ro'yxati */}
        {filtered.map((vac) => (
          <motion.div
            key={vac.id}
            variants={iv}
            whileTap={{ scale: 0.98 }}
           onClick={() => navigate(`/vacancies/${vac.id}`)}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ flex: 1, paddingRight: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>
                    {vac.title}
                  </p>
                  {vac.isNew && (
                    <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.primary, backgroundColor: COLORS.infoBg, padding: '2px 7px', borderRadius: '20px', fontFamily: 'Inter' }}>
                      Yangi
                    </span>
                  )}
                  {vac.isRecommended && (
                    <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.accent, backgroundColor: COLORS.accentBg, padding: '2px 7px', borderRadius: '20px', fontFamily: 'Inter' }}>
                      Tavsiya
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter' }}>{vac.org}</p>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: COLORS.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Briefcase size={20} color={COLORS.primary} strokeWidth={1.5} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={11} color={COLORS.textLight} strokeWidth={1.5} />
                <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>{vac.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} color={COLORS.textLight} strokeWidth={1.5} />
                <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>{vac.type}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Star size={12} color={COLORS.accent} strokeWidth={2} fill={COLORS.accent} />
                <span style={{ fontSize: '12px', color: COLORS.accent, fontFamily: 'Inter', fontWeight: 600 }}>
                  {vac.match}% mos
                </span>
              </div>
              <span style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                Muddat: {vac.deadline}
              </span>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <p style={{ fontSize: '14px', color: COLORS.textLight, fontFamily: 'Inter' }}>
              Hech narsa topilmadi
            </p>
          </div>
        )}

      </div>

      {/* Vakansiya Detail Modal */}
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
              {/* Modal header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
                    {selected.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter', marginTop: '4px' }}>
                    {selected.org}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelected(null)}
                  style={{ backgroundColor: COLORS.borderLight, border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <X size={15} color={COLORS.textMid} strokeWidth={2} />
                </motion.button>
              </div>

              {/* Maosh */}
              <div style={{ backgroundColor: COLORS.primary, borderRadius: '14px', padding: '16px 20px', marginBottom: '16px' }}>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '4px' }}>Maosh (so'm)</p>
                <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.01em' }}>
                  {selected.salary}
                </p>
              </div>

              {/* Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {[
                  { label: 'Joylashuv', value: selected.location },
                  { label: 'Ish turi', value: selected.type },
                  { label: 'Muddat', value: selected.deadline },
                  { label: 'Moslik', value: `${selected.match}%` },
                ].map(info => (
                  <div key={info.label} style={{ backgroundColor: COLORS.bg, borderRadius: '12px', padding: '12px 14px' }}>
                    <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '4px' }}>{info.label}</p>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{info.value}</p>
                  </div>
                ))}
              </div>

              {/* Baholash shaffofligi */}
              <div style={{ backgroundColor: COLORS.bg, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.textMid, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                  Baholash shaffofligi
                </p>
                {[
                  { label: 'Test', value: selected.criteria.test },
                  { label: 'Tajriba', value: selected.criteria.experience },
                  { label: 'Intervyu', value: selected.criteria.interview },
                ].map((c, i) => (
                  <div key={c.label} style={{ marginBottom: i < 2 ? '10px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '12px', color: COLORS.textDark, fontFamily: 'Inter' }}>{c.label}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: COLORS.primary, fontFamily: 'Inter' }}>{c.value}%</span>
                    </div>
                    <div style={{ height: '5px', backgroundColor: COLORS.borderLight, borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.value}%` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        style={{ height: '100%', backgroundColor: COLORS.primary, borderRadius: '3px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Ariza tugmasi */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  backgroundColor: COLORS.primary,
                  border: 'none',
                  borderRadius: '14px',
                  padding: '16px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                Ariza yuborish
                <ChevronRight size={18} strokeWidth={2} />
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
                <Shield size={10} color={COLORS.textLight} strokeWidth={1.5} />
                <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
                  Ma'lumotlar shifrlangan va himoyalangan
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}