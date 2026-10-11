import { describe, expect, it } from 'vitest'
import { initialJourney, journeyReducer } from './journey'

describe('journeyReducer', () => {
  it('locks repeated envelope activation until the animation completes', () => {
    const breaking = journeyReducer({ ...initialJourney, phase: 'envelope-sealed' }, { type: 'OPEN_ENVELOPE' })
    expect(breaking.phase).toBe('seal-breaking')
    expect(journeyReducer(breaking, { type: 'OPEN_ENVELOPE' })).toBe(breaking)
    expect(journeyReducer(breaking, { type: 'COMPLETE', phase: 'seal-breaking' }).phase).toBe('flap-opening')
  })

  it('walks backwards through photo focus and constellation safely', () => {
    const focused = { ...initialJourney, phase: 'photo-focus' as const, selectedPhoto: 3 }
    expect(journeyReducer(focused, { type: 'BACK' })).toMatchObject({ phase: 'constellation', selectedPhoto: null })
    expect(journeyReducer({ ...focused, phase: 'constellation' }, { type: 'BACK' }).phase).toBe('heart-idle')
  })
})
