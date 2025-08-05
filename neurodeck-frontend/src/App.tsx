import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ThinkLab from './pages/labs/ThinkLab';
import ImagineLab from './pages/labs/ImagineLab';
import AnalyzeLab from './pages/labs/AnalyzeLab';
import DesignLab from './pages/labs/DesignLab';
import OptimizeLab from './pages/labs/OptimizeLab';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/think" element={<ThinkLab />} />
        <Route path="/imagine" element={<ImagineLab />} />
        <Route path="/analyze" element={<AnalyzeLab />} />
        <Route path="/design" element={<DesignLab />} />
        <Route path="/optimize" element={<OptimizeLab />} />
      </Routes>
    </>
  );
}

export default App;
