import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Shield, User, Calendar, MapPin,
  Phone, Mail, Lock, Eye, EyeOff, CheckCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { COLORS } from '../lib/constants'

const STEPS = [
  { n: 1, label: 'Shaxsiy' },
  { n: 2, label: 'Kontakt' },
  { n: 3, label: 'Parol' },
]

const stepVariants = {
  enter: (d: number) => ({ opacity: 0, x: d * 52 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: (d: number) => ({ opacity: 0, x: d * -52, transition: { duration: 0.2, ease: 'easeIn' } }),
}

function InputField({
  name, value, onChange, placeholder, type = 'text',
  focused, setFocused,
  icon,
  rightSlot,
  extraStyle,
}: {
  name: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  focused: string
  setFocused: (s: string) => void
  icon: (color: string) => React.ReactNode
  rightSlot?: React.ReactNode
  extraStyle?: React.CSSProperties
}) {
  const active = focused === name
  return (
    <div style={{ position: 'relative', marginBottom: '12px' }}>
      <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
        {icon(active ? '#1E3A8A' : COLORS.textLight)}
      </div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused('')}
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '13px 14px 13px 42px',
          borderRadius: '14px',
          border: `1.5px solid ${active ? '#1E3A8A' : COLORS.border}`,
          backgroundColor: active ? 'rgba(30,58,138,0.025)' : COLORS.card,
          fontSize: '14px',
          fontFamily: 'Inter',
          color: COLORS.textDark,
          outline: 'none',
          boxSizing: 'border-box',
          boxShadow: active ? '0 0 0 3px rgba(30,58,138,0.09)' : 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          ...(rightSlot ? { paddingRight: '44px' } : {}),
          ...extraStyle,
        }}
      />
      {rightSlot && (
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
          {rightSlot}
        </div>
      )}
    </div>
  )
}

function PrimaryButton({ label, disabled, onClick }: { label: string; disabled: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      style={{
        width: '100%',
        padding: '15px',
        borderRadius: '14px',
        border: 'none',
        backgroundColor: disabled ? '#D1D9EE' : '#1E3A8A',
        color: disabled ? '#8FA0C4' : '#FFFFFF',
        fontSize: '14px',
        fontWeight: 600,
        fontFamily: 'Inter',
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: '-0.01em',
        boxShadow: disabled ? 'none' : '0 4px 16px rgba(30,58,138,0.3)',
        transition: 'background-color 0.2s, box-shadow 0.2s',
        marginTop: '4px',
      }}
    >
      {label}
    </motion.button>
  )
}

