type Props = { onEnter: () => void }

export function HeartReveal({ onEnter }: Props) {
  return <main className="cinema heart-reveal" aria-labelledby="heart-reveal-title">
    <div className="reveal-particles" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--particle': index } as React.CSSProperties} />)}</div>
    <div className="heart-reveal-copy">
      <p className="eyebrow">The letter becomes light</p>
      <h1 id="heart-reveal-title">A small universe, waiting.</h1>
      <p>The next touch opens the moments gathered here.</p>
      <button className="primary-button" autoFocus onClick={onEnter}>Enter the heart <span>→</span></button>
    </div>
  </main>
}
