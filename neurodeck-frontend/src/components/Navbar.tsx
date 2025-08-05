import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 shadow-md flex gap-4 bg-white text-black">
      <Link to="/">🏠 Home</Link>
      <Link to="/think">🧠 Think Lab</Link>
      <Link to="/imagine">🎨 Imagine Lab</Link>
      <Link to="/analyze">📊 Analyze Lab</Link>
      <Link to="/design">📐 Design Lab</Link>
      <Link to="/optimize">⚙️ Optimize Lab</Link>
    </nav>
  );
}
