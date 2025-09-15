import Link from 'next/link';
import { motion } from 'framer-motion';

const items = [
  { href: '/blog', label: 'Blog' },
  { href: '/photography', label: 'Photography' }
  // 以后再加更多
];

export default function Nav() {
  return (
    <nav className="mt-8">
      <ul className="flex gap-6">
        {items.map((it) => (
          <li key={it.href} className="list-none">
            <Link href={it.href}>
              <a>
                <motion.span
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 12 }}
                  className="px-3 py-1 rounded-md hover:bg-white/6 transition text-sm md:text-base"
                >
                  {it.label}
                </motion.span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
