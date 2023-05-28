import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.tsx'
import Home from './pages/Home.tsx'
import Blog from './pages/Blog.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import './App.scss'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
