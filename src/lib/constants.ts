import { type Variants } from 'framer-motion'

export const COLORS = {
  primary: '#1E3A8A',
  accent: '#00ADB5',
  bg: '#FAF9F6',
  card: '#FFFFFF',
  textDark: '#212529',
  textMid: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E8F0FE',
  borderLight: '#F1F5F9',
  error: '#C0392B',
  errorBg: '#FEF2F2',
  infoBg: '#EFF6FF',
  accentBg: '#F0FDFA',
}

export const cv: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const iv: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}