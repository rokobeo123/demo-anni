import { useEffect, useReducer, useRef, useState } from 'react'
import { Composer, type GiftDraft } from './components/Composer'
import { EnvelopeJourney } from './components/EnvelopeJourney'
import { Intro } from './components/Intro'
import { MemoryScene } from './components/MemoryScene'
import { initialJourney, journeyReducer } from './lib/journey'
import { releasePhotos } from './lib/media'

const emptyDraft: GiftDraft = { sender: '', recipient: '', letter: '', photos: [], audio: null }

export default function App() {
  const [draft, setDraft] = useState<GiftDraft>(emptyDraft); const [journey, dispatch] = useReducer(journeyReducer, initialJourney)
  const photosRef = useRef(draft.photos)
  useEffect(() => { photosRef.current = draft.photos }, [draft.photos])
  useEffect(() => () => releasePhotos(photosRef.current), [])
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === 'Escape') dispatch({ type: 'BACK' }) }; window.addEventListener('keydown', key); return () => window.removeEventListener('keydown', key) }, [])
  const returnComposer = () => dispatch({ type: 'RETURN_COMPOSER' })
  if (journey.phase === 'composer') return <Composer draft={draft} onChange={setDraft} onPreview={() => dispatch({ type: 'PREVIEW' })} />
  if (journey.phase === 'intro') return <Intro sender={draft.sender} recipient={draft.recipient} onContinue={() => dispatch({ type: 'CONTINUE' })} onReturn={returnComposer} />
  if (['envelope-sealed','seal-breaking','flap-opening','letter-extracting','letter-reading'].includes(journey.phase)) return <EnvelopeJourney phase={journey.phase} sender={draft.sender} recipient={draft.recipient} letter={draft.letter} audio={draft.audio} onOpen={() => dispatch({ type: 'OPEN_ENVELOPE' })} onComplete={(phase) => dispatch({ type: 'COMPLETE', phase })} onShowHeart={() => dispatch({ type: 'SHOW_HEART' })} onReturn={returnComposer} />
  if (journey.phase === 'heart-reveal') return <div className="cinema heart-reveal"><p className="eyebrow">The letter becomes light</p><button className="primary-button" autoFocus onAnimationEnd={() => dispatch({ type: 'COMPLETE', phase: 'heart-reveal' })}>Enter the heart</button></div>
  return <MemoryScene phase={journey.phase} photos={draft.photos} selectedPhoto={journey.selectedPhoto} onConstellation={() => dispatch({ type: 'OPEN_CONSTELLATION' })} onFocus={(index) => dispatch({ type: 'FOCUS_PHOTO', index })} onBack={() => dispatch({ type: 'BACK' })} onReturn={returnComposer} />
}
