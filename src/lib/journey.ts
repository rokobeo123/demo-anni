export type JourneyPhase =
  | 'composer'
  | 'intro'
  | 'envelope-sealed'
  | 'seal-breaking'
  | 'flap-opening'
  | 'letter-extracting'
  | 'letter-reading'
  | 'heart-reveal'
  | 'heart-idle'
  | 'constellation'
  | 'photo-focus'
  | 'error'

export type JourneyState = { phase: JourneyPhase; selectedPhoto: number | null; transition: number }

export type JourneyAction =
  | { type: 'PREVIEW' }
  | { type: 'CONTINUE' }
  | { type: 'OPEN_ENVELOPE' }
  | { type: 'COMPLETE'; phase: JourneyPhase }
  | { type: 'SHOW_HEART' }
  | { type: 'OPEN_CONSTELLATION' }
  | { type: 'FOCUS_PHOTO'; index: number }
  | { type: 'BACK' }
  | { type: 'RETURN_COMPOSER' }
  | { type: 'ERROR' }

export const initialJourney: JourneyState = { phase: 'composer', selectedPhoto: null, transition: 0 }

const move = (state: JourneyState, phase: JourneyPhase, selectedPhoto: number | null = null): JourneyState => ({
  phase,
  selectedPhoto,
  transition: state.transition + 1,
})

export function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case 'PREVIEW': return state.phase === 'composer' ? move(state, 'intro') : state
    case 'CONTINUE': return state.phase === 'intro' ? move(state, 'envelope-sealed') : state
    case 'OPEN_ENVELOPE': return state.phase === 'envelope-sealed' ? move(state, 'seal-breaking') : state
    case 'COMPLETE':
      if (action.phase !== state.phase) return state
      if (state.phase === 'seal-breaking') return move(state, 'flap-opening')
      if (state.phase === 'flap-opening') return move(state, 'letter-extracting')
      if (state.phase === 'letter-extracting') return move(state, 'letter-reading')
      if (state.phase === 'heart-reveal') return move(state, 'heart-idle')
      return state
    case 'SHOW_HEART': return state.phase === 'letter-reading' ? move(state, 'heart-reveal') : state
    case 'OPEN_CONSTELLATION': return state.phase === 'heart-idle' ? move(state, 'constellation') : state
    case 'FOCUS_PHOTO': return state.phase === 'constellation' ? move(state, 'photo-focus', action.index) : state
    case 'BACK':
      if (state.phase === 'photo-focus') return move(state, 'constellation')
      if (state.phase === 'constellation') return move(state, 'heart-idle')
      return state
    case 'RETURN_COMPOSER': return move(state, 'composer')
    case 'ERROR': return move(state, 'error')
  }
}
