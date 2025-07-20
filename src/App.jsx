import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ScrollToTop from './components/ScrollToTop'
import NotFound from './pages/NotFound'
import Explore from './pages/Explore'
import BookDetails from './pages/BookDetails'
import Favorites from './pages/Favorites'

function App() {
  const RenderRoute = () => (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )

  return (
    <>
      {RenderRoute()}
    </>
  )
}

export default App