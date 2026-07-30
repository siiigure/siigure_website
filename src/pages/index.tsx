'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { GetStaticProps } from 'next';
import { RotateCcw } from 'lucide-react';
import SocialLinks from '@/components/SocialLinks';
import HomeNav from '@/components/HomeNav';
import BlogNav from '@/components/blogNav';
import ScrollSnapWrapper from '@/components/ScrollSnapWrapper';
import MoreSection from './more';
import PhotographySection from './photography';
import type { BlogPostMeta } from '@/lib/blog';

type HomePageProps = {
  posts: BlogPostMeta[];
};

const gameWidth = 360;
const gameHeight = 120;
const runnerX = 38;
const runnerWidth = 18;
const runnerHeight = 20;
const floorY = 92;
const groundY = floorY - runnerHeight;
const jumpVelocity = -7.3;

const cactusHeights = [24, 30, 20, 34, 26, 32];
const birdHeights = [38, 46, 34, 42];

type GameStatus = 'ready' | 'running' | 'over';

type ArcadeItem = {
  height: number;
  id: number;
  kind: 'bird' | 'cactus';
  scored: boolean;
  width: number;
  x: number;
  y: number;
};

type GameState = {
  items: ArcadeItem[];
  nextId: number;
  score: number;
  status: GameStatus;
  velocity: number;
  y: number;
};

type ArcadeStyle = CSSProperties & {
  '--item-height'?: string;
  '--item-width'?: string;
  '--item-x'?: string;
  '--item-y'?: string;
  '--runner-y'?: string;
};

const createArcadeItem = (id: number, x: number): ArcadeItem => {
  if (id > 0 && id % 5 === 0) {
    return {
      id,
      kind: 'bird',
      x,
      y: birdHeights[id % birdHeights.length],
      width: 24,
      height: 12,
      scored: false
    };
  }

  const height = cactusHeights[id % cactusHeights.length];

  return {
    id,
    kind: 'cactus',
    x,
    y: floorY - height,
    width: id % 4 === 0 ? 20 : 14,
    height,
    scored: false
  };
};

const createInitialGame = (): GameState => ({
  items: [
    createArcadeItem(0, 180),
    createArcadeItem(1, 292),
    createArcadeItem(2, 414)
  ],
  nextId: 3,
  score: 0,
  status: 'ready',
  velocity: 0,
  y: groundY
});

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { getAllBlogPosts } = await import('@/lib/blog');

  return {
    props: {
      posts: getAllBlogPosts()
    }
  };
};

