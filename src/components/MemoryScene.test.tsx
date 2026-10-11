import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryScene } from './MemoryScene'

const photo = { id: 'one', file: new File(['photo'], 'memory.png', { type: 'image/png' }), previewUrl: 'blob:preview', displayUrl: 'blob:display', name: 'memory.png' }

describe('MemoryScene', () => {
  it('focuses a photo without treating its pointer release as a background return', () => {
    const onFocus = vi.fn()
    const onBack = vi.fn()
    render(<MemoryScene phase="constellation" photos={[photo]} selectedPhoto={null} onConstellation={vi.fn()} onFocus={onFocus} onBack={onBack} onReturn={vi.fn()} />)

    const card = screen.getByRole('button', { name: /focus photo 1/i })
    fireEvent.pointerUp(card)
    fireEvent.click(card)

    expect(onBack).not.toHaveBeenCalled()
    expect(onFocus).toHaveBeenCalledWith(0)
  })
})
