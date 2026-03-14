import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import WardLogin from './pages/WardLogin';
import WardDashboard from './pages/WardDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<WardLogin />} />
        <Route path="/ward/dashboard" element={<WardDashboard />} />
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