export default function HomePage({ posts }: HomePageProps) {
  const [active, setActive] = useState('about');
  const [game, setGame] = useState<GameState>(createInitialGame);

  const jump = () => {
    setGame((current) => {
      if (current.status !== 'running') {
        return {
          ...createInitialGame(),
          status: 'running',
          velocity: jumpVelocity
        };
      }

      if (current.y >= groundY - 10) {
        return { ...current, velocity: jumpVelocity };
      }

      return current;
    });
  };

  const resetGame = () => setGame(createInitialGame());

  useEffect(() => {
    const ids = ['about', 'blog', 'photos', 'more'];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(visible.target.id);
      },
      { threshold: [0.35, 0.55, 0.75] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (game.status !== 'running') return;

    const timer = window.setInterval(() => {
      setGame((current) => {
        if (current.status !== 'running') return current;

        const speed = 2 + Math.min(current.score * 0.03, 1.1);
        let velocity = Math.min(current.velocity + 0.32, 5.4);
        let y = current.y + velocity;
        let score = current.score;
        let nextId = current.nextId;
        let farthestX = Math.max(...current.items.map((item) => item.x));

        if (y >= groundY) {
          y = groundY;
          velocity = 0;
        }

        const items = current.items.map((item) => {
          let nextItem = { ...item, x: item.x - speed };

          if (!nextItem.scored && nextItem.x + nextItem.width < runnerX) {
            nextItem = { ...nextItem, scored: true };
            score += 1;
          }

          if (nextItem.x < -40) {
            farthestX += 124 + (nextId % 4) * 26;
            nextItem = createArcadeItem(nextId, farthestX);
            nextId += 1;
          }

          return nextItem;
        });

        const hitObstacle = items.some((item) => {
          return (
            runnerX + runnerWidth > item.x &&
            runnerX < item.x + item.width &&
            y + runnerHeight > item.y &&
            y < item.y + item.height
          );
        });

        return {
          ...current,
          items,
          nextId,
          score,
          status: hitObstacle ? 'over' : 'running',
          velocity,
          y
        };
      });
    }, 16);

    return () => window.clearInterval(timer);
  }, [game.status]);

  return (
    <ScrollSnapWrapper>
      <section id="about" className="home-section about-section">
        <div className="home-floating-nav">
          <HomeNav activeId={active} onChange={setActive} />
        </div>

        <div className="about-shell">
          <div className="field-section-kicker">01 / ABOUT</div>
          <div className="about-header">
            <div className="about-title-block">
              <h1>hi! It&apos;s siigure</h1>
            </div>
            <div className="about-intro">
              <p className="about-lede">
                Front-end developer exploring full-stack possibilities.
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="about-card-grid">
            <div className="about-statement about-record-card">
              <span className="about-card-index">[01]</span>
              <p>
                I care about how code feels: clean, elegant, and nice to work
                with.
              </p>
            </div>
            <div className="about-details about-record-card">
              <span className="about-card-index">[02] / NOW</span>
              <div className="about-details-copy">
                <p>
                  Right now, I&apos;m focusing on full-stack development while
                  staying close to typography, design systems, and tiny
                  interactions that make interfaces feel alive.
                </p>
                <p>
                  Outside of coding, I enjoy analog and creative hobbies:
                  Polaroids, films, miniature dioramas, classical guitar, and a
                  melodica that shows up when the room is too quiet.
                </p>
              </div>
            </div>
          </div>

          <div className="arcade-panel about-game-card" aria-label="Endless runner">
              <div className="arcade-toolbar">
                <span className="score-chip">{String(game.score).padStart(2, '0')}</span>
                <button
                  type="button"
                  className="arcade-icon-button"
                  aria-label="Reset game"
                  title="Reset"
                  onClick={resetGame}
                >
                  <RotateCcw size={18} strokeWidth={2.2} />
                </button>
              </div>

              <button
                type="button"
                className={`arcade-stage ${game.status}`}
                aria-label="Jump endless runner"
                tabIndex={-1}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.currentTarget.blur();
                  jump();
                }}
              >
                <span className="runner-prompt" aria-hidden="true">
                  {game.status === 'ready' ? 'ready' : game.status === 'over' ? 'again?' : ''}
                </span>
                <span className="runner-sun" aria-hidden="true" />
                <span className="runner-hill hill-one" aria-hidden="true" />
                <span className="runner-hill hill-two" aria-hidden="true" />
                <span className="runner-cloud cloud-one" aria-hidden="true" />
                <span className="runner-cloud cloud-two" aria-hidden="true" />
                <span
                  className="pixel-runner"
                  style={
                    {
                      '--runner-y': `${(game.y / gameHeight) * 100}%`
                    } as ArcadeStyle
                  }
                  aria-hidden="true"
                >
                  <span className="runner-eye" />
                  <span className="runner-scarf" />
                  <span className="runner-leg leg-one" />
                  <span className="runner-leg leg-two" />
                </span>

                {game.items.map((item) => (
                  <span
                    key={item.id}
                    className={`arcade-item ${item.kind}`}
                    style={
                      {
                        '--item-x': `${(item.x / gameWidth) * 100}%`,
                        '--item-y': `${(item.y / gameHeight) * 100}%`,
                        '--item-width': `${(item.width / gameWidth) * 100}%`,
                        '--item-height': `${(item.height / gameHeight) * 100}%`
                      } as ArcadeStyle
                    }
                    aria-hidden="true"
                  />
                ))}

                <span className="floor-line" aria-hidden="true" />
                <span className="floor-shadow shadow-one" aria-hidden="true" />
                <span className="floor-shadow shadow-two" aria-hidden="true" />
              </button>
          </div>
        </div>

        <style jsx>{`
          .home-section {
            min-height: 100vh;
          }

          .about-section {
            width: min(92vw, 1120px);
            margin: 0 auto;
            display: flex;
            position: relative;
            align-items: center;
            overflow: visible;
            padding: clamp(4.5rem, 10vh, 6.5rem) 0;
          }

          .home-floating-nav {
            position: absolute;
            top: clamp(1rem, 3vh, 1.75rem);
            left: 0;
            z-index: 5;
            backdrop-filter: blur(14px);
          }

          .about-shell {
            position: relative;
            z-index: 2;
            width: 100%;
            padding-bottom: clamp(5rem, 11vh, 7.5rem);
          }

          .field-section-kicker {
            margin-bottom: 1rem;
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.85rem;
            text-transform: uppercase;
          }

          .about-header {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
            gap: clamp(2rem, 6vw, 5rem);
            align-items: end;
            margin-bottom: clamp(2rem, 5vh, 3.5rem);
          }

          .about-title-block {
            min-width: 0;
          }

          .about-header h1 {
            margin: 0;
            color: white;
            font-size: clamp(2.7rem, 5.5vw, 4.75rem);
            font-weight: 600;
            line-height: 0.96;
          }

          .about-intro {
            max-width: 28rem;
          }

          .about-lede {
            margin: 0 0 1rem;
            color: rgba(255, 255, 255, 0.7);
            font-size: clamp(1rem, 2vw, 1.2rem);
            line-height: 1.6;
          }

          .about-card-grid {
            position: relative;
            z-index: 3;
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 0.65rem;
          }

          .about-record-card {
            position: relative;
            min-height: clamp(12rem, 20vh, 15rem);
            padding: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.18);
            background:
              linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
              rgba(255, 255, 255, 0.055);
            background-size: 18px 18px;
          }

          .about-card-index {
            display: block;
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.84rem;
            text-transform: uppercase;
          }

          .about-statement {
            grid-column: span 5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0;
          }

          .about-statement p {
            max-width: 13ch;
            margin: 2rem 0 0;
            color: rgba(255, 255, 255, 0.88);
            font-size: clamp(1.45rem, 2.65vw, 2.2rem);
            font-weight: 600;
            line-height: 1.04;
          }

          .about-details {
            grid-column: span 7;
            display: flex;
            flex-direction: column;
            margin: 0;
          }

          .about-details-copy {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-top: auto;
            font-size: clamp(0.96rem, 1.35vw, 1.08rem);
            line-height: 1.56;
            color: rgba(255, 255, 255, 0.72);
          }

          .about-details-copy p {
            margin: 0;
          }

          .arcade-panel {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 100vw;
            margin: 0;
            transform: translateX(-50%);
          }

          .about-game-card {
            overflow: hidden;
            background: transparent;
          }

          .arcade-toolbar {
            position: absolute;
            top: 22%;
            left: clamp(1.5rem, 4vw, 4rem);
            right: clamp(1.5rem, 4vw, 4rem);
            display: flex;
            align-items: center;
            justify-content: space-between;
            pointer-events: none;
            z-index: 8;
          }

          .score-chip {
            color: rgba(255, 255, 255, 0.66);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: clamp(0.78rem, 1.2vw, 0.95rem);
            font-weight: 700;
            letter-spacing: 0;
            line-height: 1;
          }

          .arcade-icon-button {
            display: grid;
            width: 2rem;
            aspect-ratio: 1;
            place-items: center;
            color: rgba(255, 255, 255, 0.62);
            border: 0;
            background: transparent;
            cursor: pointer;
            pointer-events: auto;
            transition:
              color 160ms ease,
              transform 160ms ease;
          }

          .arcade-icon-button:hover {
            color: white;
            transform: translateY(-1px);
          }

          .arcade-stage {
            position: relative;
            display: block;
            width: 100%;
            height: clamp(10rem, 25vh, 17rem);
            overflow: hidden;
            padding: 0;
            border: 0;
            outline: 0;
            background:
              linear-gradient(
                180deg,
                transparent 0%,
                rgba(255, 255, 255, 0.025) 24%,
                rgba(112, 211, 255, 0.09) 58%,
                rgba(69, 214, 175, 0.13) 100%
              );
            mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 100%);
            -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 30%, black 100%);
            cursor: pointer;
            image-rendering: pixelated;
            touch-action: manipulation;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }

          .arcade-stage:focus,
          .arcade-stage:focus-visible {
            outline: 0;
          }

          .arcade-stage.over {
            filter: saturate(0.85) contrast(0.96);
          }

          .runner-prompt {
            position: absolute;
            top: 25%;
            left: 50%;
            color: rgba(255, 245, 182, 0.66);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: clamp(0.72rem, 1.2vw, 0.82rem);
            font-weight: 700;
            letter-spacing: 0;
            text-transform: uppercase;
            transform: translateX(-50%);
            z-index: 6;
          }

          .runner-sun {
            position: absolute;
            top: 1rem;
            right: 11%;
            width: 0.76rem;
            aspect-ratio: 1;
            background: rgba(255, 244, 169, 0.72);
            box-shadow:
              0.48rem 0 rgba(255, 244, 169, 0.2),
              -0.48rem 0 rgba(255, 244, 169, 0.18),
              0 0.48rem rgba(255, 244, 169, 0.18),
              0 -0.48rem rgba(255, 244, 169, 0.2);
            z-index: 1;
          }

          .runner-hill {
            position: absolute;
            bottom: 25%;
            height: 1rem;
            background: rgba(52, 211, 153, 0.18);
            clip-path: polygon(0 100%, 16% 38%, 30% 74%, 47% 18%, 66% 64%, 82% 32%, 100% 100%);
            z-index: 1;
          }

          .hill-one {
            left: 2%;
            width: 42%;
          }

          .hill-two {
            right: 3%;
            width: 46%;
            opacity: 0.72;
            transform: scaleY(0.8);
          }

          .runner-cloud {
            position: absolute;
            width: 1.55rem;
            height: 0.34rem;
            background: rgba(255, 255, 255, 0.36);
            box-shadow:
              0.42rem -0.22rem rgba(255, 255, 255, 0.34),
              0.88rem 0 rgba(255, 255, 255, 0.34),
              1.22rem 0.2rem rgba(255, 255, 255, 0.22);
            z-index: 2;
          }

          .cloud-one {
            top: 32%;
            left: 60%;
          }

          .cloud-two {
            top: 49%;
            left: 23%;
            opacity: 0.62;
            transform: scale(0.8);
          }

          .pixel-runner {
            position: absolute;
            top: var(--runner-y);
            left: 10.55%;
            width: 5%;
            height: 17%;
            background: rgba(255, 255, 255, 0.92);
            box-shadow:
              0.36rem -0.4rem rgba(255, 255, 255, 0.92),
              0.74rem -0.25rem rgba(255, 255, 255, 0.9),
              0.32rem 0.45rem rgba(255, 255, 255, 0.82),
              -0.2rem 0.24rem rgba(125, 247, 209, 0.78),
              0.86rem 0.18rem rgba(255, 151, 173, 0.72);
            transition: top 24ms linear;
            z-index: 5;
          }

          .pixel-runner::before {
            position: absolute;
            top: -0.62rem;
            right: -0.42rem;
            width: 0.36rem;
            height: 0.34rem;
            background: rgba(255, 255, 255, 0.94);
            box-shadow:
              -0.34rem 0 rgba(255, 255, 255, 0.94),
              0.28rem 0.18rem rgba(255, 255, 255, 0.82);
            content: '';
          }

          .runner-eye,
          .runner-scarf,
          .runner-leg {
            position: absolute;
            display: block;
            content: '';
          }

          .runner-eye {
            top: -0.52rem;
            right: -0.18rem;
            width: 0.14rem;
            height: 0.14rem;
            background: rgba(35, 64, 124, 0.88);
            z-index: 2;
          }

          .runner-scarf {
            top: -0.06rem;
            left: -0.5rem;
            width: 0.52rem;
            height: 0.18rem;
            background: rgba(255, 151, 173, 0.82);
            box-shadow: -0.34rem 0.2rem rgba(255, 151, 173, 0.54);
          }

          .runner-leg {
            bottom: -0.34rem;
            width: 0.22rem;
            height: 0.42rem;
            background: rgba(255, 255, 255, 0.78);
          }

          .leg-one {
            left: 0.12rem;
          }

          .leg-two {
            right: 0.08rem;
          }

          .arcade-stage.running .leg-one {
            animation: runner-step-one 260ms steps(2, end) infinite;
          }

          .arcade-stage.running .leg-two {
            animation: runner-step-two 260ms steps(2, end) infinite;
          }

          .arcade-item {
            position: absolute;
            top: var(--item-y);
            left: var(--item-x);
            width: var(--item-width);
            height: var(--item-height);
            z-index: 4;
          }

          .arcade-item.cactus {
            background: rgba(125, 247, 209, 0.74);
            box-shadow:
              0.34rem 0.36rem rgba(125, 247, 209, 0.58),
              -0.28rem 0.78rem rgba(125, 247, 209, 0.44),
              0.54rem 0.96rem rgba(255, 245, 182, 0.3);
          }

          .arcade-item.cactus::before {
            position: absolute;
            top: 0.38rem;
            left: -0.3rem;
            width: 0.28rem;
            height: 0.46rem;
            background: rgba(125, 247, 209, 0.46);
            content: '';
          }

          .arcade-item.cactus::after {
            position: absolute;
            top: 0.72rem;
            right: -0.32rem;
            width: 0.32rem;
            height: 0.58rem;
            background: rgba(125, 247, 209, 0.5);
            content: '';
          }

          .arcade-item.bird {
            height: 0.5rem;
            background: rgba(255, 245, 182, 0.82);
            box-shadow:
              0.42rem -0.24rem rgba(255, 245, 182, 0.68),
              0.9rem 0 rgba(255, 245, 182, 0.68),
              1.18rem 0.2rem rgba(255, 151, 173, 0.5);
            z-index: 4;
          }

          .floor-line {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 23%;
            height: 3px;
            background:
              linear-gradient(90deg, rgba(255, 255, 255, 0.72), rgba(125, 247, 209, 0.48));
            z-index: 3;
          }

          .floor-line::after {
            position: absolute;
            top: 0.52rem;
            left: 0;
            width: 100%;
            height: 1px;
            background: repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.22) 0,
              rgba(255, 255, 255, 0.22) 1.2rem,
              transparent 1.2rem,
              transparent 2rem
            );
            content: '';
            animation: track-drift 720ms linear infinite;
          }

          .floor-shadow {
            position: absolute;
            bottom: 17.5%;
            height: 3px;
            background: rgba(35, 64, 124, 0.18);
            z-index: 2;
          }

          .shadow-one {
            left: 4%;
            width: 18%;
          }

          .shadow-two {
            right: 16%;
            width: 26%;
          }

          .arcade-stage.over .pixel-runner {
            transform: translateY(0.08rem) rotate(-4deg);
          }

          .arcade-stage.over .floor-line::after {
            animation-play-state: paused;
          }

          @keyframes track-drift {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-2rem);
            }
          }

          @keyframes runner-step-one {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(0.22rem);
            }
          }

          @keyframes runner-step-two {
            0%,
            100% {
              transform: translateY(0.22rem);
            }

            50% {
              transform: translateY(0);
            }
          }

          @media (max-width: 900px) {
            .about-section {
              align-items: flex-start;
              flex-direction: column;
              padding-top: 1rem;
            }

            .home-floating-nav {
              position: sticky;
              top: 0;
              width: 100%;
              padding: 0.75rem 0;
              margin-bottom: 1.35rem;
            }

            .about-shell {
              width: 100%;
              padding-bottom: clamp(4.5rem, 10vh, 6rem);
            }

            .about-header {
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }

            .about-header h1 {
              max-width: none;
            }

            .arcade-panel {
              width: 100vw;
            }
          }

          @media (max-width: 620px) {
            .about-section {
              width: min(90vw, 1120px);
            }

            .arcade-stage {
              height: clamp(8rem, 20vh, 11rem);
            }

            .about-card-grid {
              grid-template-columns: 1fr;
            }

            .about-statement,
            .about-details {
              grid-column: auto;
              min-height: 0;
            }

            .about-statement p {
              max-width: 18ch;
              margin-top: 1.75rem;
            }

            .about-details-copy {
              margin-top: 1.75rem;
            }
          }
        `}</style>
      </section>

      <section id="blog">
        <BlogNav posts={posts} />
      </section>

      <section id="photos">
        <PhotographySection />
      </section>

      <section id="more">
        <MoreSection />
      </section>
    </ScrollSnapWrapper>
  );
}
