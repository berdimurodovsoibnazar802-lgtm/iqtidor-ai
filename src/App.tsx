import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Vacancies from './pages/Vacancies'
import Applications from './pages/Applications'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import VacancyDetail from './pages/VacancyDetail'
import ApplicationDetail from './pages/ApplicationDetail'
import Login from './pages/Login'
import Apply from './pages/Apply'
import Notifications from './pages/Notifications'
import InterviewSlots from './pages/InterviewSlots'
import InterviewRoom from './pages/InterviewRoom'
import EvaluationForm from './pages/EvaluationForm'
import InterviewResult from './pages/InterviewResult'
import Register from './pages/Register'
import TestExam from './pages/TestExam'

function AppContent() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/apply/:id" element={<Apply />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
          <Route path="/vacancies/:id" element={<VacancyDetail />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interview-slots/:id" element={<InterviewSlots />} />
          <Route path="/interview-room/:id" element={<InterviewRoom />} />
          <Route path="/evaluation/:id" element={<EvaluationForm />} />
          <Route path="/interview-result/:id" element={<InterviewResult />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test/:id" element={<TestExam />} />
        </Routes>
      </AnimatePresence>
      <Navbar />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
        <AppContent />
      </div>
    </BrowserRouter>
  )
}
