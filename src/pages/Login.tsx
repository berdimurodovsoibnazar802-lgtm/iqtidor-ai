import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronRight, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'myid' | 'phone'>('myid')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleMyID = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 2000)
  }

  const handlePhone = () => {
    if (!phone || !password) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg,
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Yuqori qism */}
      <div style={{ backgroundColor: COLORS.primary, padding: '80px 24px 40px', flex: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color={COLORS.accent} strokeWidth={1.5} />
          </div>
          <span style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em' }}>
            IQTIDOR AI
          </span>
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', lineHeight: 1.3, marginBottom: '8px' }}>
          Adolatli tanlov.<br />Shaffof jarayon.
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontFamily: 'Inter', lineHeight: 1.6 }}>
          Davlat va xususiy tashkilotlarda ishga qabul jarayonini shaffof qiluvchi platforma.
        </p>
      </div>

      {/* Pastki qism */}
      <div style={{ flex: 1, padding: '28px 24px 40px', display: 'flex', flexDirection: 'column' }}>

        {/* Tab */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', backgroundColor: COLORS.borderLight, borderRadius: '14px', padding: '4px' }}>
          {[
            { key: 'myid', label: 'MyID' },
            { key: 'phone', label: 'Telefon' },
          ].map(t => (
            <motion.button
              key={t.key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTab(t.key as any)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: tab === t.key ? COLORS.card : 'transparent',
                color: tab === t.key ? COLORS.primary : COLORS.textLight,
                fontSize: '14px',
                fontFamily: 'Inter',
                fontWeight: tab === t.key ? 600 : 400,
                cursor: 'pointer',
                boxShadow: tab === t.key ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {t.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* MyID */}
          {tab === 'myid' && (
            <motion.div
              key="myid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px', marginBottom: '16px', border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px' }}><Shield size={22} color={COLORS.primary} strokeWidth={1.5} /></span>
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>MyID</p>
                    <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter' }}>O'zbekiston fuqarolari uchun</p>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.6, marginBottom: '16px' }}>
                  MyID orqali kirishda shaxsiy ma'lumotlaringiz avtomatik to'ldiriladi va xavfsiz saqlanadi.
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMyID}
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: loading ? COLORS.border : COLORS.primary,
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    color: loading ? COLORS.textLight : '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: loading ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {loading ? 'Tekshirilmoqda...' : 'MyID orqali kirish'}
                  {!loading && <ChevronRight size={16} strokeWidth={2} />}
                </motion.button>
              </div>

              <div style={{ backgroundColor: COLORS.card, borderRadius: '16px', padding: '20px', border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px' }}><Shield size={22} color={COLORS.primary} strokeWidth={1.5} /></span>
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter' }}>my.gov.uz</p>
                    <p style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter' }}>Davlat xizmatlari portali</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMyID}
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: `1.5px solid ${COLORS.primary}`,
                    borderRadius: '12px',
                    padding: '14px',
                    color: COLORS.primary,
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Inter',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  my.gov.uz orqali kirish
                  <ChevronRight size={16} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Telefon */}
          {tab === 'phone' && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Telefon input */}
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '8px' }}>
                  Telefon raqam
                </p>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color={COLORS.textLight} strokeWidth={1.5}
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+998 90 000 00 00"
                    style={{ width: '100%', padding: '14px 14px 14px 42px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card, fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Parol input */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '12px', fontWeight: 500, color: COLORS.textMid, fontFamily: 'Inter', marginBottom: '8px' }}>
                  Parol
                </p>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} color={COLORS.textLight} strokeWidth={1.5}
                    style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPass ? 'text' : 'password'}
                    placeholder="Parolingiz"
                    style={{ width: '100%', padding: '14px 42px 14px 42px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card, fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark, outline: 'none', boxSizing: 'border-box' }}
                  />
                  <button
                    onClick={() => setShowPass(!showPass)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    {showPass ? <EyeOff size={16} color={COLORS.textLight} /> : <Eye size={16} color={COLORS.textLight} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handlePhone}
                disabled={!phone || !password || loading}
                style={{
                  width: '100%',
                  backgroundColor: (!phone || !password || loading) ? COLORS.border : COLORS.primary,
                  border: 'none',
                  borderRadius: '12px',
                  padding: '15px',
                  color: (!phone || !password || loading) ? COLORS.textLight : '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  cursor: (!phone || !password || loading) ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {loading ? 'Kirilmoqda...' : 'Kirish'}
                {!loading && <ChevronRight size={16} strokeWidth={2} />}
              </motion.button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: COLORS.textLight, fontFamily: 'Inter', marginTop: '16px' }}>
                Akkaunt yo'qmi?{' '}
                <span style={{ color: COLORS.primary, fontWeight: 600, cursor: 'pointer' }}>
                  Ro'yxatdan o'tish
                </span>
              </p>
            </motion.div>
          )}

        </AnimatePresence>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: 'auto', paddingTop: '24px' }}>
          <Shield size={11} color={COLORS.textLight} strokeWidth={1.5} />
          <p style={{ fontSize: '11px', color: COLORS.textLight, fontFamily: 'Inter' }}>
            Ma'lumotlar shifrlangan va himoyalangan
          </p>
        </div>

      </div>
    </motion.div>
  )
}