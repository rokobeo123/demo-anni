import { describe, expect, it } from 'vitest'
import { normalizeText, validateFiles } from './validation'

describe('gift input validation', () => {
  it('normalizes whitespace and removes control characters', () => {
    expect(normalizeText('  Ada\u0000   Lovelace  ', 40)).toBe('Ada Lovelace')
  })

  it('rejects a 49th image and unsupported files', () => {
    const images = Array.from({ length: 49 }, (_, index) => new File(['x'], `${index}.jpg`, { type: 'image/jpeg' }))
    expect(validateFiles(images)).toContain('You can add up to 48 photos.')
    expect(validateFiles([new File(['x'], 'note.txt', { type: 'text/plain' })])).toContain('note.txt is not a supported image.')
  })
})
