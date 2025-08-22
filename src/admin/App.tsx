import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { AuthProvider } from '../contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Outlet />
    </AuthProvider>
  )
}

export default App