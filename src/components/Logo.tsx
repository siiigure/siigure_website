import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <a aria-label="Siigure home" className="logo-glow inline-block">
        <motion.span
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-200 via-purple-200 to-white bg-clip-text text-transparent"
        >
          Siigure
        </motion.span>
      </a>
    </Link>
  );
}
