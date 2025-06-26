import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import About from './pages/About';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/global.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;