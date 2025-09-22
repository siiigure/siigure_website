// import './styles/home_1.css';
import SocialLinks from '@/components/SocialLinks';
import Rain from '../components/HeroSection';

export default function HomePage() {
  return (
    <div className="font-alan flex flex-col justify-center px-12 text-white">
      <h1 className="home-heading">hi! It's siigure</h1>
      <p className="home-subheading">
        Front-end developer exploring full-stack possibilities.
        <SocialLinks />
      </p>

      <div className="home-main-grid">
        <div className="home-left flex flex-col justify-end h-screen gap-8">
          <nav className="home-nav">
            <a href="/about" className="nav-item active">
              ABOUT
            </a>
            <a href="/blog" className="nav-item">
              BLOG
            </a>
            <a href="/photos" className="nav-item">
              PHOTOS
            </a>
            <a href="/more" className="nav-item">
              MORE
            </a>
          </nav>
        </div>

        <div className="home-right space-y-6 leading-relaxed">
          <p>
            I'm a developer who cares deeply about how code feels — clean,
            elegant, and enjoyable to interact with.
          </p>
          <p>
            I'm currently pursuing a career in fullstack development, always
            learning and experimenting — from design systems and typography to
            lightweight solutions that bring interfaces to life.
          </p>
          <p>
            For me, coding is a craft. I'm drawn to the space where engineering
            precision meets creative play.
          </p>
          <p>
            Outside of coding, I explore analog and creative hobbies — shooting
            Polaroids, diving into films and literature, and building miniature
            dioramas. Music is another outlet: I play classical guitar and
            sometimes a melodica.
          </p>
          <p>
            I like making things, whether with code, a camera, or an instrument.
          </p>
        </div>
      </div>
    </div>
  );
}