export default function Register() {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const [focused, setFocused] = useState('')

  // Step 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [city, setCity] = useState('')

  // Step 2
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [myId, setMyId] = useState(false)

  // Step 3
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [privacy, setPrivacy] = useState(false)

  const goNext = () => { setDir(1); setStep(s => s + 1) }
  const goBack = () => {
    if (step === 1) navigate(-1)
    else { setDir(-1); setStep(s => s - 1) }
  }

  const step1Valid = !!(firstName.trim() && lastName.trim() && birthDate.trim() && city.trim())
  const step2Valid = !!(phone.trim() && email.trim())
  const pwdStrength = !password ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const step3Valid = !!(password.length >= 6 && confirmPwd === password && privacy)

  // ── Success ───────────────────────────────────────────────────────────────
  if (done) {
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            width: '96px', height: '96px', borderRadius: '50%',
            backgroundColor: 'rgba(0,173,181,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <CheckCircle size={52} color="#00ADB5" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '6px' }}
        >
          Muvaffaqiyatli ro'yxatdan o'tdingiz!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '17px', fontWeight: 700, color: '#1E3A8A', fontFamily: 'Inter', marginBottom: '8px' }}
        >
          {firstName} {lastName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: 'Inter', marginBottom: '36px' }}
        >
          {email}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          style={{
            width: '100%', padding: '15px', borderRadius: '14px', border: 'none',
            backgroundColor: '#1E3A8A', color: '#FFFFFF',
            fontSize: '14px', fontWeight: 600, fontFamily: 'Inter',
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(30,58,138,0.3)',
          }}
        >
          Davom etish
        </motion.button>
      </motion.div>
    )
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', backgroundColor: COLORS.bg, maxWidth: '480px', margin: '0 auto', paddingBottom: '48px' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#1E3A8A', padding: '52px 20px 28px' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goBack}
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)', border: 'none',
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: '16px',
          }}
        >
          <ArrowLeft size={18} color="#FFFFFF" strokeWidth={2} />
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
          <Shield size={15} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', fontFamily: 'Inter', letterSpacing: '0.05em' }}>
            IQTIDOR AI
          </span>
        </div>

        <h1 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, fontFamily: 'Inter', letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Ro'yxatdan o'tish
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'Inter' }}>
          Adolatli tanlov platformasiga xush kelibsiz
        </p>
      </div>

      {/* Progress steps */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '18px 24px 14px', borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', flex: i < STEPS.length - 1 ? 1 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: step > s.n ? '#00ADB5' : step === s.n ? '#1E3A8A' : '#F1F5F9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.25s',
                  boxShadow: step === s.n ? '0 4px 12px rgba(30,58,138,0.28)' : 'none',
                }}>
                  {step > s.n
                    ? <CheckCircle size={15} color="#FFFFFF" strokeWidth={2.5} />
                    : <span style={{ color: step === s.n ? '#FFFFFF' : '#9CA3AF', fontSize: '13px', fontWeight: 700, fontFamily: 'Inter' }}>{s.n}</span>
                  }
                </div>
                <span style={{
                  fontSize: '10px', fontFamily: 'Inter',
                  fontWeight: step === s.n ? 600 : 400,
                  color: step === s.n ? '#1E3A8A' : step > s.n ? '#00ADB5' : COLORS.textLight,
                  transition: 'color 0.25s',
                }}>
                  {s.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: '2px', marginTop: '15px', marginBottom: 0,
                  backgroundColor: step > s.n ? '#00ADB5' : '#E2E8F0',
                  transition: 'background-color 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animated step content */}
      <div style={{ padding: '20px 20px 0', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Shaxsiy ma'lumotlar
                </p>

                <InputField
                  name="firstName" value={firstName} onChange={setFirstName}
                  placeholder="Ism" focused={focused} setFocused={setFocused}
                  icon={c => <User size={16} color={c} strokeWidth={1.5} />}
                />
                <InputField
                  name="lastName" value={lastName} onChange={setLastName}
                  placeholder="Familiya" focused={focused} setFocused={setFocused}
                  icon={c => <User size={16} color={c} strokeWidth={1.5} />}
                />
                <InputField
                  name="birthDate" value={birthDate} onChange={setBirthDate}
                  placeholder="Tug'ilgan sana (KK.OO.YYYY)" focused={focused} setFocused={setFocused}
                  icon={c => <Calendar size={16} color={c} strokeWidth={1.5} />}
                />
                <InputField
                  name="city" value={city} onChange={setCity}
                  placeholder="Shahar" focused={focused} setFocused={setFocused}
                  icon={c => <MapPin size={16} color={c} strokeWidth={1.5} />}
                />

                <div style={{ marginTop: '8px' }}>
                  <PrimaryButton label="Davom etish" disabled={!step1Valid} onClick={goNext} />
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Kontakt ma'lumotlar
                </p>

                {/* Phone with +998 prefix */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                  <div style={{
                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                    display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: 'none', zIndex: 1,
                  }}>
                    <Phone size={16} color={focused === 'phone' ? '#1E3A8A' : COLORS.textLight} strokeWidth={1.5} />
                    <span style={{ fontSize: '13px', fontFamily: 'Inter', color: COLORS.textMid, fontWeight: 500 }}>+998</span>
                  </div>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused('')}
                    placeholder="XX XXX XX XX"
                    style={{
                      width: '100%', padding: '13px 14px 13px 88px',
                      borderRadius: '14px',
                      border: `1.5px solid ${focused === 'phone' ? '#1E3A8A' : COLORS.border}`,
                      backgroundColor: focused === 'phone' ? 'rgba(30,58,138,0.025)' : COLORS.card,
                      fontSize: '14px', fontFamily: 'Inter', color: COLORS.textDark,
                      outline: 'none', boxSizing: 'border-box',
                      boxShadow: focused === 'phone' ? '0 0 0 3px rgba(30,58,138,0.09)' : 'none',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                  />
                </div>

                <InputField
                  name="email" value={email} onChange={setEmail}
                  placeholder="Email manzil" type="email"
                  focused={focused} setFocused={setFocused}
                  icon={c => <Mail size={16} color={c} strokeWidth={1.5} />}
                />

                {/* MyID card */}
                <div
                  onClick={() => setMyId(v => !v)}
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: '14px',
                    padding: '14px 16px',
                    border: `1.5px solid ${myId ? '#00ADB5' : COLORS.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '20px', cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '11px',
                      backgroundColor: 'rgba(0,173,181,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Shield size={19} color="#00ADB5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '4px' }}>
                        MyID orqali tasdiqlash
                      </p>
                      <span style={{
                        backgroundColor: 'rgba(0,173,181,0.1)', color: '#00ADB5',
                        fontSize: '10px', fontWeight: 600, fontFamily: 'Inter',
                        padding: '2px 8px', borderRadius: '20px',
                      }}>
                        Tavsiya etiladi
                      </span>
                    </div>
                  </div>

                  {/* Toggle */}
                  <div style={{
                    width: '44px', height: '24px', borderRadius: '12px',
                    backgroundColor: myId ? '#00ADB5' : '#E2E8F0',
                    position: 'relative', flexShrink: 0, transition: 'background-color 0.2s',
                  }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      position: 'absolute', top: '3px',
                      left: myId ? '23px' : '3px',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    }} />
                  </div>
                </div>

                <PrimaryButton label="Davom etish" disabled={!step2Valid} onClick={goNext} />
              </div>
            )}

            {/* ── STEP 3 ── */}
            {step === 3 && (
              <div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: COLORS.textDark, fontFamily: 'Inter', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Parol yaratish
                </p>

                {/* Password */}
                <InputField
                  name="password" value={password} onChange={setPassword}
                  placeholder="Parol" type={showPwd ? 'text' : 'password'}
                  focused={focused} setFocused={setFocused}
                  icon={c => <Lock size={16} color={c} strokeWidth={1.5} />}
                  rightSlot={
                    <button
                      onClick={() => setShowPwd(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      {showPwd
                        ? <EyeOff size={16} color={COLORS.textLight} strokeWidth={1.5} />
                        : <Eye size={16} color={COLORS.textLight} strokeWidth={1.5} />
                      }
                    </button>
                  }
                />

                {/* Strength indicator */}
                {password.length > 0 && (
                  <div style={{ marginTop: '-4px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '5px' }}>
                      {[1, 2, 3].map(level => (
                        <div
                          key={level}
                          style={{
                            flex: 1, height: '3px', borderRadius: '2px',
                            backgroundColor: pwdStrength >= level
                              ? (pwdStrength === 1 ? '#EF4444' : pwdStrength === 2 ? '#F59E0B' : '#22C55E')
                              : '#E2E8F0',
                            transition: 'background-color 0.2s',
                          }}
                        />
                      ))}
                    </div>
                    <p style={{
                      fontSize: '11px', fontFamily: 'Inter',
                      color: pwdStrength === 1 ? '#EF4444' : pwdStrength === 2 ? '#F59E0B' : '#22C55E',
                    }}>
                      {pwdStrength === 1 ? 'Zaif parol' : pwdStrength === 2 ? "O'rtacha parol" : 'Kuchli parol'}
                    </p>
                  </div>
                )}

                {/* Confirm password */}
                <InputField
                  name="confirmPwd" value={confirmPwd} onChange={setConfirmPwd}
                  placeholder="Parolni tasdiqlang" type={showConfirm ? 'text' : 'password'}
                  focused={focused} setFocused={setFocused}
                  icon={c => <Lock size={16} color={c} strokeWidth={1.5} />}
                  extraStyle={
                    confirmPwd && confirmPwd !== password
                      ? { border: '1.5px solid #EF4444', boxShadow: '0 0 0 3px rgba(239,68,68,0.09)' }
                      : {}
                  }
                  rightSlot={
                    <button
                      onClick={() => setShowConfirm(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                    >
                      {showConfirm
                        ? <EyeOff size={16} color={COLORS.textLight} strokeWidth={1.5} />
                        : <Eye size={16} color={COLORS.textLight} strokeWidth={1.5} />
                      }
                    </button>
                  }
                />
                {confirmPwd && confirmPwd !== password && (
                  <p style={{ fontSize: '11px', color: '#EF4444', fontFamily: 'Inter', marginTop: '-6px', marginBottom: '12px' }}>
                    Parollar mos kelmaydi
                  </p>
                )}

                {/* Privacy checkbox */}
                <div
                  onClick={() => setPrivacy(v => !v)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', marginTop: '4px', cursor: 'pointer' }}
                >
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                    border: `2px solid ${privacy ? '#1E3A8A' : COLORS.border}`,
                    backgroundColor: privacy ? '#1E3A8A' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background-color 0.15s, border-color 0.15s',
                  }}>
                    {privacy && <CheckCircle size={12} color="#FFFFFF" strokeWidth={3} />}
                  </div>
                  <p style={{ fontSize: '12px', color: COLORS.textMid, fontFamily: 'Inter', lineHeight: 1.6 }}>
                    <span style={{ color: COLORS.textDark, fontWeight: 600 }}>Foydalanish shartlari</span>
                    {' '}va{' '}
                    <span style={{ color: COLORS.textDark, fontWeight: 600 }}>Maxfiylik siyosati</span>
                    ni o'qib, qabul qilaman
                  </p>
                </div>

                <PrimaryButton
                  label="Ro'yxatdan o'tish"
                  disabled={!step3Valid}
                  onClick={() => setDone(true)}
                />
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
