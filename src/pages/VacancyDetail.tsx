import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Star, Shield, ChevronRight, Briefcase } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { COLORS, cv, iv } from '../lib/constants'
import { VACANCIES } from '../data/mockData'

export default function VacancyDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const vacancy = VACANCIES.find(v => v.id === Number(id))

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!vacancy) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Inter', color: COLORS.textLight }}>Vakansiya topilmadi</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '40px' }}
    >
      {/* Header */}
      <div style={{ backgroundColor: COLORS.primary, padding: '52px 20px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate(-1)}
            style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ArrowLeft size={17} color="#FFFFFF" strokeWidth={2} />
          </motion.button>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>IQTIDOR AI</p>
            <h1 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginTop: '2px' }}>
              {vacancy.title}
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={12} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>{vacancy.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontFamily: 'Inter' }}>{vacancy.type}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Star size={12} color={COLORS.accent} strokeWidth={2} fill={COLORS.accent} />
            <span style={{ color: COLORS.accent, fontSize: '12px', fontFamily: 'Inter', fontWeight: 600 }}>{vacancy.match}% mos</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>

        {/* Maosh */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.primary, borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: 'Inter', marginBottom: '6px' }}>Maosh (so'm)</p>
          <p style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.01em' }}>
            {vacancy.salary}
          </p>
        </motion.div>

        {/* Info kartalar */}
        <motion.div variants={iv}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          {[
            { label: 'Tashkilot', value: vacancy.org },
            { label: 'Ish turi', value: vacancy.type },
            { label: 'Muddat', value: vacancy.deadline },
            { label: 'Kategoriya', value: vacancy.category },
          ].map(info => (
            <div key={info.label} style={{ backgroundColor: COLORS.card, borderRadius: '12px', padding: '14px', border: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: '10px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '4px' }}>{info.label}</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>{info.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Tavsif */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '10px' }}>Tavsif</h3>
          <p style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.6 }}>{vacancy.description}</p>
        </motion.div>

        {/* Talablar */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '18px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '12px' }}>Talablar</h3>
          {vacancy.requirements.map((req, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: COLORS.accent, flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: COLORS.textMid, fontFamily: 'Inter' }}>{req}</span>
            </div>
          ))}
        </motion.div>

        {/* Baholash shaffofligi */}
        <motion.div variants={iv}
          style={{ backgroundColor: COLORS.bg, borderRadius: '16px', padding: '18px', marginBottom: '24px', border: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textLight, fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Baholash shaffofligi
          </p>
          {[
            { label: 'Test', value: vacancy.criteria.test },
            { label: 'Tajriba', value: vacancy.criteria.experience },
            { label: 'Intervyu', value: vacancy.criteria.interview },
          ].map((c, i) => (
            <div key={c.label} style={{ marginBottom: i < 2 ? '12px' : 0 }}>
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
        </motion.div>

        {/* Ariza yuborish tugmasi */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/apply/${vacancy.id}`)}
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
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>Ma'lumotlar shifrlangan va himoyalangan</p>
        </div>

      </div>
    </motion.div>
  )
}