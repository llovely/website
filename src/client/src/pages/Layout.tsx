import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.tsx'

type Props = Record<string, never>

const Layout: React.FC<Props> = () => {
  const year = new Date().getFullYear().toString()

  return (
    <>
      <Outlet />
      <Footer
        bg='primary'
        initialYear='2022'
        currentYear={year}
        name={import.meta.env.VITE_NAME}
      />
    </>
  )
}

export default Layout
