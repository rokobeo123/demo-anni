type Props = { sender: string; recipient: string; onContinue: () => void; onReturn: () => void }

export function Intro({ sender, recipient, onContinue, onReturn }: Props) {
  return <main className="cinema intro-screen"><button className="exit-button" onClick={onReturn}>← Edit gift</button><div className="intro-orbit" aria-hidden="true" /><div className="intro-copy"><p className="eyebrow">A small moment from {sender}</p><h1>{recipient},<br /><em>there is something</em><br />waiting for you.</h1><p>Take your time. Nothing begins until you do.</p><button className="primary-button" onClick={onContinue}>Begin slowly <span>↓</span></button></div></main>
}
