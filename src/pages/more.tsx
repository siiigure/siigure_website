'use client';

export default function MoreSection() {
  const placeholders = ['now', 'uses', 'music', 'links', 'archive', 'soon'];

  return (
    <section className="more-section">
      <div className="more-copy">
        <div className="field-section-kicker">04 / MORE</div>
        <h1>More to Come</h1>
        <p>
          Bits and pieces can live here later. For now, this section is holding
          the shape of future shelves.
        </p>
      </div>

      <div className="more-grid" aria-label="More placeholders">
        {placeholders.map((item) => (
          <div key={item} className="more-cell">
            <span>[ ]</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>

      <style jsx>{`
        .more-section {
          width: min(92vw, 1120px);
          min-height: 100vh;
          margin: 0 auto;
          padding: clamp(4.5rem, 10vh, 6rem) 0;
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(280px, 1.15fr);
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }

        .field-section-kicker {
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .more-copy h1 {
          margin: 0;
          color: white;
          font-size: clamp(2.7rem, 6vw, 5rem);
          font-weight: 600;
          line-height: 0.96;
        }

        .more-copy p {
          max-width: 32rem;
          margin: 1.2rem 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(1rem, 2vw, 1.18rem);
          line-height: 1.65;
        }

        .more-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          grid-auto-rows: 6rem;
          gap: 0.55rem;
        }

        .more-cell {
          grid-column: span 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            rgba(255, 255, 255, 0.035);
          background-size: 16px 16px;
          color: rgba(255, 255, 255, 0.48);
        }

        .more-cell:nth-child(2),
        .more-cell:nth-child(5) {
          grid-column: span 2;
        }

        .more-cell:nth-child(3),
        .more-cell:nth-child(4) {
          grid-column: span 4;
        }

        .more-cell strong {
          color: rgba(255, 255, 255, 0.7);
          font-size: clamp(1.1rem, 2.4vw, 1.7rem);
          font-weight: 600;
          text-transform: uppercase;
        }

        @media (max-width: 760px) {
          .more-section {
            width: min(90vw, 1120px);
            grid-template-columns: 1fr;
          }

          .more-grid {
            grid-auto-rows: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
