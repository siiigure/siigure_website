// components/HomeNav.tsx
export default function HomeNav() {
  return (
    <nav className="home-nav">
      <a href="#about" className="nav-item active">
        About
      </a>
      <a href="#blog" className="nav-item">
        Blog
      </a>
      <a href="#photos" className="nav-item">
        Photos
      </a>
      <a href="#more" className="nav-item">
        More
      </a>
    </nav>
  );
}
