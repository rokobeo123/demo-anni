import type { JourneyPhase } from '../lib/journey'
import { AudioControl } from './AudioControl'

type Props = { phase: JourneyPhase; sender: string; recipient: string; letter: string; audio: File | null; onOpen: () => void; onComplete: (phase: JourneyPhase) => void; onShowHeart: () => void; onReturn: () => void }

export function EnvelopeJourney({ phase, sender, recipient, letter, audio, onOpen, onComplete, onShowHeart, onReturn }: Props) {
  const reading = phase === 'letter-reading'
  const finish = (event: React.TransitionEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return
    if (phase === 'letter-extracting' && event.propertyName === 'transform') onComplete('letter-extracting')
  }
  return <main className={`cinema envelope-screen ${reading ? 'is-reading' : ''}`}>
    <button className="exit-button" onClick={onReturn}>← Edit gift</button><AudioControl file={audio} />
    {!reading && <div className="envelope-heading"><p className="eyebrow">For {recipient}</p><h1>{phase === 'envelope-sealed' ? 'A letter, held close.' : phase === 'seal-breaking' ? 'The seal gives way.' : phase === 'flap-opening' ? 'The fold remembers.' : 'Take it gently.'}</h1><p>{phase === 'envelope-sealed' ? `From ${sender}, with their whole attention.` : 'The paper is finding its way into the light.'}</p></div>}
    <div className="envelope-stage" aria-live="polite">
      <div className={`envelope is-${phase}`} style={{ '--letter-lines': Math.min(12, Math.max(4, letter.split('\n').length + 2)) } as React.CSSProperties}>
        <div className="envelope-back" />
        <div className="letter-clip"><article className="physical-letter" onTransitionEnd={finish}><p className="letter-kicker">A note from {sender}</p><h2>For {recipient}</h2><div className="letter-content">{letter.split('\n').map((line, index) => <p key={`${line}-${index}`}>{line || ' '}</p>)}</div><p className="letter-signoff">Always, {sender}</p></article></div>
        <div className="envelope-flap" onTransitionEnd={(event) => event.propertyName === 'transform' && phase === 'flap-opening' && onComplete('flap-opening')} />
        <div className="envelope-pocket" />
        <div className="envelope-seal" onTransitionEnd={(event) => event.propertyName === 'transform' && phase === 'seal-breaking' && onComplete('seal-breaking')}>L</div>
        {phase === 'envelope-sealed' && <button className="envelope-activate" onClick={onOpen} aria-label="Open the sealed envelope"><span>Open envelope</span></button>}
      </div>
    </div>
    {reading && <div className="reader-actions"><p className="reader-prompt">When you are ready, there is one more place to go.</p><button className="primary-button" onClick={onShowHeart}>Follow the light <span>→</span></button></div>}
  </main>
}
