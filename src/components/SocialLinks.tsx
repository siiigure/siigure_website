import { FiGithub, FiMail, FiInstagram } from 'react-icons/fi';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="https://github.com/你的用户名"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="p-2 rounded hover:bg-white/10 transition"
      >
        <FiGithub size={18} />
      </a>

      <a
        href="mailto:youremail@example.com"
        aria-label="Email"
        className="p-2 rounded hover:bg-white/10 transition"
      >
        <FiMail size={18} />
      </a>

      <a
        href="https://instagram.com/你的用户名"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="p-2 rounded hover:bg-white/10 transition"
      >
        <FiInstagram size={18} />
      </a>
    </div>
  );
}
