import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HeartReveal } from './HeartReveal'

describe('HeartReveal', () => {
  it('enters the interactive heart when the visible control is activated', () => {
    const onEnter = vi.fn()
    render(<HeartReveal onEnter={onEnter} />)

    fireEvent.click(screen.getByRole('button', { name: /enter the heart/i }))

    expect(onEnter).toHaveBeenCalledOnce()
  })
})
