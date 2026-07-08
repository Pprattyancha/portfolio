import './App.css';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from "react-router-dom";
import NavBar from './component/NavBar.jsx'
import InfoPage from './pages/about/InfoPage.jsx';
import Contact from './component/Contact.jsx';
import Experience from './component/Experience.jsx';
import Review from './component/Review.jsx';
import Footer from './component/Footer.jsx';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<InfoPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/reviews" element={<Review />} />
      </Routes>
      <Footer />

    </>

  )
}

export default App;
